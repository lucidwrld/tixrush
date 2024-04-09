import Footer from "../../Components/AppLayout/Footer"
import Header from "../../Components/Header"
import "../../Styles/upcoming.css"
import MobileMenu from '../../Components/MobileMenu'
import React, { useState, useEffect, useRef } from 'react'
import arrow from "../../Assets/img/greenarrow.svg"
import { NavLink } from "react-router-dom"
import { default as useStateRef } from 'react-usestateref'
import ReactImageVideoLightbox from 'react-image-video-lightbox'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Event as EventCard } from '../../Components/EventsCard'
import Banner from '../../Components/Banner'
import Axios from '../../Utils/axios'
import { Modal } from 'reactstrap'
import Upcoming from "../../Components/Events/Upcoming"
import { useGetAllEventsQuery, useGetFeaturedEventQuery, useGetHeroEventQuery } from '../../Client/Event'
import Hero from "../../Components/Hero"
import EventDetails from "../../Components/Events/Details"

import Loader from "../../Components/Loader"
export default function Trendingevents () {
    const [showEventDetails, setShowEventDetails] = useState(false)
  const [activeTab, setActiveTab] = useState('event-details')
  const [checked, setChecked] = useState(false)
  const [coupon, setCoupon] = useState(false)
  const [colorChange, setColorchange] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [apiKey, setApiKey] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [totalPrice, setTotalPrice, totalRef] = useStateRef(0)

  const [ticketOrderDetails, setTicketOrderDetails, ticketOrderRef] =
    useStateRef([])
  const [createEvent, setCreateEvent] = useState(false)
  const [name, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [init, setInit] = useState(false)
  const [error, setError] = useState(false)
  const [showEventImages, setShowEventImages] = useState(false)

  const videoRef = useRef()



  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const setTicketValue = (i, func) => {
    var ticketList = document.getElementsByClassName('ticket-order-value')
    if (func === 'increment') {
      ticketList[i].innerHTML = Number(ticketList[i].innerHTML) + 1
      setError(false)
    } else if (func === 'decrement') {
      if (Number(ticketList[i].innerHTML) > 0) {
        ticketList[i].innerHTML = Number(ticketList[i].innerHTML) - 1
        setError(false)
      }
    } else {
      Array.from(ticketList).map(
        (el, i) => (ticketList[i].innerHTML = Number(0))
      )
    }
    // const document.get
  }

  const toggleShowEventDetails = () => {
    reset()
    setShowEventDetails(!showEventDetails)
  }

  function isElementInView(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth

    // Check if any part of the element is within the viewport
    const isElementVisible =
      rect.top <= windowHeight &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0

    return isElementVisible
  }

  function scrollToView(element) {
    if (!isElementInView(element)) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function isElementInView(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth

    // Check if any part of the element is within the viewport
    const isElementVisible =
      rect.top <= windowHeight &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0

    return isElementVisible
  }

  const toggleSimilarEventDetails = () => {
    reset()

    window.scrollTo(0, 0)
    const el = document.querySelector('#close-modal-btn')
    const el2 = document.querySelector('#event-details__name')
    scrollToView(el)
    scrollToView(el2)
  }

  const toggleCreateEvent = () => {
    setCreateEvent(!createEvent)
  }

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const toggleCoupon = () => {
    setCoupon(!coupon)
  }

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {

      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }
  window.addEventListener('scroll', changeNavbarColor)



  const { allEvents: newAllEvents, isLoading, error: allEventsError } = useGetAllEventsQuery()
  const { featuredEvents: newFeaturedEvents, isLoading: featured_loading, error: featured_error } = useGetFeaturedEventQuery()
  const { heroEvent: newHeroEvent, isLoading: hero_loading, error: hero_error } = useGetHeroEventQuery()


  const calculateTicketTotalPrice = () => {
    const arr = []
    selectedEvent.ticketsId.map((el, i) =>
      arr.push(el.price * ticketOrderRef.current[i])
    )
    const prices = selectedEvent.ticketsId.map(item => item.price);
    const has_free_ticket = selectedEvent.ticketsId.find(ticket => ticket.price === 0);

    // Use reduce to calculate the total sum
    const totalPrice = prices.reduce((acc, currentPrice) => acc + currentPrice, 0);
    if (totalPrice > 0) {
      if (has_free_ticket) {
        setActiveTab('')

      }else{
        const totalTicketPrice = arr.reduce((x, y) => Number(x) + Number(y))
        setTotalPrice(totalTicketPrice)
        // console.log('--->>totalTicketPrice<<--', totalTicketPrice, totalRef, prices)
        if (totalRef.current === 0 || isNaN(totalRef.current)) {
          setError(true)
        } else {
          setError(false)
          setActiveTab('')
        }
      } 
      }
      else {
        setActiveTab('')
  
      }
      

  }



  const makePayment = async () => {
    const amount = document
      .querySelector('.total-ticket-price')
      .innerHTML.split('</span>')[1]

    setInit(true)
    try {
      const data = {
        amount: Number(amount),
        currency: 'NGN',
        email,
        channels: ['card', 'bank', 'ussd', 'bank_transfer', 'eft'],
        callback_url: `${window.location.origin}/verify-payment`,
        reason: 'Ticket Payment'
      }

      const response = await Axios.post('/payment/initialise', data)

      window.location.href = response.data.callback
      setInit(false)
    } catch (err) {
      setInit(false)
    }
  }


  const reset = () => {
    setActiveTab('event-details')
    const orderValue = Array.from(
      document.getElementsByClassName('ticket-order-value')
    )
    orderValue.map((el, i) => (el.innerHTML = 0))
    setTicketValue(0, 'reset')
    setTicketOrderDetails([])
  }

  const myRef = useRef(null)


  const params = useParams()
  const { eventId } = params

  useEffect(() => {
    if (isLoading && hero_loading && featured_loading) {
    } else {
      if (eventId && newAllEvents) {
        const event = newAllEvents.filter(el => el._id == eventId)[0]
        setSelectedEvent(event)
        setShowEventDetails(true)
      }
    }
  }, [newAllEvents, eventId, isLoading, hero_loading, featured_loading])

  function compareDates(event1, event2) {
    return new Date(event2.date) - new Date(event1.date);
}

// Sort events by date
newAllEvents.sort(compareDates);

console.log(newAllEvents)
    return( <>
      {isLoading || featured_loading || hero_loading ? (
       <Loader />
     ) : (
        <div >
<Header position={'fixed'} activeLink='upcoming event' subPage={false} />
        <div style={{display: "flex" , justifyContent: "center", alignItems: "center", marginBottom: "30px"}}>
        <section className="upcomingevent mt-5">
            <div className="title mt-5">
                <div className="tit">
                <h3 className='page-section-title .difff  ' id="difff">Trending Events</h3>
                </div>
                <a href="/upcoming" className="navlink" > Upcoming Events <img src={arrow} /></a>
            </div>
            <div className="upcoming-event-section" style={{marginTop: "40px"}}>
            <Row className='g-4'>
                {newAllEvents?.map(el => (
                    <Col sm='12' md='6' lg='3'>
                        <EventCard
                            event={el}
                            setSelectedEvent={setSelectedEvent}
                            toggleShowEventDetails={toggleShowEventDetails}
                        />
                    </Col>
                ))}
            </Row>
        </div>
        <Modal
            isOpen={showEventDetails}
            toggle={toggleShowEventDetails}
            size='xl'
            className=' event-details-modal'
            modal-className='event-details-modal'
          >
            {/*  */}

            <EventDetails
              reset={reset}
              init={init}
              coupon={coupon}
              checked={checked}
              toggleChecked={toggleChecked}
              toggleCoupon={toggleCoupon}
              selectedEvent={selectedEvent}
              ticketOrderDetails={ticketOrderDetails}
              setSelectedEvent={setSelectedEvent}
              newFeaturedEvents={newFeaturedEvents}
              setEmail={setEmail}
              setFullname={setFullname}
              setPhone={setPhone}
              toggleSimilarEventDetails={toggleSimilarEventDetails}
              toShowEventDetails={toggleShowEventDetails}
              setShowEventImages={setShowEventImages}
              setTicketOrderDetails={setTicketOrderDetails}
              calculateTicketTotalPrice={calculateTicketTotalPrice}
              error={error}
              setError={setError}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              name={name}
              userEmail={email}
              userPhone={phone}
            />
          </Modal>
        </section>
        </div>
        
<Footer />
      <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
        </div>)
      }
      </>
    )
}