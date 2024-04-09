import React, { useState, useEffect } from 'react'
import location from '../../Assets/img/location.svg'
import naira from '../../Assets/img/naira.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader'
import moment from 'moment'
import 'add-to-calendar-button/assets/css/atcb.css'
import TicketDate from '../../Components/TicketDate'
import { Row, Col, Modal, Button } from 'reactstrap'
import MobileMenu from './MobileMenu'
import Footer from '../../Components/AppLayout/Footer'
import 'react-alice-carousel/lib/alice-carousel.css'
import axios from '../../Utils/axios'
import Header from '../../Components/Header'
import { fecthLowerPrice } from '../../Utils/helper'
import SearchedEvent from '../../Components/EventsCard/SearchedEvent'


const Intent = () => {
  const navigate = useNavigate()

  const [searchEvent, setSearchEvent] = useState('')
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [activeTab, setActiveTab] = useState('event-details')
  const [checked, setChecked] = useState(false)
  const [coupon, setCoupon] = useState(false)
  const [colorChange, setColorchange] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [allEvents, setAllEvents] = useState([])
  const [allFeaturedEvents, setAllFeaturedEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [apiKey, setApiKey] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [featureType, setFeatureType] = useState('scroll')
  const [mainFeaturePicture, setMainFeaturePicture] = useState('')
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [ticketOrderDetails, setTicketOrderDetails] = useState([])
  const [heroEvent, setHeroEvent] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')

  const setTicketValue = (i, func) => {
    var ticketList = document.getElementsByClassName('ticket-order-value')
    if (func === 'increment') {
      ticketList[i].innerHTML = Number(ticketList[i].innerHTML) + 1
    } else {
      if (Number(ticketList[i].innerHTML) > 0) {
        ticketList[i].innerHTML = Number(ticketList[i].innerHTML) - 1
      }
    }
    // const document.get
  }

  function isImage(url) {

    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url) || url?.includes('placeimg');
  }


  const toggleShowEventDetails = () => {
    setShowEventDetails(!showEventDetails)
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


  const config = {
    name: selectedEvent?.name,
    description: selectedEvent?.description,
    startDate: selectedEvent?.date,
    endDate: selectedEvent?.date,
    options: ['Google'],
    timeZone: 'Europe/Berlin',
    trigger: 'click',
    iCalFileName: 'Reminder-Event'
  }


  const getAllEvents = async (query, queryType) => {
    try {
      setLoading(true)
      console.log(queryType, query)
      const response = await axios.get(`/event/all?${queryType}=${query}`)
      console.log(response)
      setAllEvents(response.data?.data?.allEvents)
      setFilteredEvents(response.data?.data?.allEvents)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }




  setTimeout(function () {
    if (selectedEvent) {
      setActiveSlide(
        activeSlide < selectedEvent?.media.length - 1 ? activeSlide + 1 : 0
      )
    }
  }, 10000)

  const calculateTicketTotalPrice = () => {
    const arr = []
    selectedEvent.tickets.map((el, i) =>
      arr.push(el.price * ticketOrderDetails[i])
    )
    const totalTicketPrice = arr.reduce((x, y) => Number(x) + Number(y))
    setTotalPrice(totalTicketPrice)
  }

  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    window
      .matchMedia('(max-width: 768px)')
      .addEventListener('change', e => setMatches(e.matches))
  }, [])

  const urlParams = new URLSearchParams(window.location.search)
  const eventName = urlParams.get('event_name')
  const eventCategory = urlParams.get('event_category')

console.log(eventName, eventCategory)

  useEffect(() => {
    if (eventName) {
      getAllEvents(eventName, 'name')
      console.log(getAllEvents)
    } else if (eventCategory) {
      getAllEvents(eventCategory, 'category')
    }

  }, [eventName, eventCategory])




  return (
    <>
      {loading || request || fetching ? (
        <Loader />
      ) : (
        <div
          className='home-section'
          style={{
            minHeight: '100vh'
          }}
        >
          <Header position={'fixed'} activeLink='categories' subPage={false} />


          <section class='upcoming-event-section px-3 px-md-5 pb-5  pt-5 '>
            <div className='  pt-5 '>
              <h3 className='section-title mb-2 text-white'>Search Result</h3>
            </div>
            <div>
              <Row className='g-4'>
                {eventName || eventCategory ?
                  <>
                    {allEvents
                      ?.map(el =>
                        <Col sm='12' md='6' lg='3'>
                          <SearchedEvent event={el} />
                        </Col>)
                    }
                  </>
                  : null}

                {/*  */}
              </Row>
            </div>
          </section>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div
          // style={{
          //   position: 'fixed',
          //   bottom: 0
          // }}
          >
            <Footer />
          </div>


          <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
        </div>
      )}
    </>
  )
}

export default Intent
