import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../Assets/img/logoC.png'
import {
  MdAdd,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown
} from 'react-icons/md'
import { Row, Col, Modal, Button } from 'reactstrap'
import Search from '../../Assets/img/search.svg'
import menu from '../../Assets/img/menu.svg'
import { IoClose } from 'react-icons/io5'
import MobileMenu from './MobileMenu'
import { FaGooglePlay, FaTwitter } from 'react-icons/fa'
import { BsApple } from 'react-icons/bs'
import { AiOutlineInstagram } from 'react-icons/ai'
import tixrush from '../../Assets/img/tixrush.svg'
import getTix from '../../Assets/img/getTix.png'

import { RiFacebookBoxFill } from 'react-icons/ri'
import { categories } from './categories'
import instagram from '../../Assets/img/instagram.svg'
import youtube from '../../Assets/img/youtube.svg'
import facebook from '../../Assets/img/facebook.svg'
import twitter from '../../Assets/img/twitter.svg'


const Header = ({ position, activeLink, subPage }) => {
  const navigate = useNavigate()
  const [colorChange, setColorchange] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchEvent, setSearchEvent] = useState('')
  const [createEvent, setCreateEvent] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [heroEvent, setHeroEvent] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {

      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }
  window.addEventListener('scroll', changeNavbarColor)

  const toggleCreateEvent = () => {
    setCreateEvent(!createEvent)
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
    <div>
      <div
        className={`header position-${position} py-3 py-md-0 pb-md-0 d-flex justify-content-between align-items-center w-100 px-3 px-md-5 ${colorChange ? 'cstm-bg-black' : 'cstm-bg-gradient'
          } `}
      >
        {!showMobileSearch ? (
          <>
            <div className=''>
              <p className='header-logo mb-0'>
                <a href='/' className='header-logo '> <div
                    class='mb-3 tixrush-logo-container'
                  // style={{
                  //   width: '150px'
                  // }}
                  >
                    <img
                      width='100%'
                      height='100%'
                      src={logo}
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </div></a>
                
              </p>
            </div>
            <ul className='header-nav-links d-none d-lg-flex align-items-center mb-0'>
              <li
                className={`nav-item mb-2 ${activeLink === '' ? 'active' : ''
                  }`}
              >
                <a href='/'>Home</a>
              </li>

              <li className={`nav-item mb-2 ${activeLink === 'categories' ? 'active' : ''
                }`}>
                <div
                  className='d-flex position-relative dropdown-menu-wrapper py-5'
                  role='button'
                  style={{
                    gap: '7px',
                    zIndex: '999'
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
                      activeLink === 'categories' ? <MdKeyboardArrowDown color='#00e194' size='25' /> :
                        <MdKeyboardArrowRight color='#fff' size='25' />
                    ) : (

                      <MdKeyboardArrowDown color='#00e194' size='25' />
                    )}
                  </span>
                  <div
                    className={`position-absolute dropdown-content p-3 ${subPage ? 'sub-page' : ''
                      }  ${colorChange ? 'cstm-bg-black' : 'cstm-bg-gradient'}`}
                  >
                    <Row className='test-bg-blur'>
                      <Col sm='4'>

                        {
                          categories.slice(0, 6).map(el =>
                            <p
                              className='nav-item mb-2'
                              style={{
                                color: '#00e194 !important'
                              }}
                              onClick={() => {
                                navigate(`/intent/search?event_category=${el?.name.toLowerCase()}`)
                              }}
                            >
                              <span style={{
                                marginRight: "10px"
                              }}><img src={el.icon} style={{
                                width: "17px",
                                height: '17px'
                              }} /></span>{el.name}
                            </p>
                          )
                        }

                      </Col>
                      <Col sm='4'>

                        {
                          categories.slice(6, 12).map(el =>
                            <p
                              className='nav-item mb-2'
                              style={{
                                color: '#00e194 !important'
                              }}
                              onClick={() => {
                                navigate(`/intent/search?event_category=${el?.name.toLowerCase()}`)
                              }}
                            >
                              <span style={{
                                marginRight: "10px"
                              }}><img src={el.icon} style={{
                                width: "17px",
                                height: '17px'
                              }} /></span>{el.name}
                            </p>
                          )
                        }

                      </Col>
                      <Col sm='4'>
                        {
                          categories.slice(12, 18).map(el =>
                            <p
                              className='nav-item mb-2'
                              style={{
                                color: '#00e194 !important'
                              }}
                              onClick={() => {
                                navigate(`/intent/search?event_category=${el?.name.toLowerCase()}`)
                              }}
                            >
                              <span style={{
                                marginRight: "10px"
                              }}><img src={el.icon} style={{
                                width: "17px",
                                height: '17px'
                              }} /></span>{el.name}
                            </p>
                          )
                        }

                      </Col>                    </Row>
                  </div>
                </div>
              </li>
              <li
                className={`nav-item mb-2 ${activeLink === 'about' ? 'active' : ''
                  }`}
              >
                 <a href='/about'>About</a>
              </li>

              <li
                className={`nav-item mb-2 ${activeLink === 'contact' ? 'active' : ''
                  }`}
              >
              <a href='/contact'>Contact</a>
              </li>
            </ul>

            <div className='header-cta-section d-flex align-items-center justify-content-between mb-md-2 mb-1'>
              {!subPage &&
                <div className='d-none d-md-flex px-3 justify-content-center align-items-center navbar-search-wrapper py-2'>
                  <input
                    placeholder='Search'
                    className='form-control'
                    onChange={e => {
                      setSearchEvent(e.target.value)
                    }}
                    onKeyDown={(e) => {


                      // enter has keyCode = 13, change it if you want to use another button
                      if (e.keyCode == 13) {
                        if (searchEvent.length > 0) {
                          navigate(`/intent/search?event_name=${searchEvent}`)
                        }
                      }

                    }}
                  />
                  <div
                    role='button'
                    onClick={() => {
                      if (searchEvent.length > 0) {
                        navigate(`/intent/search?event_name=${searchEvent}`)
                      }
                    }}
                  >
                    <img alt='icon' src={Search} width='22px' height='22px' />
                  </div>
                </div>
              }
              {
                !subPage && <div
                  className='d-block d-md-none'
                  onClick={() => {
                    setShowMobileSearch(true)
                  }}
                >
                  <div>
                    <img alt='icon' src={Search} width='22px' height='22px' />
                  </div>
                </div>
              }
              {/* <div
                className='d-block d-md-none'
                onClick={() => {
                  setShowMobileSearch(true)
                }}
              >
                <div>
                  <img alt='icon' src={Search} width='22px' height='22px' />
                </div>
              </div> */}
              <div className='d-none d-lg-block'>
                <button
                  className='btn create-event-btn '
                  onClick={() => {
                    toggleCreateEvent()
                  }}
                >
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
                <div
                  role='button'
                  onClick={() => {
                    if (searchEvent.length > 0) {
                      navigate(`/intent/search?event_name=${searchEvent}`)
                    }
                  }}
                >
                  <img alt='icon' src={Search} width='22px' height='22px' />
                </div>
                <input
                  placeholder='Search'
                  className='form-control px-2 w-100'
                  onChange={e => {
                    setSearchEvent(e.target.value)
                  }}
                  onKeyDown={(e) => {

                    // enter has keyCode = 13, change it if you want to use another button
                    if (e.keyCode == 13) {

                      if (searchEvent.length > 0) {
                        navigate(`/intent/search?event_name=${searchEvent}`)
                      }
                    }

                  }}

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
      </div>

      <MobileMenu
        toggle={setShowMobileMenu}
        show={showMobileMenu}
        toggleCreateEvent={toggleCreateEvent}
      />

      <Modal
        isOpen={createEvent}
        toggle={toggleCreateEvent}
        size='md'
        className='create-event-modal modal-dialog-centered'
      >
        <div className='px-2 px-md-4 pb-4 pt-4'>
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
            <img src={getTix} />
          </div>
          <div className='text-center mb-4'>
            <h3 className='download-app-text text-center'>Download App!</h3>
            <p className='mb-0 download-app-subtext'>
              To create events and enjoy the full experience of tixrush,
            </p>
            <p className='mb-0 download-app-subtext'>
              Download our app from the Google Play Store or the Apple Store!
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
            <div className='d-flex align-items-center justify-content-center  download-icons-wrpper mx-auto' style={{
              // width: '% !important'
              gap:'20px'
            }}>

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
        </div>
      </Modal>
    </div>
  )
}

export default Header
