import React, { useState, useEffect } from 'react'
import emailIcon from '../../Assets/img/email.svg'
import phoneIcon from '../../Assets/img/phone.svg'
import twitter from '../../Assets/img/twitter.svg'
import instagram from '../../Assets/img/instagram.svg'
import facebook from '../../Assets/img/facebook.svg'
import { Row, Col } from 'reactstrap'
import MobileMenu from '../../Components/MobileMenu'
import Footer from '../../Components/AppLayout/Footer'
import Header from '../../Components/Header'
import axios from 'axios'
import notification from '../../Utils/notification'

import youtube from '../../Assets/img/youtube.svg'
import whatsapp from "../../Assets/img/whatsapp.svg"

const Contact = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [apiKey, setApiKey] = useState(null)

  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState(false)
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [message, setMessage] = useState(null)

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

  const filterSettings = (settings, title) => {
    const result = settings.filter(el => el.title.toLowerCase() === 'about')
    return result
  }

  const getSettings = async () => {
    try {
      const response = await caxios.get(`/settings/setup/view`)
      // const result = filterSettings(response.data.data, 'about')

      // setAbout(result)
    } catch (err) {
    }
  }

  const handleCreateContactUs = async () => {
    setLoading(true)

    try {
      if (first_name && last_name && email && phone && message) {
        const data = {
          firstName: first_name,
          lastName: last_name,
          email,
          phone,
          message
        }

        const response = await caxios.post('/contactus/contact', data)
        notification('success', response.data.message)
        setLoading(false)
        document.getElementById('contact_form').reset()
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
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
    <div className='bg-black'>
      <Header position={'fixed'} activeLink='contact' subPage={true} />

      <section className='px-3 px-md-5 pt-2 pb-4 '>
        <div className='d-flex justify-content-between align-items-center mt-5'>
          <h3 className='page-section-title mt-5'>Contact Us</h3>
          <div className='d-none d-lg-flex contact-page-icons'>
            <a target="_blank" href='https://www.instagram.com/tixrush/'>
              <img src={instagram} alt='icon' />{' '}
            </a>
            <a target="_blank" href='https://web.facebook.com/profile.php?id=100047784713786'>
              <img src={facebook} alt='icon' />{' '}
            </a>



            <a target="_blank" href='https://twitter.com/tixrushNG'>
              <img src={twitter} alt='icon' />{' '}
            </a>

            <a target="_blank" href='https://www.youtube.com/@tixrush'>
              <img src={youtube} alt='icon' />{' '}
            </a>
          </div>
        </div>

        <div className='d-flex  d-lg-none mt-5 justify-content-center contact-page-icons w-100'>
          <a target="_blank" href='https://www.instagram.com/tixrush/'>
            <img src={instagram} alt='icon' />{' '}
          </a>
          <a target="_blank" href='https://web.facebook.com/profile.php?id=100047784713786'>
            <img src={facebook} alt='icon' />{' '}
          </a>



          <a target="_blank" href='https://twitter.com/tixrushNG'>
            <img src={twitter} alt='icon' />{' '}
          </a>

          <a target="_blank" href='https://www.youtube.com/@tixrush'>
            <img src={youtube} alt='icon' />{' '}
          </a>
        </div>
        <div className=' d-flex justify-content-center align-items-center mt-5'>
          <div>
            <p
              className='text-center text-white 
          mb-0
          contact-page-text
          '
            >
              We are here for you, Feel free to make any requests, enquiries or
              complaint.
            </p>
            <p
              className='text-center text-white 
          mb-0
          contact-page-text
          '
            >
              We promise to get back to you as soon as we can.
            </p>
          </div>
        </div>
        <div className='d-block d-md-flex justify-content-center align-items-center mt-5 mb-4'>
          <div className='d-block d-md-flex justify-content-between align-items-center contact-us-icons-wrapper'>
            <div className='d-flex contact-us-icon-details-wrapper mb-3'>
              <div className='contact-us-icon'>
                <img src={emailIcon} alt='icon' />
              </div>
              <div className='mt-1'>
                <h5 className='mb-0 contact-us-icon-title'>Email</h5>
                <a href='mailto: support@tixrush.com' className='contact-us-icon-details text-white' style={{
                  textDecoration: 'none',
                  color: 'white !important'
                }}>
                  support@tixrush.com
                </a>

              </div>
            </div>
            <div className='d-flex contact-us-icon-details-wrapper mb-3'>
              <div className='contact-us-icon'>
                <img src={whatsapp} alt='icon' />
              </div>
              <div className='mt-1'>
                <h5 className='mb-0 contact-us-icon-title'>WhatsApp:</h5>
                <a className='mb-0 contact-us-icon-details' href="https://wa.me/message/PUHUEHUS53RLO1">
                wa.me/message/PUHUEHUS53RLO1
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto contact-form-wrapper'>
          <div>
            <h3 className='contact-form-text mb-0'>Contact Form</h3>
            <form className='contact-form' id='contact_form'>
              <Row className='g-3'>
                <Col sm='12' md='6'>
                  <label>First Name</label>
                  <input
                    className='form-control w-100 py-3 px-2'
                    onChange={e => {
                      setFirstName(e.target.value)
                    }}
                  />
                </Col>
                <Col sm='12' md='6'>
                  <label>Last Name</label>
                  <input
                    className='form-control w-100 py-3 px-2'
                    onChange={e => {
                      setLastName(e.target.value)
                    }}
                  />
                </Col>
                <Col sm='12' md='6'>
                  <label>Email Address</label>
                  <input
                    className='form-control w-100 py-3 px-2'
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                  />
                </Col>
                <Col sm='12' md='6'>
                  <label>Phone Number</label>
                  <input
                    className='form-control w-100 py-3 px-2'
                    onChange={e => {
                      setPhone(e.target.value)
                    }}
                  />
                </Col>
                <Col sm='12'>
                  <label>Message</label>
                  <textarea
                    className='form-control w-100 py-3 px-2 mb-3'
                    rows='7'
                    onChange={e => {
                      setMessage(e.target.value)
                    }}
                  />
                </Col>
                <Col sm='12'>
                  <button
                    className=' w-100 py-3 px-2 btn'
                    disabled={loading}
                    onClick={e => {
                      e.preventDefault()
                      handleCreateContactUs()
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </section>

      {/*  */}
      <Footer />
      <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
    </div>
  )
}

export default Contact
