import React, { useState, useEffect, useRef, Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader'
import 'add-to-calendar-button/assets/css/atcb.css'
import { Modal } from 'reactstrap'
import tixrush from '../../Assets/img/tixrush.svg'
// import Switch from 'react-switch'
import MobileMenu from './MobileMenu'
import { IoClose } from 'react-icons/io5'
import Footer from '../../Components/AppLayout/Footer'
import 'react-alice-carousel/lib/alice-carousel.css'
import { FaGooglePlay, FaTwitter } from 'react-icons/fa'
import { BsApple } from 'react-icons/bs'
import { AiOutlineInstagram } from 'react-icons/ai'
import { RiFacebookBoxFill } from 'react-icons/ri'
import Header from '../../Components/Header'
import { default as useStateRef } from 'react-usestateref'
import ReactImageVideoLightbox from 'react-image-video-lightbox'
import { useParams } from 'react-router-dom'
import Banner from '../../Components/Banner'
import Axios from '../../Utils/axios'
import { useGetAllEventsQuery, useGetFeaturedEventQuery, useGetHeroEventQuery, useUpcomingEvent } from '../../Client/Event'
import Hero from '../../Components/Hero'
import Featured from '../../Components/Events/Featured'
import Upcoming from '../../Components/Events/Upcoming'
import EventDetails from '../../Components/Events/Details'
import ReactDOM from 'react-dom';


const Home = () => {
  const navigate = useNavigate()
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



  const { allEvents: newAllEvents, isLoading, error: allEventsError } = useGetAllEventsQuery()/* 
  const {upcomingEvent: upComingEvents} = useUpcomingEvent() */
  const { featuredEvents: newFeaturedEvents, isLoading: featured_loading, error: featured_error } = useGetFeaturedEventQuery()
  const { heroEvent: newHeroEvent, isLoading: hero_loading, error: hero_error } = useGetHeroEventQuery()
console.log(newAllEvents)
console.log(newFeaturedEvents)
  const calculateTicketTotalPrice = () => {
    console.log("try")
    const arr = []
    const array = ticketOrderRef.current.map(num => Number(num));
    console.log(array)
    if (array.some(num => num > 0 )){
      console.log("true")
    }else{
      console.log("false")
    }
    console.log(ticketOrderRef)
    selectedEvent.ticketsId.map((el, i) =>
      arr.push(el.price * ticketOrderRef.current[i])
    )
    const prices = selectedEvent.ticketsId.map(item => item.price);
    const has_free_ticket = selectedEvent.ticketsId.find(ticket => ticket.price === 0);
    console.log(prices)
    console.log(has_free_ticket )
    // Use reduce to calculate the total sum
    const totalPrice = prices.reduce((acc, currentPrice) => acc + currentPrice, 0);
    if (totalPrice >= 0 ) {
      console.log(arr.some(ticket => ticket > 0))
      if (has_free_ticket && array.some(num => num > 0 )) {
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


  function compareUDates(event1, event2) {
    return new Date(event1.date) - new Date(event2.date);
}
  function compareTDates(event1, event2) {
    return new Date(event2.date) - new Date(event1.date);
}


  return (
    <>
      {isLoading || featured_loading || hero_loading ? (
        <Loader />
      ) : (
        <div className='home-section'>
          <Header position={'fixed'} activeLink='' subPage={false} />
          <Hero
            heroEvent={newHeroEvent}
            setSelectedEvent={setSelectedEvent}
            toggleShowEventDetails={toggleShowEventDetails}
          />



          <section className='feature-event-section px-3 px-md-5 mb-4'>
            <div>
              <h3 className='section-title mb-2'>Featured Events</h3>

              <Featured
                allFeaturedEvents={newFeaturedEvents}
                setSelectedEvent={setSelectedEvent}
                toggleShowEventDetails={toggleShowEventDetails}
              />
            </div>

          </section>

          <section class='upcoming-event-section px-3 px-md-5 pb-5'>
            <div>
              <h3 className='section-title mb-2 text-white'>Upcoming Events</h3>
            </div>
            <Upcoming
            number={4}
            link={"/upcoming"}
              compareDate={compareUDates}
              newAllEvents={newAllEvents}
              setSelectedEvent={setSelectedEvent}
              toggleShowEventDetails={toggleShowEventDetails}
            />

          </section>
          <Banner />

          <section class='upcoming-event-section px-3 px-md-5 pb-5'>
            <div>
              <h3 className='section-title mb-2 text-white'>Trending Events</h3>
            </div>
            <Upcoming
              number={8}
              link={"/trending"}
              compareDate={compareTDates}
              newAllEvents={newAllEvents}
              setSelectedEvent={setSelectedEvent}
              toggleShowEventDetails={toggleShowEventDetails}
            />
          </section>

          <br />
          <br />
          <br />

          <Footer />

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

          <Modal
            isOpen={createEvent}
            toggle={toggleCreateEvent}
            size='md'
            className='create-event-modal modal-dialog-centered'
          >
            <div className='px-2 px-md-4 pb-4 pt-3'>
              <div
                className='d-flex justify-content-end '
                role='button'
                style={{
                  marginBottom: '-24px'
                }}
                onClick={toggleCreateEvent}
              >
                <IoClose color='#fff' size='25' />
              </div>
              <div className='text-center create-event-logo-wrapper'>
                <img src={tixrush} />
              </div>
              <div className='text-center mb-4'>
                <h3 className='download-app-text text-center'>
                  Download App!
                </h3>
                <p className='mb-0 download-app-subtext'>
                  To create events and enjoy the full experience of tixrush,
                </p>
                <p className='mb-0 download-app-subtext'>
                  Download our app from the Google Play Store or the Apple
                  Store!
                </p>
              </div>
              <div className='download-app-wrapper-link p-3 mx-auto '>
                <div className='d-flex align-items-center'>
                  <div>
                    <FaGooglePlay size='60' color='#00E194' />
                  </div>
                  <div
                    style={{
                      marginLeft: '16px'
                    }}
                  >
                    <p className='mb-0 android-download-text'>ANDROID APP ON</p>
                    <h3 className='mb-0 google-download-text'>Google Play</h3>
                  </div>
                </div>
              </div>
              <div className='strike my-4'>
                <span>Or</span>
              </div>
              <div className='download-app-wrapper-link p-3 mx-auto mb-5'>
                <div className='d-flex align-items-center'>
                  <div>
                    <BsApple size='60' color='#00E194' />
                  </div>
                  <div
                    style={{
                      marginLeft: '16px'
                    }}
                  >
                    <p className='mb-0 ios-download-text'>Download on the</p>
                    <h3 className='mb-0 ios-app-download-text'>App Store</h3>
                  </div>
                </div>
              </div>
              <div className='mb-2'>
                <p className='download-app follow-us-text'>Follow Us</p>
                <div className='d-flex align-items-center justify-content-between mx-auto download-icons-wrapper w-50'>
                  <div>
                    <AiOutlineInstagram size='30' color='#fff' />
                  </div>
                  <div>
                    <RiFacebookBoxFill size='30' color='#fff' />
                  </div>{' '}
                  <div>
                    <FaTwitter size='27' color='#fff' />
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <MobileMenu
            toggle={setShowMobileMenu}
            show={showMobileMenu}
            toggleCreateEvent={toggleCreateEvent}
          />

          {showEventImages && (
            <div className='event-image__lightbox'>
              <ReactImageVideoLightbox
                data={selectedEvent?.media
                  ?.filter(el => !el.includes('mp4'))
                  .map(el => ({
                    url: el,
                    type: el.includes('mp4') ? 'video' : 'photo',
                    altTag: selectedEvent?.name
                  }))}
                startIndex={activeSlide}
                showResourceCount={true}
                onCloseCallback={() => {
                  setShowEventImages(false)
                  handleVideoPlay()
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default Home
