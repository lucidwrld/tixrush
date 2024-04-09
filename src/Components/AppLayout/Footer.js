import React, { useState } from 'react'
import twitter from '../../Assets/img/twitter.svg'
import instagram from '../../Assets/img/instagram.svg'
import facebook from '../../Assets/img/facebook.svg'
import { Row, Col, Modal } from 'reactstrap'
import { FaGooglePlay } from 'react-icons/fa'
import { BsApple } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import getTix from '../../Assets/img/getTix.png'
import { useNavigate } from 'react-router-dom'
import youtube from '../../Assets/img/youtube.svg'



const Footer = () => {
  const [createEvent, setCreateEvent] = useState(false)
  const navigate = useNavigate()

  const toggleCreateEvent = () => {
    setCreateEvent(!createEvent)
  }

  return (
    <div>
      <footer className='footer px-3 px-md-5 py-3 py-md-5 '>
        <Row
          className='gx-md-5'
          style={{
            gap: '35px'
          }}
        >
          <Col sm='12' lg='4'>
            <div>
              <h3 className='footer-section-title mb-0'>News letter</h3>
            </div>
            <p className='mb-0 subscription-text'>
              Subscribe to our mailing list and get information for upcoming
              events and other opportunities.
            </p>
            <div className='d-flex subscription-input-control align-items-center'>
              <input
                className='subscription-input-field form-control text-white '
                placeholder='Insert your email'
              />
              <button className='subscription-btn btn py-2 px-4 mb-0'>
                Subscribe
              </button>
            </div>
          </Col>
          <Col sm='12' lg='3'>
            <div>
              <h3 className='footer-section-title mb-0'>Useful links</h3>
            </div>
            <ul>
              <li className='mb-4'>
                <a target="_blank" href='https://tixrush.medium.com' style={{
                  textDecoration: 'none',
                  color: "#fff"
                }}>
                  Blog
                </a>
              </li>
              <li className='mb-4'
                role='button'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // This creates a smooth scrolling effect
                  });
                  navigate('/')
                }}
              >Events</li>
              <li className='mb-4' onClick={toggleCreateEvent}
                role='button'
              >Join Us</li>
              <li className='mb-4'
                role='button'
                onClick={() => {
                  navigate('/about')
                }}
              >About Us
              </li>
              <li className='mb-4'
                role='button'
                onClick={() => {
                  navigate('/contact')
                }}
              >Contact</li>
            </ul>
          </Col>
          <Col sm='12' lg='4' className=' px-md-0 px-3'>
            <div>
              <h3 className='footer-section-title mb-0'>Follow Us</h3>
            </div>
            <div
              className='d-flex'
              style={{
                gap: '17px'
              }}
            >
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
            <div className=' w-100'>
              <div className='mt-5'>
                <h3 className='footer-section-title mb-0'>Mobile app</h3>
              </div>
              <div className='d-block d-md-flex justify-content-between' >
                <div className='download-app-wrapper-link footer-app-download p-3 mb-2 w-100' style={{
                  marginRight: '10px'
                }}>
                  <div className='d-flex align-items-center'>
                    <div>
                      <FaGooglePlay size='45' color='#fff' />
                    </div>
                    <div
                      style={{
                        marginLeft: '16px'
                      }}
                    >
                      <p className='mb-0 android-download-text text-white'>ANDROID APP ON</p>
                      <h3 className='mb-0 google-download-text text-white footer-text'>Google Play</h3>
                    </div>
                  </div>
                </div>
                <div className='download-app-wrapper-link footer-app-download p-3 mb-2 w-100'>
                  <div className='d-flex align-items-center'>
                    <div>
                      <BsApple size='40' color='#fff' />
                    </div>
                    <div
                      style={{
                        marginLeft: '16px'
                      }}
                    >
                      <p className='mb-0 ios-download-text text-white'>Download on the</p>
                      <h3 className='mb-0 ios-app-download-text text-white footer-text'>App Store</h3>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Col>
          {/* <Col sm='12' lg='4'>
          <div className='text-white'>x</div>
        </Col> */}


        </Row>

        <div className='d-block d-md-flex align-items-center justify-content-center text-white mt-5 pt-5'>
          <div
            className='d-block d-md-flex'
            style={{
              gap: '10px'
            }}
          >
            <p className='mb-0 footer-last-text horizontal-content'>
              2023 © All Rights Reserved, Tixrush
            </p>
            <p className='mb-0 footer-last-text horizontal-content'>
              <a href='/terms'>Terms & Conditions</a>
            </p>
            <p className='mb-0 footer-last-text '>
              <a href='/policy'>Refund & Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>


      <Modal
        isOpen={createEvent}
        toggle={toggleCreateEvent}
        size='md'
        className='create-event-modal'
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
            <img src={getTix} />
          </div>
          <div className='text-center mb-5'>
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
            <div className='d-flex align-items-center justify-content-between mx-auto download-icons-wrapper'>

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

export default Footer
