import React, { useState, useEffect } from 'react'
import ArrowDown from '../../Assets/img/arrowdown.svg'
import Search from '../../Assets/img/search.svg'
// import heroImg from '../../Assets/img/herobg.png'
import location from '../../Assets/img/location.svg'
import ticket from '../../Assets/img/getTicket.png'
import eventImg from '../../Assets/img/event.png'
import event2 from '../../Assets/img/event2.png'
import eventDetails from '../../Assets/img/eventDetails.png'

import naira from '../../Assets/img/naira.svg'
import instagram from '../../Assets/img/instagram.svg'
import facebook from '../../Assets/img/facebook.svg'
import facebookOutline from '../../Assets/img/faceoutline.svg'

import linkedin from '../../Assets/img/linkedin.svg'
import twitter from '../../Assets/img/twitter.svg'
import clock from '../../Assets/img/clockIcon.svg'
import calendar from '../../Assets/img/calendarIcon.svg'
import subtractIcon from '../../Assets/img/subtract.svg'
import addIcon from '../../Assets/img/add.svg'
import minusIcon from '../../Assets/img/minus.svg'
import share from '../../Assets/img/share.svg'
import map from '../../Assets/img/map.png'
import ticketOrder from '../../Assets/img/ticketOrder.png'
import whiteNaira from '../../Assets/img/whiteNaira.svg'
import lineIcon from '../../Assets/img/lineIcon.svg'
import arrowRight from '../../Assets/img/arrowRight.svg'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader'
import ShareOnSocial from 'react-share-on-social'
import menu from '../../Assets/img/menu.svg'
import moment from 'moment'
import 'add-to-calendar-button/assets/css/atcb.css'

import TicketDate from '../../Components/TicketDate'
import { Row, Col, Modal, Button } from 'reactstrap'
import {
  MdAdd,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown
} from 'react-icons/md'
// import Switch from 'react-switch'
import { BiArrowBack } from 'react-icons/bi'
import Switch from '../../Components/Switch'
import MobileMenu from './MobileMenu'
import { IoClose } from 'react-icons/io5'
import Footer from '../../Components/AppLayout/Footer'
import Marquee from 'react-fast-marquee'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import axios from '../../Utils/axios'
import { AddToCalendar } from 'react-add-to-calendar'
import { atcb_action, atcb_init } from 'add-to-calendar-button'
import Header from '../../Components/Header'


