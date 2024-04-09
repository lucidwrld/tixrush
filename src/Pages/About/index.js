import React, { useState, useEffect } from 'react'
import ArrowDown from '../../Assets/img/arrowdown.svg'
import Search from '../../Assets/img/search.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import MobileMenu from '../../Components/MobileMenu'
import Footer from '../../Components/AppLayout/Footer'
import {
  MdAdd,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown
} from 'react-icons/md'
import menu from '../../Assets/img/menu.svg'
import logo from '../../Assets/img/logoC.png'
import { Row, Col, Modal, Button } from 'reactstrap'
import { IoClose } from 'react-icons/io5'
import Header from '../../Components/Header'
import axios from 'axios'
import Axios from '../../Utils/axios.js'
import aboutImage from '../../Assets/img/about_us.svg'
import aboutLite from '../../Assets/img/about_lite.svg'
import ab1 from '../../Assets/img/ab1.svg'
import ab_2 from '../../Assets/img/ab_2.svg'
import ab_3 from '../../Assets/img/ab_3.svg'
import ab_4 from '../../Assets/img/ab_4.svg'
import ab_5 from '../../Assets/img/ab_5.svg'
import ab_6 from '../../Assets/img/ab_6.svg'
import abt1 from '../../Assets/img/abu1.png'
import abt2 from '../../Assets/img/abu2.png'
import abt3 from '../../Assets/img/abu3.png'
import abt4 from '../../Assets/img/abu4.png'
import abt5 from '../../Assets/img/abu5.png'
import abtt5 from '../../Assets/img/abt5.png'
import abtt6 from '../../Assets/img/abt6.png'
import abtt7 from '../../Assets/img/abt7.png'
import abtt8 from '../../Assets/img/abt8.png'
import w1 from '../../Assets/img/w1.svg'
import light from '../../Assets/img/lightEffect.png'





