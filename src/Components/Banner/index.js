import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { FaGooglePlay } from 'react-icons/fa'
import { BsApple } from 'react-icons/bs'

const Banner = () => {
  const texts = ['Discover', 'Create', 'Book']

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='banner-section px-md-0 px-0 ps-md-5'>
      <Row className='justify-content-center align-items-center'>
        <Col sm='12' md='6'>
          <div>
            <div className='banner-text-wrapper'>
              <div className='d-flex align-items animated-text'>
                <h3 className='banner-text mb-0'>
                  {
                    <span className='tix-carousel'>
                      {texts.map((el, i) => (
                        <span
                          key={i}
                          className={`text-box banner-highlight__text pe-2 ${currentIndex === i ? 'active' : 'fade-out'
                            }  `}
                        // style={{
                        //   opacity: currentIndex === i ? '1' : '0',
                        // }}
                        >
                          {el}
                        </span>
                      ))}
                    </span>
                  }
                </h3>
                <h3 className='banner-text mb-0'>

                  an Unforgettable
                </h3>
              </div>

              <h3 className='banner-text'>Experiences</h3>
            </div>
            <p className='banner__subtext'>
              Download our Tixrush App Now and Get Ready to Embrace Endless
              Fun, Unforgettable Moments, and Exclusive Offers!
            </p>
            <div className=' d-none d-md-flex justify-content-between banner__social__download'>
              <div
                className='download-app-wrapper-link banner-app-download p-3 mb-2 w-100'
                style={{
                  marginRight: '10px'
                }}
              >
                <div className='d-flex align-items-center banner__social-content'>
                  <div>
                    <FaGooglePlay size='45' color='#00e194' />
                  </div>
                  <div
                    style={{
                      marginLeft: '16px'
                    }}
                  >
                    <p className='mb-0 android-download-text'>ANDROID APP ON</p>
                    <h3 className='mb-0 google-download-text footer-text'>
                      Google Play
                    </h3>
                  </div>
                </div>
              </div>
              <div className='download-app-wrapper-link banner-app-download p-3 mb-2 w-100'>
                <div className='d-flex align-items-center banner__social-content'>
                  <div>
                    <BsApple size='40' color='#00e194' />
                  </div>
                  <div
                    style={{
                      marginLeft: '16px'
                    }}
                  >
                    <p className='mb-0 ios-download-text '>Download on the</p>
                    <h3 className='mb-0 ios-app-download-text  footer-text'>
                      App Store
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm='12' md='6'>
          <div
            className='banner-img__container d-flex align-items-center justify-content-end '
          // style={{
          //   height: '533px'
          // }}
          >
            {/* <img
              src={banner}
              style={{
                width:"100%",
                height: '100%',
                objectFit: 'cover'
              }}
            /> */}
          </div>
          <div className='px-3 px-md-0 d-flex d-md-none justify-content-between banner__social__download mb-3'>
            <div
              className='download-app-wrapper-link banner-app-download px-2 py-1 mb-2 w-100'
              style={{
                marginRight: '10px'
              }}
            >
              <div className='d-flex align-items-center banner__social-content'>
                <div>
                  <FaGooglePlay size='30' color='#00e194' />
                </div>
                <div
                  style={{
                    marginLeft: '5px'
                  }}
                >
                  <p className='mb-0 android-download-text'>ANDROID APP ON</p>
                  <h3 className='mb-0 google-download-text footer-text'>
                    Google Play
                  </h3>
                </div>
              </div>
            </div>
            <div className='download-app-wrapper-link banner-app-download px-2 py-1 mb-2 w-100'>
              <div className='d-flex align-items-center banner__social-content'>
                <div>
                  <BsApple size='30' color='#00e194' />
                </div>
                <div
                  style={{
                    marginLeft: '5px'
                  }}
                >
                  <p className='mb-0 ios-download-text '>Download on the</p>
                  <h3 className='mb-0 ios-app-download-text  footer-text'>
                    App Store
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Banner