const Home = () => {
  const navigate = useNavigate()
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
  const [searchEvent, setSearchEvent] = useState('')

  const params = useParams()
  const { eventId } = params

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

  // const button = document.getElementById('default-atcb-button')

  // useEffect(() => {
  //   if (button) {
  //     button.addEventListener('click', () => {
  //       atcb_action(config, button)
  //     })
  //   }
  // }, [button])

  const fecthLowerPrice = arr => {
    if (arr.length > 0) {
      var lowest = Number.POSITIVE_INFINITY
      var highest = Number.NEGATIVE_INFINITY
      var tmp
      for (var i = arr.length - 1; i >= 0; i--) {
        tmp = arr[i].price
        if (tmp < lowest) lowest = tmp
        if (tmp > highest) highest = tmp
      }
      return lowest
    } else {
      return 1000
    }
  }

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

  const BASE_URL = 'https://tixrush-api.herokuapp.com/'

  const fetchKey = async () => {
    try {
      setRequest(true)
      const data = {
        name: 'Deniyi Femi',
        email: 'holarfemilekan049@gmail.com'
      }
      const response = await axios.post(`${BASE_URL}/apiKey/generate`, data)
      setApiKey(response.data.data.key)
      setRequest(false)
    } catch (err) {
      setRequest(false)
    }
  }

  const caxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    }
  })

  const getAllEvents = async () => {
    try {
      setLoading(true)
      const response = await caxios.get('/event/all')
      setAllEvents(response.data.data)
      setFilteredEvents(response.data.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const getHeroEvent = async () => {
    setFetching(true)

    try {
      const response = await caxios.get(`/event/single-event/${eventId}`)

      setHeroEvent(response.data.data[0])
      setFetching(false)
    } catch (err) {
      setFetching(false)
    }
  }

  const getAllFeaturedEvents = async () => {
    try {
      setFetching(true)
      const response = await caxios.get('/event/management/all-featured-events')
      setAllFeaturedEvents(response?.data?.data?.allEvents)
      // setFilteredEvents(response.data.data)
      setFetching(false)
    } catch (err) {
      setFetching(false)
    }
  }
  useEffect(() => {
    fetchKey()
  }, [])

  useEffect(() => {
    if (apiKey) {
      getAllEvents()
      getAllFeaturedEvents()
      getHeroEvent()
    }
  }, [apiKey])

  setTimeout(function () {
    if (selectedEvent) {
      setActiveSlide(
        activeSlide < selectedEvent?.images.length - 1 ? activeSlide + 1 : 0
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

  return (
    <>
      {loading || request || fetching ? (
        <Loader />
      ) : (
        <div className='home-section'>
          {/* <div
            className={`header position-fixed py-3 py-md-0 pb-md-0 d-flex justify-content-between align-items-center w-100 px-3 px-md-5 ${
              colorChange ? 'cstm-bg-black' : 'cstm-bg-gradient'
            } `}
          >
            {!showMobileSearch ? (
              <>
                <div className=''>
                  <p className='header-logo mb-0'>
                    <NavLink to='/' className='header-logo'>
                      LOGO
                    </NavLink>
                  </p>
                </div>
                <ul className='header-nav-links d-none d-lg-flex align-items-center mb-0'>
                  <li className='nav-item'>
                    <div
                      className='d-flex position-relative dropdown-menu-wrapper py-5'
                      role='button'
                      style={{
                        gap: '7px'
                      }}
                      onMouseOver={() => {
                        setShowDropdown(true)
                      }}
                      onMouseLeave={() => {
                        setShowDropdown(false)
                      }}
                    >
                      Categories{' '}
                      <span>
                        {!showDropdown ? (
                          <MdKeyboardArrowRight color='#fff' size='25' />
                        ) : (
                          <MdKeyboardArrowDown color='#00e194' size='25' />
                        )}
                      </span>
                      <div
                        className={`position-fixed dropdown-content p-3  ${
                          colorChange ? 'cstm-bg-black' : 'cstm-bg-gradient'
                        }`}
                      >
                        <Row className='test-bg-blur'>
                          <Col sm='6'>
                            <p
                              className='nav-item mb-2'
                              style={{
                                color: '#00e194'
                              }}
                              onClick={() => {
                                navigate(`/intent/search?event_category=shows`)
                              }}
                            >
                              Shows
                            </p>

                            <p
                              style={{
                                color: '#00e194'
                              }}
                              className='nav-item mb-2'
                              onClick={() => {
                                navigate(`/intent/search?event_category=movies`)
                              }}
                            >
                              Movies
                            </p>

                            <p
                              style={{
                                color: '#00e194'
                              }}
                              className='nav-item mb-2'
                              onClick={() => {
                                navigate(
                                  `/intent/search?event_category=business`
                                )
                              }}
                            >
                              Business
                            </p>
                          </Col>
                          <Col sm='6'>
                            <p
                              style={{
                                color: '#00e194'
                              }}
                              className='nav-item mb-2'
                              onClick={() => {
                                navigate(`/intent/search?event_category=clubs`)
                              }}
                            >
                              Clubs
                            </p>

                            <p
                              style={{
                                color: '#00e194'
                              }}
                              className='nav-item mb-2'
                              onClick={() => {
                                navigate(
                                  `/intent/search?event_category=festivals`
                                )
                              }}
                            >
                              Festivals
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/about'>About</NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink to='/contact'>Contact</NavLink>
                  </li>
                </ul>
                <div className='header-cta-section d-flex align-items-center justify-content-between mb-md-2 mb-0'>
                  <div className='d-none d-md-flex px-3 justify-content-center align-items-center navbar-search-wrapper py-2'>
                    <input
                      placeholder='Search'
                      className='form-control'
                      onChange={e => {
                        setSearchEvent(e.target.value)
                      }}
                    />
                    <div
                      role='button'
                      onClick={() => {
                        navigate(`/intent/search?event_name=${searchEvent}`)
                      }}
                    >
                      <img alt='icon' src={Search} width='22px' height='22px' />
                    </div>
                  </div>
                  <div
                    className='d-block d-md-none'
                    onClick={() => {
                      setShowMobileSearch(true)
                    }}
                  >
                    <div>
                      <img alt='icon' src={Search} width='22px' height='22px' />
                    </div>
                  </div>
                  <div className='d-none d-lg-block'>
                    <button className='btn create-event-btn '>
                      Create Event
                    </button>
                  </div>
                  <div
                    className='d-block d-lg-none'
                    onClick={() => {
                      setShowMobileMenu(true)
                    }}
                  >
                    <img src={menu} alt='icon' />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className='d-flex w-100 align-items-center'
                  style={{
                    gap: '8px'
                  }}
                >
                  <div
                    className='d-flex px-3 justify-content-center align-items-center navbar-search-wrapper py-2 w-100'
                    style={{
                      gap: '10px'
                    }}
                  >
                    <div role='button'>
                      <img alt='icon' src={Search} width='22px' height='22px' />
                    </div>
                    <input
                      placeholder='Search'
                      className='form-control px-2 w-100'
                    />
                  </div>
                  <div
                    onClick={() => {
                      setShowMobileSearch(false)
                    }}
                  >
                    <IoClose size='35' color='white' />
                  </div>
                </div>
              </>
            )}
          </div> */}
          <Header position={'fixed'} activeLink='' subPage={false} />

          <div
            className='hero-section px-3 px-md-5 position-relative'
            style={
              !matches
                ? {
                  backgroundImage: ` linear-gradient(
                  to right,
                  rgba(0, 0, 0, 0) 32.09%,
                  rgba(0, 0, 0, 0.75) 69.97%
                ),
                url(${heroEvent?.images[0]})`
                }
                : {
                  backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, -0.25) 100%
              ),
              url(${heroEvent?.images[0]})`
                }
            }
          >
            <div className='hero-ticket-details'>
              <div
                className='d-none d-md-flex align-items-center justify-content-end '
                style={{
                  gap: '22px'
                }}
              >
                <div className='text-center mt-2'>
                  <div
                    className='d-flex align-items-center text-center justify-content-center mb-0 '
                    style={{
                      gap: '9.27px'
                    }}
                  >
                    <div>
                      <img
                        src={location}
                        alt='icon'
                        height='23.94px'
                        width='20.o8px'
                      />
                    </div>
                    <p className='hero-event-location mb-0'>
                      {heroEvent?.location}
                    </p>
                  </div>
                  <div>
                    <h3 className='hero-event-name my-0 mb-1'>
                      {heroEvent?.name}
                    </h3>
                  </div>
                  <div
                    className='position-relative'
                    role='button'
                    style={{
                      zIndex: 990
                    }}
                  >
                    <button
                      className='get-event-btn btn'
                      onClick={() => {
                        setSelectedEvent(heroEvent)
                        toggleShowEventDetails()
                      }}
                    >
                      <span
                        style={{
                          marginRight: '9.06px',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={ticket}
                          alt='icon'
                          height='27.57px'
                          width='14.89px'
                        />
                      </span>
                      Get Ticket
                    </button>
                  </div>
                </div>
                <div className='mt-3'>
                  <TicketDate
                    date={moment(heroEvent?.date).format('MMM Do YYYY')}
                  />
                </div>
              </div>

              <div
                className='d-block d-md-none position-absolute w-100'
                style={{
                  gap: '22px',
                  bottom: 0,
                  zIndex: 9,
                  marginBottom: '16px'
                }}
              >
                <div
                  className='d-flex align-items-center justify-content-center '
                  style={{
                    gap: '0'
                  }}
                >
                  <div className='text-center mt-2'>
                    <p className='hero-event-location mb-1'>
                      <span
                        style={{
                          marginRight: '3px'
                        }}
                      >
                        <img
                          src={location}
                          alt='icon'
                          height='14px'
                          width='17px'
                        />
                      </span>
                      {heroEvent?.location}
                    </p>

                    <h3 className='hero-event-name my-0 mb-1'>
                      {heroEvent?.name}
                    </h3>
                    <button
                      className='get-event-btn btn w-75 px-1'
                      onClick={() => {
                        setSelectedEvent(heroEvent)
                        toggleShowEventDetails()
                      }}
                    >
                      <div
                        className='d-flex align-items-center justify-content-center'
                        style={{
                          gap: '9.06px'
                        }}
                      >
                        <span>
                          <img
                            src={ticket}
                            alt='icon'
                            height='19px'
                            width='10px'
                          />
                        </span>
                        Get Ticket
                      </div>
                    </button>
                  </div>
                  <div className='pt-1'>
                    <TicketDate
                      size='md'
                      date={moment(heroEvent?.date).format('MMM Do YYYY')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='linear-gradient-bg d-block position-absolute'></div>
          </div>
          <section className='feature-event-section px-3 px-md-5 mb-4'>
            <div>
              <h3 className='section-title mb-2'>Featured Events</h3>
            </div>
            <div
              className='overflow-scroll d-flex position-relative'
              style={{
                width: '100%'
              }}
            >
              {/* <AliceCarousel
            mouseTracking
            items={items}
            animationDuration={500}
            autoPlay={true}
            autoPlayInterval={1000}
            disableButtonsControls={true}
            disableDotsControls={true}
            disableSlideInfo={true}
            infinite={true}
            responsive={responsive}
            animationType="scroll"
            keyboardNavigation={true}
          /> */}
              <Marquee
                className='d-flex cstm-marquee'
                gradient={false}
                // pauseOnHover={true}
                speed={30}
                loop={0}
                style={{
                  gap: '22px'
                }}
              >
                {allFeaturedEvents?.map(el => (
                  <div className='event-card' style={{ marginLeft: 10 }}>
                    <div className='event-img-wrapper position-relative w-100'>
                      <img
                        src={el?.images[0]}
                        className='event-img'
                        alt='event-img'
                      />
                      <div
                        className='position-absolute'
                        style={{
                          right: '-6px',
                          bottom: '-32px'
                        }}
                      >
                        <TicketDate
                          size={'sm'}
                          date={moment(el?.date).format('MMM Do YYYY')}
                        />
                      </div>
                    </div>
                    <div className='event-details-wrapper px-2 text-white py-1'>
                      <div className=''>
                        <div
                          className='d-flex align-items-center mb-0 '
                          style={{
                            gap: '4px'
                          }}
                        >
                          <div>
                            <img
                              src={location}
                              alt='icon'
                              height='13.95px'
                              width='11px'
                            />
                          </div>
                          <p className='event-location mb-0'>{el?.location}</p>
                        </div>
                        <h3 className='event-name my-0 mb-3'>{el?.name}</h3>
                        <button
                          className='get-ticket-btn btn w-100 mb-2 py-3'
                          onClick={() => {
                            setSelectedEvent(el)
                            toggleShowEventDetails()
                          }}
                        >
                          Get Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
              {/* <div
            role='button'
            className={`event-card-controller position-absolute`}
            onClick={scrollRight}
          >
            <img src={arrowRight} />
          </div> */}
            </div>
          </section>

          <section class='upcoming-event-section px-3 px-md-5 pb-5'>
            <div>
              <h3 className='section-title mb-2 text-white'>Upcoming Events</h3>
            </div>
            <div>
              <Row className='g-4'>
                {allEvents.map(el => (
                  <Col sm='12' md='6' lg='3'>
                    <div
                      className=''
                      style={{
                        background: '#282828',
                        borderRadius: '12.0074px'
                      }}
                    >
                      <div className='event-img-wrapper position-relative'>
                        <img
                          src={el?.images[0]}
                          className='event-img'
                          alt='event-img'
                        />
                        <div
                          className='position-absolute'
                          style={{
                            right: '-6px',
                            bottom: '-32px'
                          }}
                        >
                          <TicketDate
                            size={'sm'}
                            date={moment(el?.date).format('MMM Do YYYY')}
                          />
                        </div>
                      </div>
                      <div className='event-details-wrapper px-3 text-white py-0'>
                        <div className=''>
                          <div
                            className='d-flex align-items-center  mt-0 mb-0'
                            style={{
                              gap: '4px'
                            }}
                          >
                            <div>
                              <img
                                src={location}
                                alt='icon'
                                height='9.66px'
                                width='8px'
                              />
                            </div>
                            <p className='event-location mb-0'>
                              {el?.location}
                            </p>
                          </div>

                          <h3 className='event-name my-0 mb-2'>{el?.name}</h3>
                          <div className='mb-1 d-flex justify-content-between'>
                            <p className='mb-0 event-price-wrapper'>
                              From: {/* <span> */}
                              {/* <img src={naira} alt='icon' />
                          {' '}5,000,000,000
                        </span> */}
                              <span className='ticket-price mt-3'>
                                {' '}
                                <img src={naira} alt='icon' />{' '}
                                {fecthLowerPrice(el?.tickets)}
                              </span>
                            </p>
                            <div className=''>
                              <button
                                className='get-ticket-btn btn  mb-2  '
                                style={{
                                  padding: '11px 20px'
                                }}
                                onClick={() => {
                                  setSelectedEvent(el)
                                  toggleShowEventDetails()
                                }}
                              >
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
                {/*  */}
              </Row>
            </div>
          </section>

          <section class='upcoming-event-section px-3 px-md-5 pb-5'>
            <div>
              <h3 className='section-title mb-2 text-white'>Trending Events</h3>
            </div>
            <div>
              <Row className='g-4'>
                {allEvents.map(el => (
                  <Col sm='12' md='6' lg='3'>
                    <div
                      className=''
                      style={{
                        background: '#282828',
                        borderRadius: '12.0074px'
                      }}
                    >
                      <div className='event-img-wrapper position-relative'>
                        <img
                          src={el?.images[0]}
                          className='event-img'
                          alt='event-img'
                        />
                        <div
                          className='position-absolute'
                          style={{
                            right: '-6px',
                            bottom: '-32px'
                          }}
                        >
                          <TicketDate
                            size={'sm'}
                            date={moment(el?.date).format('MMM Do YYYY')}
                          />
                        </div>
                      </div>
                      <div className='event-details-wrapper px-3 text-white py-0'>
                        <div className=''>
                          <div
                            className='d-flex align-items-center  mt-0 mb-0'
                            style={{
                              gap: '4px'
                            }}
                          >
                            <div>
                              <img
                                src={location}
                                alt='icon'
                                height='9.66px'
                                width='8px'
                              />
                            </div>
                            <p className='event-location mb-0'>
                              {el?.location}
                            </p>
                          </div>

                          <h3 className='event-name my-0 mb-2'>{el?.name}</h3>
                          <div className='mb-1 d-flex justify-content-between'>
                            <p className='mb-0 event-price-wrapper'>
                              From: {/* <span> */}
                              {/* <img src={naira} alt='icon' />
                          {' '}5,000,000,000
                        </span> */}
                              <span className='ticket-price mt-3'>
                                {' '}
                                <img src={naira} alt='icon' />{' '}
                                {fecthLowerPrice(el?.tickets)}
                              </span>
                            </p>
                            <div className=''>
                              <button
                                className='get-ticket-btn btn  mb-2  '
                                style={{
                                  padding: '11px 20px'
                                }}
                                onClick={() => {
                                  setSelectedEvent(el)
                                  // toggleShowEventDetails()
                                }}
                              >
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
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
            <Row
              className='gx-0 bg-black'
              style={{
                borderRadius: '20px'
              }}
            >
              <Col
                sm='12'
                md='6'
                className='bg-black left-event-details-container '
                style={{
                  height: '95vh',
                  borderRadius: '20px'
                  // overflow: 'hidden'
                }}
              >
                <div
                  className='event-details-img-container position-relative bg-black'
                  style={{
                    borderRadius: '20px',
                    height: '100%'
                  }}
                >
                  <img
                    src={selectedEvent?.images[activeSlide]}
                    alt='event-details'
                    className='event-details-img'
                    style={{
                      height: '100%',

                      borderRadius: '20px'
                    }}
                  />
                  <div
                    className='position-absolute slider-arrow left'
                    role='button'
                    onClick={() => {
                      setActiveSlide(activeSlide > 0 ? activeSlide - 1 : 0)
                    }}
                  >
                    <MdKeyboardArrowLeft color='white' size='40' />
                  </div>
                  <div
                    className='position-absolute slider-arrow right'
                    onClick={() => {
                      setActiveSlide(
                        activeSlide < selectedEvent?.images.length - 1
                          ? activeSlide + 1
                          : selectedEvent?.images.length - 1
                      )
                    }}
                  >
                    <MdKeyboardArrowRight
                      color='white'
                      size='40'
                      role='button'
                    />
                  </div>
                  <div
                    className='d-flex justify-content-center align-items-center position-absolute slider-indicator-wrapper'
                    style={{
                      gap: '13.78px',
                      bottom: '28px',
                      width: '100%'
                    }}
                  >
                    {selectedEvent?.images.map((el, i) => (
                      <div
                        className={`slider-indicator ${i === activeSlide ? 'active' : ''
                          }`}
                      />
                    ))}
                    {/* <div className='slider-indicator active'></div>
                    <div className='slider-indicator'></div>
                    <div className='slider-indicator'></div>
                    <div className='slider-indicator'></div>
                    <div className='slider-indicator'></div> */}
                  </div>

                  {/* <div
                className='d-block d-md-none close-modal-btn position-absolute'
                role='button'
                onClick={() => {
                  toggleShowEventDetails()
                }}
              >
                <IoClose size='35' color='white' />
              </div> */}
                </div>
              </Col>

              <Col
                sm='12'
                md='6'
                className='bg-black event-right-ticket-details'
                style={{
                  height: '95vh',
                  overflow: 'scroll',
                  borderRadius: '0 20px 20px 0'
                }}
              >
                {activeTab === 'event-details' ? (
                  <>
                    <div>
                      <div
                        className='d-flex align-items-center justify-content-between modal-event-details-wrapper'
                        style={{
                          gap: '22px'
                        }}
                      >
                        <div className=' mt-2 mb-3'>
                          <h3 className='event-name my-0 mb-0'>
                            {selectedEvent?.name}
                          </h3>
                          <div
                            className='d-flex  mb-3 '
                            style={{
                              gap: '4px'
                            }}
                          >
                            <div>
                              <img
                                className='event-details-location-icon'
                                src={location}
                                alt='icon'
                                height='20px'
                                width='20px'
                              />
                            </div>
                            <p className='event-location mb-0'>
                              {selectedEvent?.location}
                            </p>
                          </div>
                          <div>
                            <p className='event-details event-type-tag mb-0 py-1 text-center '>
                              {`${selectedEvent?.type?.name} Event`}
                            </p>
                          </div>
                        </div>
                        <div className='event-ticketdate-right-container'>
                          <TicketDate
                            size='md'
                            date={moment(selectedEvent?.date).format(
                              'MMM Do YYYY'
                            )}
                          />
                        </div>
                      </div>
                      <p className='mb-3 event-description'>
                        {selectedEvent?.description}
                      </p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                      <div
                        className='d-flex align-items-center event-timer-wrapper'
                        style={{
                          gap: '14.54px'
                        }}
                      >
                        <div>
                          <img src={clock} alt='icon' className='clock-icon' />
                        </div>
                        <h3 className='event-date mb-0'>11:30pm - 03:00am</h3>
                      </div>
                      <div
                        className='d-flex align-items-center event-timer-wrapper'
                        style={{
                          gap: '14.54px'
                        }}
                      >
                        <div>
                          <img
                            src={calendar}
                            alt='icon'
                            className='calendar-icon'
                          />
                        </div>
                        <h3
                          className='add-to-calendar mb-0'
                          // id='default-atcb-button'
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={e => {
                            atcb_action(config, e.target)
                          }}
                        >
                          Add to calendar
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h3 className='event-ticket-section'>Tickets</h3>
                      {selectedEvent?.tickets.map((el, i) => (
                        <div className='event-ticket-group py-1 mb-3'>
                          <div className=' d-flex justify-content-between px-1 px-md-2 align-items-center'>
                            <div>
                              <p className='event-ticket-type mb-0'>
                                {el?.name}
                              </p>
                              <div
                                className='d-flex'
                                style={{
                                  gap: '5.61px'
                                }}
                              >
                                <div>
                                  <img
                                    src={naira}
                                    width='23.89px'
                                    height='26.55px'
                                    className='modal-naira-icon'
                                  />
                                </div>
                                <div>
                                  <h3 className='event-ticket-price'>
                                    {el?.price}
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '17px'
                              }}
                            >
                              <div
                                className='  text-center'
                                role='button'
                                onClick={() => {
                                  setTicketValue(i, 'decrement')
                                }}
                              >
                                <img
                                  src={minusIcon}
                                  alt='icon'
                                  className='modal-sum-button'
                                />
                              </div>
                              <div
                                className=' text-white '
                                role='input'
                                contenteditable='true'
                              >
                                {ticketOrderDetails.length > 0
                                  ? ticketOrderDetails[i]
                                  : 1}
                              </div>
                              <div
                                className='  right'
                                role='button'
                                onClick={() => {
                                  setTicketValue(i, 'increment')
                                }}
                              >
                                <img
                                  src={addIcon}
                                  alt='icon'
                                  className='modal-sum-button'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* <div className='event-ticket-group py-1 mb-3'>
                        <div className=' d-flex justify-content-between px-1 px-md-2 align-items-center'>
                          <div>
                            <p className='event-ticket-type mb-0'>Regular</p>
                            <div
                              className='d-flex'
                              style={{
                                gap: '5.61px'
                              }}
                            >
                              <div>
                                <img
                                  src={naira}
                                  width='23.89px'
                                  height='26.55px'
                                  className='modal-naira-icon'
                                />
                              </div>
                              <div>
                                <h3 className='event-ticket-price'>5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div
                            className='d-flex align-items-center'
                            style={{
                              gap: '17px'
                            }}
                          >
                            <div className='  text-center' role='button'>
                              <img
                                src={minusIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                            <div className='ticket-order-value text-white'>
                              2
                            </div>
                            <div className='  right' role='button'>
                              <img
                                src={addIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='event-ticket-group py-1 mb-3 bg-transparent'>
                        <div className=' d-flex justify-content-between px-1 px-md-2 align-items-center'>
                          <div>
                            <p className='event-ticket-type mb-0'>VIP</p>
                            <div
                              className='d-flex'
                              style={{
                                gap: '5.61px'
                              }}
                            >
                              <div>
                                <img
                                  src={naira}
                                  width='23.89px'
                                  height='26.55px'
                                  className='modal-naira-icon'
                                />
                              </div>
                              <div>
                                <h3 className='event-ticket-price'>10,000</h3>
                              </div>
                            </div>
                          </div>
                          <div
                            className='d-flex align-items-center'
                            style={{
                              gap: '19px'
                            }}
                          >
                            <div className='  text-center' role='button'>
                              <img
                                src={minusIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                            <div className='ticket-order-value text-white'>
                              1
                            </div>
                            <div className='  right' role='button'>
                              <img
                                src={addIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='event-ticket-group py-1 mb-3'>
                        <div className=' d-flex justify-content-between px-1 px-md-2 align-items-center'>
                          <div>
                            <p className='event-ticket-type mb-0'>VVIP</p>
                            <div
                              className='d-flex'
                              style={{
                                gap: '5.61px'
                              }}
                            >
                              <div>
                                <img
                                  src={naira}
                                  width='23.89px'
                                  height='26.55px'
                                  className='modal-naira-icon'
                                />
                              </div>
                              <div>
                                <h3 className='event-ticket-price'>15,000</h3>
                              </div>
                            </div>
                          </div>
                          <div
                            className='d-flex align-items-center'
                            style={{
                              gap: '19px'
                            }}
                          >
                            <div className='  text-center' role='button'>
                              <img
                                src={minusIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                            <div className='ticket-order-value text-white'>
                              1
                            </div>
                            <div className='  right' role='button'>
                              <img
                                src={addIcon}
                                alt='icon'
                                className='modal-sum-button'
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div
                      className='mt-4'
                      style={{
                        marginBottom: '22px'
                      }}
                    >
                      <div>
                        <h3 className='event-location-section mb-3'>
                          Locate event on Map
                        </h3>
                      </div>
                      <div className='mb-3'>
                        <img src={map} alt='map' width='100%' />
                      </div>
                      <p
                        className='text-center  mx-auto event-location-text mb-0'
                        style={{
                          width: '169px'
                        }}
                      >
                        Know the exact place this event will be holding
                      </p>
                    </div>
                    <div
                      className=''
                      style={{
                        marginBottom: '26px'
                      }}
                    >
                      <button
                        className='btn w-100 mb-3 get-ticket-btn py-3'
                        onClick={() => {
                          setActiveTab('')
                          const arr = []
                          Array.from(
                            document.getElementsByClassName(
                              'ticket-order-value'
                            )
                          ).map(el => arr.push(el.innerHTML))
                          setTicketOrderDetails(arr)
                          calculateTicketTotalPrice()
                        }}
                      >
                        Get Ticket
                      </button>

                      <ShareOnSocial
                        textToShare={selectedEvent?.description}
                        link={`${window.location.href}event/${selectedEvent?._id}`}
                        linkTitle={selectedEvent?.name}
                        linkFavicon={selectedEvent?.images[0]}
                        linkMetaDesc={selectedEvent?.description}
                        backdropColor={'rgba(0,0,0,0.9)'}
                        sites={[
                          'facebook',
                          'twitter',
                          'whatsapp',
                          'reddit',
                          'telegram',
                          'linkedin',
                          'mail',
                          'copy (Copy to Clipboard)'
                        ]}
                      >
                        <button
                          className='btn w-100  share-event-btn py-3 bg-white'
                          style={{
                            color: '#00E194'
                          }}
                        >
                          <span
                            style={{
                              marginRight: '7.5px'
                            }}
                          >
                            <img src={share} alt='icon' />
                          </span>{' '}
                          Share
                        </button>
                      </ShareOnSocial>
                    </div>

                    <div className='social-media-link-section mb-4'>
                      <h1 className='social-media-link-text text-center'>
                        Social media links
                      </h1>
                      <div
                        className='d-flex  align-items-center justify-content-center '
                        style={{
                          gap: '23px'
                        }}
                      >
                        <div className=''>
                          <button className='social-media-btn btn'>
                            <img src={facebookOutline} />
                          </button>
                        </div>
                        <div className=''>
                          <button className='social-media-btn btn'>
                            <img src={instagram} width='30px' height='30px' />
                          </button>
                        </div>
                        <div className=''>
                          <button className='social-media-btn btn'>
                            <img src={twitter} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='mb-0'>
                      <h1 className='social-media-link-text '>
                        Similar Events
                      </h1>

                      <div
                        className='d-flex align-items-center similar-events-wrapper overflow-scroll'
                        style={{
                          gap: '28px'
                        }}
                      >
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='event-card'>
                          <div className='event-img-wrapper position-relative'>
                            <img
                              src={eventImg}
                              className='event-img'
                              alt='event-img'
                            />
                            <div
                              className='position-absolute'
                              style={{
                                right: '-6px',
                                bottom: '-32px'
                              }}
                            >
                              <TicketDate size={'sm'} />
                            </div>
                          </div>
                          <div className='event-details-wrapper px-2 text-white py-1'>
                            <div className=''>
                              <div
                                className='d-flex align-items-center mb-0 '
                                style={{
                                  gap: '4px'
                                }}
                              >
                                <div>
                                  <img
                                    src={location}
                                    alt='icon'
                                    height='13px'
                                    width='16px'
                                  />
                                </div>
                                <p className='event-location mb-0'>
                                  Jack’s Place, Maryland Lagos
                                </p>
                              </div>
                              <h3 className='event-name my-0 mb-3'>
                                Music Events
                              </h3>
                              <button className='get-ticket-btn btn w-100 mb-2 py-3'>
                                Get Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='py-4 px-md-3 px-0'>
                    <div
                      className='d-flex align-items-center mb-3'
                      style={{
                        gap: '12px'
                      }}
                    >
                      <div
                        role='button'
                        onClick={() => {
                          setActiveTab('event-details')
                        }}
                      >
                        <BiArrowBack size='25' color='#fff' />
                      </div>
                      <h1 className='social-media-link-text mb-0'>
                        Ticket Order
                      </h1>
                    </div>
                    {selectedEvent?.tickets.map((el, i) => (
                      <div className='w-100 mb-3 event-order-input'>
                        <img
                          src={ticketOrder}
                          alt='order-input'
                          className='w-100'
                        />
                        <div className='ticket-type'>{`${ticketOrderDetails[i]}X ${el?.name}`}</div>
                        <div className='ticket-price-details position-absolute'>
                          {
                            Number(ticketOrderDetails[i]) * el?.price === 0 ? <h3 className='mb-0'>
                              Free
                            </h3> : <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '7px'
                              }}
                            >

                              <div>
                                <img
                                  className='naira-icon'
                                  src={naira}
                                  alt='icon'
                                  height='26px'
                                  width='23px'
                                />
                              </div>
                              <h3 className='mb-0'>
                                {Number(ticketOrderDetails[i]) * el?.price}
                              </h3>
                            </div>
                          }

                        </div>
                      </div>
                    ))}

                    <div>
                      <div className='total-ticket-container w-100 d-flex  align-items-center justify-content-between mb-3'>
                        <h3 className='total-ticket-ordered mb-0'>
                          {`Total(${ticketOrderDetails.reduce(
                            (x, y) => Number(x) + Number(y)
                          )})`}
                        </h3>
                        <h3 className='total-ticket-price mb-0'>
                          <span style={{ marginRight: '6.83px' }}>
                            <img
                              src={whiteNaira}
                              alt='icon'
                              className='naira-icon'
                            />
                          </span>
                          {ticketOrderDetails
                            .map(
                              (ele, i) => ele * selectedEvent?.tickets[i]?.price
                            )
                            .reduce((x, y) => Number(x) + Number(y))}
                        </h3>
                      </div>
                    </div>

                    <div className='d-flex align-items-center justify-content-between mb-4'>
                      <p className='ticket-settings mb-0'>
                        Use same info on other tickets
                      </p>
                      <div>
                        <Switch
                          onChange={toggleChecked}
                          checked={checked}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          className={`ticket-control-switch ${checked ? 'active' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <form className='ticket-settings-form mb-2'>
                      {!checked ? (
                        <>
                          <div
                            className='d-flex align-items-center'
                            style={{
                              gap: '8px',
                              marginBottom: '29px'
                            }}
                          >
                            <h3 className='ticket-settings-title mb-0 w-100'>
                              Buyer’s information
                            </h3>
                            <div className='w-100'>
                              <img
                                src={lineIcon}
                                alt='icon'
                                className='w-100'
                              />
                            </div>
                          </div>
                          <div className='mb-2 '>
                            <label>Full Name</label>
                            <input className='form-control px-3 py-3' />
                          </div>
                          <div className='mb-2 '>
                            <label>Email</label>
                            <input className='form-control px-3 py-3' />
                          </div>{' '}
                          <div className='mb-4 '>
                            <label>Phone Number</label>
                            <input className='form-control px-3 py-3' />
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className='mb-3'>
                            <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '8px',
                                marginBottom: '22px'
                              }}
                            >
                              <h3 className='ticket-settings-title mb-0 '>
                                Regular
                              </h3>
                              <div className='w-100'>
                                <img
                                  src={lineIcon}
                                  alt='icon'
                                  className='w-100'
                                />
                              </div>
                            </div>
                            <div className='mb-2 '>
                              <label>Full Name</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                            <div className='mb-2 '>
                              <label>Email</label>
                              <input className='form-control px-3 py-3' />
                            </div>{' '}
                            <div className='mb-4 '>
                              <label>Phone Number</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                          </div>

                          <div className='mb-3'>
                            <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '8px',
                                marginBottom: '22px'
                              }}
                            >
                              <h3 className='ticket-settings-title mb-0 '>
                                Regular
                              </h3>
                              <div className='w-100'>
                                <img
                                  src={lineIcon}
                                  alt='icon'
                                  className='w-100'
                                />
                              </div>
                            </div>
                            <div className='mb-2 '>
                              <label>Full Name</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                            <div className='mb-2 '>
                              <label>Email</label>
                              <input className='form-control px-3 py-3' />
                            </div>{' '}
                            <div className='mb-4 '>
                              <label>Phone Number</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                          </div>

                          <div className='mb-3'>
                            <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '8px',
                                marginBottom: '22px'
                              }}
                            >
                              <h3 className='ticket-settings-title mb-0 '>
                                VIP
                              </h3>
                              <div className='w-100'>
                                <img
                                  src={lineIcon}
                                  alt='icon'
                                  className='w-100'
                                />
                              </div>
                            </div>
                            <div className='mb-2 '>
                              <label>Full Name</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                            <div className='mb-2 '>
                              <label>Email</label>
                              <input className='form-control px-3 py-3' />
                            </div>{' '}
                            <div className='mb-4 '>
                              <label>Phone Number</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                          </div>

                          <div className='mb-3'>
                            <div
                              className='d-flex align-items-center'
                              style={{
                                gap: '8px',
                                marginBottom: '22px'
                              }}
                            >
                              <h3 className='ticket-settings-title mb-0 '>
                                VVIP
                              </h3>
                              <div className='w-100'>
                                <img
                                  src={lineIcon}
                                  alt='icon'
                                  className='w-100'
                                />
                              </div>
                            </div>
                            <div className='mb-2 '>
                              <label>Full Name</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                            <div className='mb-2 '>
                              <label>Email</label>
                              <input className='form-control px-3 py-3' />
                            </div>{' '}
                            <div className='mb-4 '>
                              <label>Phone Number</label>
                              <input className='form-control px-3 py-3' />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className='mb-5 pb-4'>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                          <p className='ticket-settings mb-0'>Got a Coupon?</p>
                          <div>
                            <Switch
                              onChange={toggleCoupon}
                              checked={coupon}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              className={`ticket-control-switch ${coupon ? 'active' : ''
                                }`}
                            />
                          </div>
                        </div>
                        {coupon && (
                          <div className='mb-3 coupon-wraper'>
                            <label>Enter Coupon Code</label>
                            <div className='coupon-input-wrapper'>
                              <input className='form-control px-3 py-3' />
                              <button className='btn px-3 py-3'>Verify</button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className='d-flex align-items-cente mt-5 mb-3'
                        style={{
                          gap: '10px'
                        }}
                      >
                        <input
                          type='checkbox'
                          className='terms-conditions-checkbox mb-1'
                        />
                        <p className='terms-conditions-text mb-4 pt-0'>
                          I accept the terms and conditions for using this
                          service, and hereby confirm I have read the privacy
                          policy.
                        </p>
                      </div>
                      <div>
                        <button className='btn get-ticket-btn w-100 py-3'>
                          Make Payment
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Col>
            </Row>
            <div
              className='close-modal-btn position-absolute'
              role='button'
              onClick={() => {
                toggleShowEventDetails()
              }}
            >
              <IoClose size='35' color='white' />
            </div>
          </Modal>

          <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
        </div>
      )}
    </>
  )
}

export default Home