const Contact = () => {
  // const [showMobileMenu, setShowMobileMenu] = useState(false)
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

  const [about, setAbout] = useState(null)

  const BASE_URL = 'https://api.tixrush.com/api/v1'

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

  const filterSettings = (settings, title) => {
    const result = settings.filter(el => el.title.toLowerCase() === 'about')
    return result
  }

  const getSettings = async () => {
    try {
      const response = await caxios.get(`/settings/setup/view`)
      const result = filterSettings(response.data.data, 'about')

      setAbout(result)
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchKey()
  }, [])

  useEffect(() => {
    if (apiKey) {
      getSettings()
    }
  }, [apiKey])



  return (
    <div>
      <Header position={'fixed'} activeLink='about' subPage={true} />
      
      <section className='px-2 px-md-5 pt-2 pb-4 ' >
        <div className='d-flex justify-content-between align-items-center mt-5' >
          <h3 className='page-section-title  mb-5'>About Us</h3>
        </div>

        {/* <div>
          {
            about && <div className='about-us-tex text-white mb-4 px-md-5 px-2 mt-md-0 mt-3' dangerouslySetInnerHTML={{ __html: about[0]?.body }}>

            </div>
          }

        </div> */}
        
        <div className='mb-5 pb-5 checkk'>
          <Row>
          
              <div
                className='mobileview about-img_containner'
              >
                <img loading='lazy' src={aboutImage} alt='img' className='object-cover ' style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'

                }} />
              </div>
            <Col>
              <div className='mb-5 container-aboutUs'>
                <h3 className='about_us-header'>Welcome to TixRush:</h3>
                <p className='about_us-text'> At TixRush, we believe that life's most memorable moments deserve to be accompanied by unforgettable experiences. That's why we're here, dedicated to making your ticketing experience as seamless, enjoyable, and memorable as the events you attend. Whether you're a sports fanatic, a music enthusiast, a theater buff, or simply someone looking for a great night out, TixRush is your one-stop ticketing destination.</p>
              </div>
              <div className=''>
                <h3 className='about_us-header'> Who We Are: </h3>
                <p className='about_us-text'> We are a passionate team of event enthusiasts, tech-savvy professionals, and customer service champions, united by our love for live events. Our mission is to connect you with the events that matter most to you, providing a hassle-free ticketing experience that puts the excitement of live entertainment at your fingertips.</p>
              </div>
            </Col>
          <Col className=' webview' style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
              <div
                className='about-img_containner'
                style={{padding: '0', margin: '0'}}
              >
                <div loading='lazy'  alt='img' className='object-cover ' style={{
                  background: `url(${aboutImage})`,
                  width: '100%',
                  height: '457px',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionX: "center",
                  backgroundPositionY: "center"

                }} ></div>
              </div>
            </Col> 
          </Row>
        </div>
        <div className='about-section__wrapper'>
          <div style={{ height: 'auto', position: 'relative', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h3 className='text-center about-us__sub-header mb-1 text-white'>Why Choose TixRush?</h3>
            <img loading='lazy' src={light} alt='light' width={'100%'} height={'100%'}  style={{ position: 'absolute', top: -175, height: "450px" }} />
          </div>
          <Row className='g-5' style={{marginTop: "65px"}}>
            <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab1} alt='icon' />
                </div>
                <h4 className='feature_header'>Extensive Event Selection</h4>
                <p className='feature-textt'>TixRush offers an extensive selection of tickets to a wide variety of events. Whether you're into the hottest concerts, thrilling sporting events, or captivating Broadway shows, we've got you covered. Discover events both big and small, and find your perfect experience.</p>
              </div>
            </Col>
            <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab_2} alt='icon' />
                </div>
                <h4 className='feature_header'>User-Friendly Experience</h4>
                <p className='feature-textt'>We've designed our website and mobile app with you in mind. Our intuitive platform makes it easy to search, browse, and purchase tickets, so you can spend less time navigating and more time looking forward to your event.</p>
              </div>
            </Col> <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab_3} alt='icon' />
                </div>
                <h4 className='feature_header'>Transparent Pricing</h4>
                <p className='feature-textt'>We believe in honesty and transparency. With TixRush, what you see is what you get. No hidden fees, no surprises—just clear and upfront pricing that allows you to budget with confidence.</p>
              </div>
            </Col> <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab_4} alt='icon' />
                </div>
                <h4 className='feature_header'>Secure and Trusted Transactions</h4>
                <p className='feature-textt'>Your security is our top priority. We utilize state-of-the-art encryption and security measures to ensure your personal information is safe and your transactions are secure. Buy with confidence, knowing you're protected every step of the way</p>
              </div>
            </Col> <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab_5} alt='icon' />
                </div>
                <h4 className='feature_header'>Exceptional Customer Support</h4>
                <p className='feature-textt'>THave questions or need assistance? Our dedicated customer support team is here to help. From pre-purchase inquiries to post-event feedback, we're committed to providing you with exceptional service every step of the way</p>
              </div>
            </Col> <Col sm='12' md='6' lg='4'>
              <div className='text-center'>
                <div className='mb-3'>
                  <img loading='lazy' src={ab_6} alt='icon' />
                </div>
                <h4 className='feature_header'>Exclusive Deals and Promotions</h4>
                <p className='feature-textt'>Keep an eye out for our exclusive deals and promotions, helping you make the most of your entertainment budget. Join our mailing list to stay updated on the latest offers and discounts.</p>
              </div>
            </Col>
          </Row>

        </div>

        <div>

          <div style={{ height: 'auto', position: 'relative' }}>
            <h3 className='text-center about-us__sub-header mb-5 text-white'>How it Works</h3>
            <img loading='lazy' src={light} alt='light' width={'100%'} height={'100%'}  style={{ position: 'absolute', top: -175, height: "450px" }} />
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{marginTop: "65px"}}>
            <h3 className='page-section-title dif about-section-title  mb-5'>For Hosts</h3>
          </div>
          <Row className='g-5 align-items-center'>

          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abt1})`, backgroundRepeat: 'no-repeat' }}>
              </div>

            <Col sm='12' md='6' className='mobil' >
              <div className=''>


                <h4 className='feature_header'>Sign up or Login</h4>
                <p className='feature-text text-left'>
                Download our App from Google Play Store or the Apple Store and create an account by inputing your details, if you already have an account please go ahead and Login.
                </p>
              </div>
            </Col>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abt1})` }}>
              </div> 
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abt2})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abt2})` }}>
              </div>
            </Col>
            <Col sm='12' md='6' className='mobil' >
              <div className=''>


                <h4 className='feature_header'>Pick an Event type</h4>
                <p className='feature-text text-left'>
                Choose the kind of Event ypu want to Create Is it Public, Private  or  Online? Don’t worry, we’ve got you covered
                </p>
              </div>
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abt3})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6' className='mobil'>
              <div className=''>


                <h4 className='feature_header'>Enter Event Details</h4>
                <p className='feature-text text-left'>
                Enter the necessary Event details, multiple images and only one  video is allowed. The video is used as the title and in a case where there is no video the first image is used as the title image.
                </p>
              </div>
            </Col>
            <Col sm='12' md='6' className='spacingImg' >
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abt3})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abt4})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abt4})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
            <Col sm='12' md='6' className='mobil' >
              <div className=''>


                <h4 className='feature_header'>Enter Ticket Princing</h4>
                <p className='feature-text text-left'>
                Enter Ticket category names, number of tickets for each category and the prices for those categories that best suits you and publish.<br/><br/>
                <span><b>NOTE:</b> Ticket categories can also be set to free!</span>
                </p>
              </div>
            </Col>
            
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abt5})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6' className='mobil'>
              <div className=''>


                <h4 className='feature_header'>Get to manage your events</h4>
                <p className='feature-text text-left'>
                Scan guest’s  tickets to allow access, Check event analytics to see how well your ticket sales are doing then, Get to invite co-hosts to help you scan guest’s tickets.<br/><br/>
                
                </p>
              </div>
            </Col>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abt5})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
            
          </Row>

        </div>

        {/* For Buyers */}
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='page-section-title dif about-section-title  mb-5'>For Attendees</h3>
          </div>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abtt5})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6'  className='mobil'>
              <div className=''>


                <h4 className='feature_header'>Find Events</h4>
                <p className='feature-text text-left'>
                Look for events on both our website or our app, Click on “Get Ticket” for the event you want on the Home screen, this will take you to the event page.
                </p>
              </div>
            </Col>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abtt5})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abtt6})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abtt6})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
            <Col sm='12' md='6'  className='mobil'>
              <div className=''>


                <h4 className='feature_header'>Select Ticket</h4>
                <p className='feature-text text-left'>
                Select the Type of ticket  and the number of tickets you want to buy, clicking on the plus button (+) increases the number of tickets, while clicking on the minus button (-) reduces the number of tickets.
                </p>
              </div>
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abtt7})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6'  className='mobil' >
              <div className=''>


                <h4 className='feature_header'>Make Payment</h4>
                <p className='feature-text text-left'>
                Once you’ve selected your tickets, On the ticket order page, you are required to enter an email or a  phone number or both,  then proceed to make payment.
                </p>
              </div>
            </Col>
            <Col sm='12' md='6' className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abtt7})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
          </Row>
          <Row className='g-5 align-items-center'>
          <div className='about_img_container-mobile' loading='lazy' style={{ background: `url(${abtt8})`, backgroundRepeat: 'no-repeat' }}>
              </div>
            <Col sm='12' md='6'  className='spacingImg'>
              <div className='about_img_container' loading='lazy' style={{ background: `url(${abtt8})` }}>
                {/* <div className='mb-3'>
                  <img src={w1} alt='icon' />
                </div> */}
              </div>
            </Col>
            <Col sm='12' md='6'  className='mobil'>
              <div className=''>


                <h4 className='feature_header'>Get Ticket</h4>
                <p className='feature-text text-left'>
                Tickets with your barcode will be received via email or Whatsapp once your payment is confirmed.
                </p>
              </div>
            </Col>
          </Row>

        </div>
      </section>

      <Footer />
      <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
    </div>
  )
}

export default Contact
