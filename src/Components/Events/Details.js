import React, { useRef, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { isImage } from '../../Utils/helper'
import { IoClose } from 'react-icons/io5'
import moment from 'moment'
import Switch from '../Switch'
import lineIcon from '../../Assets/img/lineIcon.svg'
import Marquee from 'react-fast-marquee'
import { SocialIcon } from 'react-social-icons'
import { BiArrowBack } from 'react-icons/bi'
import { makeRepeated } from '../../Utils/helper'
import TicketDate from '../TicketDate'
import ticketOrder from '../../Assets/img/ticketOrder.png'
import location from '../../Assets/img/location.svg'
import ShareOnSocial from 'react-share-on-social'
import share from '../../Assets/img/share.svg'
import VisibilitySensor from 'react-visibility-sensor'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import clock from '../../Assets/img/clockIcon.svg'
import calendar from '../../Assets/img/calendarIcon.svg'
import naira from '../../Assets/img/naira.svg'
import { atcb_action } from 'add-to-calendar-button'
import addIcon from '../../Assets/img/add.svg'
import minusIcon from '../../Assets/img/minus.svg'
import { convertTo12HourFormat } from '../../Utils/helper'
import { paymentController } from '../../Client/Event'
import Axios from '../../Utils/axios'
import Paystack from '../Paystack'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import MapPreview from '../Map'
import { useLocation } from 'react-router-dom';
const EventDetails = (
    {
    reset,
    init,
    coupon,
    checked,
    toggleChecked,
    toggleCoupon,
    selectedEvent,
    ticketOrderDetails,
    setSelectedEvent,
    newFeaturedEvents,
    setEmail,
    setFullname,
    setPhone,
    toggleSimilarEventDetails,
    toShowEventDetails,
    setShowEventImages,
    setTicketOrderDetails,
    calculateTicketTotalPrice,
    error,
    setError,
    activeTab,
    setActiveTab,
    name,
    userEmail,
    userPhone
}) => {

    const [activeSlide, setActiveSlide] = useState(0)
    const [purchaseType, setPurchaseType] = useState('mine')
    const [apiKey, setApiKey] = useState('');/* 
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); */
    const [checkbox, setCheckbox] = useState('');
    const [loading, setLoading] = useState(false);

    const [paystackConfig, setPaystackConfig] = useState(null);

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);


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

    const fetchKey = async () => {
        try {
            setLoading(true)
            const data = {
                name: 'Deniyi Femi',
                email: 'holarfemilekan049@gmail.com'
            }
            const response = await Axios.post(`/apiKey/generate`, data)
            setApiKey(response.data.data.key)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    };

    const caxios = Axios.create({
        // baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    });

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()


    const getRSVPTicket = async eventId => {
        
        var tickets = []
        const filteredTickets = selectedEvent?.ticketsId.filter(
            (el, i) => Number(ticketOrderDetails[i]) !== 0
        )
        const combinedArray = filteredTickets.reduce((result, ticket, i) => {
            console.log('------->>>>', filteredTickets, Number(ticketOrderDetails[i]))
            const orderDetail = Number(ticketOrderDetails[i])
            const multiples = Array(orderDetail).fill(ticket)
            return result.concat(multiples)
        }, [])

        console.log(combinedArray)

        if (purchaseType === 'shared') {
            for (var i = 0; i < combinedArray.length; i++) {
                // Get the current input values
                var fullName = document.getElementById(`fullName${i}`).value
                var email = document.getElementById(`email${i}`).value
                var phone = document.getElementById(`phone${i}`).value

                // Create a ticket object with the input values
                var ticket = {
                    ticketId: combinedArray[i]._id,
                    fullName: fullName,
                    email: email,
                    phone: phone
                }

                // Add the ticket object to the tickets array
                tickets.push(ticket)
            }
        } else {
            for (var i = 0; i < combinedArray.length; i++) {


                // Create a ticket object with the input values
                var ticket = {
                    ticketId: combinedArray[i]._id,
                    fullName: name,
                    email: userEmail,
                    phone: userPhone
                }

                // Add the ticket object to the tickets array
                tickets.push(ticket)


            }
        }
        console.log('------->>>tickets', tickets)

        const data = {
            eventId: eventId,
            useLoggedInDetails: false,
            purchaseType: purchaseType,
            tickets: tickets,
            amount: ticketOrderDetails
                ?.map(
                    (ele, i) =>
                        ele * selectedEvent?.ticketsId[i]?.price
                )
                .reduce((x, y) => Number(x) + Number(y))
        }
        data.contactDetails = {
            fullName: tickets[0]?.fullName,
            email: tickets[0]?.email,
            phone: tickets[0]?.phone
        }
        const res = await paymentController(data);
        // console.log(res)

        // const payment = await caxios.post('/payment/initialise', {
        //     amount: res?.data?.amount,
        //     currency: "NGN",
        //     email: res?.data?.contact?.email,
        //     reason: res?.data?.reason,
        //     channels: ["card", "bank", "ussd", "bank_transfer", "eft"],
        //     callback_url: `${window.location.href}verify`,
        // })
        // console.log('----->>>payment', payment)
        // if (payment?.status === 200) {
        //     window.open(`${payment?.data?.data?.callback}`, 'rel=noopener noreferrer');
        //     // window.location.href = payment?.data?.data?.callback;
        // } else {
        //     console.error(payment);
        // }
        if (res.data?.reference) {
            setPaystackConfig({
                reference: res.data?.reference,
                email: userEmail,
                amount: ticketOrderDetails
                    ?.map(
                        (ele, i) =>
                            ele * selectedEvent?.ticketsId[i]?.price
                    )
                    .reduce((x, y) => Number(x) + Number(y)) * 100
            })
        } else {


            NotificationManager.success(res?.message, 'Success');
        }
        


        // console.log('------,yeaaaaa', paystackConfig)
    }

    // const paystack_config = {
    //     // reference: (new Date()).getTime(),x
    //     email: userEmail,
    //     amount: (ticketOrderDetails
    //         ?.map(
    //             (ele, i) =>
    //                 ele * selectedEvent?.ticketsId[i]?.price
    //         )
    //         .reduce((x, y) => Number(x) + Number(y))) * 100,
    //     // publicKey: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYSTACK_PUBLIC_KEY : process.env.REACT_APP_PAYSTACK_PROD_PUBLIC_KEY,
    //     publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    // };





    const videoRef = useRef()

    const handleVideoFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen()
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen()
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen()
        }

    }

    const handleVideoPlay = () => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    function onChange(isVisible) {
        if (isVisible) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    const location = useLocation();
        
    useEffect(() => {
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', handleBackButton);
      
      return () => {
        window.removeEventListener('popstate', handleBackButton);
      }
    }, []);
    
    const handleBackButton = () => {
        toShowEventDetails()
      window.history.pushState(null, document.title, window.location.href);
    }
   /*  const params = useParams()
    console.log(window.location.href.split('/').pop())
    const navigate = useNavigate()
    const rr = window.location.href.split('/').pop()
    window.onpopstate = () => {
        toShowEventDetails()
        
      navigate(`/${rr}`)
      } */
    return (
        <>
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
                        ref={myRef}
                        className='event-details-img-container position-relative bg-black'
                        style={{
                            borderRadius: '20px',
                            height: '100%'
                        }}
                    >
                        {isImage(selectedEvent?.media[activeSlide]) ? (
                            <img
                                onClick={() => {
                                    setShowEventImages(true)
                                }}
                                role='button'
                                src={selectedEvent?.media[activeSlide]}
                                alt='event-details'
                                className='event-details-img'
                                style={{
                                    height: '100%',
                                    borderRadius: '20px'
                                }}
                            />
                        ) : (
                            <div
                                className='overflow-hidden'
                                style={{
                                    height: '100%',
                                    borderRadius: '20px'
                                }}
                            >
                                <VisibilitySensor onChange={onChange}>
                                    <video
                                        ref={videoRef}
                                        src={selectedEvent?.media[activeSlide]}
                                        className='selected-event__video-player'
                                        controls
                                        width='100%'
                                        height='100%'
                                        autoPlay
                                        loop
                                        playsInline
                                        onClick={() => {
                                            // setShowEventImages(true)
                                            handleVideoFullScreen()
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            width: '100%',
                                            objectFit: 'cover'
                                        }}
                                    >
                                        <source
                                            src={selectedEvent?.media[activeSlide]}
                                            type='video/mp4'
                                        />
                                        <source
                                            src={selectedEvent?.media[activeSlide]}
                                            type='video/ogg'
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </VisibilitySensor>
                            </div>
                        )}
                        {
                            selectedEvent?.media.length > 1 && <div
                                className='position-absolute slider-arrow left'
                                role='button'
                                onClick={() => {
                                    setActiveSlide(activeSlide > 0 ? activeSlide - 1 : 0)
                                }}
                            >
                                <MdKeyboardArrowLeft color='white' size='40' />
                            </div>
                        }
                        {

                            selectedEvent?.media.length > 1 && <div
                                className='position-absolute slider-arrow right'
                                onClick={() => {
                                    setActiveSlide(
                                        activeSlide < selectedEvent?.media.length - 1
                                            ? activeSlide + 1
                                            : selectedEvent?.media.length - 1
                                    )
                                }}
                            >
                                <MdKeyboardArrowRight
                                    color='white'
                                    size='40'
                                    role='button'
                                />
                            </div>
                        }

                        <div
                            className='d-flex justify-content-center align-items-center position-absolute slider-indicator-wrapper'
                            style={{
                                gap: '13.78px',
                                bottom: '28px',
                                width: '100%'
                            }}
                        >
                            {selectedEvent?.media.map((el, i) => (
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
                id='close-modal-btn'
                role='button'
                onClick={() => {
                  toShowEventDetails()
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
                            <div className='modal-details'>
                                <div
                                    className='d-flex align-items-cente justify-content-between modal-event-details-wrapper'
                                    style={{
                                        gap: '22px'
                                    }}
                                >
                                    <div className=' mt-2 mb-3'>
                                        <h3
                                            className='event-name my-0 mb-0 event-details__name'
                                            id='event-details__name'
                                        >
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
                                                    height='13px'
                                                    width='13px'
                                                />
                                            </div>
                                            <p className='event-location mb-0'>
                                                {selectedEvent?.location}
                                            </p>
                                        </div>
                                        <div className='d-flex'>
                                            <p className='event-details event-type-tag mb-0 py-1 text-center '>
                                                {`${selectedEvent?.type?.name} Event`}
                                            </p>
                                            <p className='event-details event-category-tag mb-0 py-1 text-center mx-1 text-capitalize'>
                                                {`${selectedEvent?.category}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className='event-ticketdate-right-container '
                                        style={{
                                            marginTop: '17px'
                                        }}
                                    >
                                        <TicketDate
                                            size='md'
                                            date={moment(selectedEvent?.date).format(
                                                'MMM Do YYYY'
                                            )}
                                        />
                                    </div>
                                </div>
                                <h3 className='mb-0 text-white event-description__header'>
                                    Description
                                </h3>
                                <p className='mb-0 event-description'>
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
                                    <h3 className='event-date mb-0'>{`${convertTo12HourFormat(selectedEvent?.time?.start)} - ${convertTo12HourFormat(selectedEvent?.time?.end)}`}</h3>
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
                                {selectedEvent?.ticketsId.map((el, i) => (
                                    <div
                                        className={`${i % 2 === 0 ? 'even' : 'odd'
                                            } event-ticket-group py-1 mb-3`}
                                    >
                                        <div className=' d-flex justify-content-between px-1 px-md-2 align-items-center'>
                                            <div>
                                                <p className='event-ticket-type mb-0'>
                                                    {el?.name}
                                                </p>
                                                {
                                                    el?.plan === 'free' ?
                                                        <h3 className='event-ticket-price'>
                                                            Free
                                                        </h3> : <div
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
                                                                    {el?.price?.toLocaleString()}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                }

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
                                                    className='ticket-order-value text-white '
                                                    role='input'
                                                    contenteditable='true'
                                                >
                                                    {ticketOrderDetails.length > 0
                                                        ? ticketOrderDetails[i]
                                                        : 0}
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
                                <a
                                    href={`https://www.google.com//maps/search/?api=1&query=${encodeURIComponent(
                                        selectedEvent?.location
                                    )}`}
                                    target='_blank'
                                    className='mb-3'
                                >
                                    <MapPreview location={selectedEvent?.location} />
                                </a>
                                {/* <iframe src={`https://www.google.com/maps/dir//${encodeURIComponent(selectedEvent?.location)}`} target="_blank" className='mb-3 rounded' height="250" style={{ width: '100%' }} /> */}
                                {/* <img src={map} alt='map' width='100%' />
                      </a> */}
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
                                {error && (
                                    <p className='text-danger mb-0'>
                                        Select a ticket to continue
                                    </p>
                                )}
                                <button
                                    className='btn w-100 mb-3 get-ticket-btn py-3'
                                    onClick={() => {
                                        const arr = []
                                        Array.from(
                                            document.getElementsByClassName(
                                                'ticket-order-value'
                                            )
                                        ).map(el => arr.push(el.innerHTML))
                                        console.log(arr)
                                        setTicketOrderDetails(arr)
                                        calculateTicketTotalPrice()
                                        // console.log(arr)

                                        document
                                            .querySelector('.event-right-ticket-details')
                                            .scroll({ top: 0, behavior: 'smooth' })
                                        document
                                            .querySelector('.left-event-details-container')
                                            .scroll({ top: 0, behavior: 'smooth' })
                                        executeScroll()
                                        // setActiveTab('')
                                    }}
                                >
                                    Get Ticket
                                </button>

                                <ShareOnSocial
                                    textToShare={selectedEvent?.description}
                                    link={`${window.location.origin}/${selectedEvent?._id}`}
                                    linkTitle={selectedEvent?.name}
                                    linkFavicon={selectedEvent?.media[0]}
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
                                    {selectedEvent?.socials && (
                                        <>
                                            {selectedEvent?.socials.map(el => (
                                                <SocialIcon
                                                    url={el?.link}
                                                    network={el?.app}
                                                    className='social-media-btn btn p-4'
                                                    fgColor='white'
                                                    bgColor='#00e194'
                                                />
                                            ))}
                                        </>
                                    )}

                                    {/* <div className=''>
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
                        </div> */}
                                </div>
                            </div>
                            <section className='feature-event-section  mb-4 mt-3'>
                                <div>
                                    <h3 className='section-title mb-2'>Similar Events</h3>
                                </div>
                                <div
                                    className='overflow-hidden d-flex position-relative'
                                    style={{
                                        width: '100%'
                                    }}
                                >
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
                                        {makeRepeated(newFeaturedEvents, 2).map(el => (
                                            <div className='event-card' style={{
                                                marginRight: '17px',
                                            }}>
                                                <div
                                                    className='event-img-wrapper position-relative w-100'
                                                    style={{
                                                        // objectFit: 'cover',
                                                        // borderRadius: '10px',
                                                        height: '250px',
                                                        // width: "100%",

                                                        borderRadius: ' 15.0839px'
                                                        // overflow: 'hidden'
                                                    }}
                                                >
                                                    {isImage(el?.media[0]) ? (
                                                        <img
                                                            style={{
                                                                // objectFit: 'cover',
                                                                // borderRadius: '10px',
                                                                height: '100%',
                                                                borderRadius: ' 15.0839px'
                                                            }}
                                                            loading='lazy'
                                                            src={el?.media[0]}
                                                            className='event-img'
                                                            alt='event-img'
                                                        />
                                                    ) : (
                                                        <video
                                                            className='event-img'
                                                            muted
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                            style={{
                                                                // objectFit: 'cover',
                                                                // borderRadius: '10px',
                                                                height: '100%',
                                                                borderRadius: ' 15.0839px'
                                                            }}
                                                            loading='lazy'
                                                        >
                                                            <source
                                                                src={el?.media[0]}
                                                                type='video/mp4'
                                                            />
                                                            Your browser does not support the video
                                                            element.
                                                        </video>
                                                    )}

                                                    <div
                                                        className='position-absolute event__category-tag text-capitalize'
                                                        style={{
                                                            left: '9px',
                                                            bottom: '7px'
                                                        }}
                                                    >
                                                        {el.category}
                                                    </div>
                                                    <div
                                                        className='position-absolute'
                                                        style={{
                                                            right: '-6px',
                                                            bottom: '-32px'
                                                        }}
                                                    >
                                                        <TicketDate
                                                            size={'sm'}
                                                            date={moment(el?.date).format(
                                                                'MMM Do YYYY'
                                                            )}
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
                                                                    width='11px' loading='lazy'
                                                                />
                                                            </div>
                                                            <p className='event-location mb-0'>
                                                                {el?.location}
                                                            </p>
                                                        </div>
                                                        <h3 className='event-name my-0 mb-3'>
                                                            {el?.name}
                                                        </h3>
                                                        <button
                                                            className='get-ticket-btn btn w-100 mb-2 py-3'
                                                            onClick={() => {
                                                                setSelectedEvent(el)
                                                                toggleSimilarEventDetails()
                                                            }}
                                                        >
                                                            Get Ticket
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Marquee>
                                </div>
                            </section>
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
                            {selectedEvent?.ticketsId
                                .map((ticket, index) => ({
                                    ...ticket,
                                    multiplier: ticketOrderDetails[index],
                                }))
                                .filter(item => item.multiplier !== '0')
                                .map((el, index) => (
                                    <div className='w-100 mb-3 event-order-input'>
                                        <img
                                            src={ticketOrder}
                                            alt='order-input'
                                            className='w-100'
                                        />
                                        <div className='ticket-type'>{`${el?.multiplier}X ${el?.name}`}</div>
                                        <div className='ticket-price-details position-absolute'>
                                            {
                                                Number(el?.multiplier) * el?.price === 0 ?
                                                    <h3 className='mb-0'>
                                                        Free
                                                    </h3> : <div
                                                        className='d-flex align-items-center'
                                                        style={{
                                                            gap: '7px'
                                                        }}
                                                    >
                                                        <h3 className='mb-0'>
                                                            <span
                                                                style={{
                                                                    color: '#00e194'
                                                                }}
                                                            >
                                                                ₦{' '}
                                                            </span>
                                                            {/* {
                                    console.log(ticketOrderDetails, selectedEvent?.ticketsId
                                      .filter((el, i) => ticketOrderDetails[i] !== '0'))
                                  } */}
                                                            {(
                                                                Number(el?.multiplier) * el?.price
                                                            ).toLocaleString()}
                                                        </h3>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                ))}
                            <div className='w-100 mb-3 event-order-input'>
                                <img
                                    src={ticketOrder}
                                    alt='order-input'
                                    className='w-100'
                                />
                                <div className='ticket-type'>Service Charge</div>
                                <div className='ticket-price-details position-absolute'>
                                    <div
                                        className='d-flex align-items-center'
                                        style={{
                                            gap: '7px'
                                        }}
                                    >
                                        <div>
                                            {/* <img
                              className='naira-icon'
                              src={naira}
                              alt='icon'
                              height='26px'
                              width='23px'
                            /> */}
                                        </div>
                                        <h3 className='mb-0'>
                                            <span
                                                style={{
                                                    color: '#00e194'
                                                }}
                                            >
                                                ₦
                                            </span>
                                            {` ${200}`}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='total-ticket-container w-100 d-flex  align-items-center justify-content-between mb-3'>
                                    {
                                        ticketOrderDetails.length > 0 && <>
                                            <h3 className='total-ticket-ordered mb-0'>
                                                {`Total(${ticketOrderDetails?.reduce(
                                                    (x, y) => Number(x) + Number(y)
                                                )})`}
                                            </h3>
                                            <h3 className='total-ticket-price mb-0'>
                                                {`₦
                            ${(
                                                        ticketOrderDetails
                                                            ?.map(
                                                                (ele, i) =>
                                                                    ele * selectedEvent?.ticketsId[i]?.price
                                                            )
                                                            .reduce((x, y) => Number(x) + Number(y)) + 200
                                                    ).toLocaleString()}`}
                                            </h3>
                                        </>
                                    }

                                </div>
                            </div>
                            {
                                ticketOrderDetails.length > 0 && <>

                                    {ticketOrderDetails.reduce(
                                        (x, y) => Number(x) + Number(y)
                                    ) > 1 ? (
                                        <div className='d-flex align-items-center justify-content-between mb-4'>
                                            <p className='ticket-settings mb-0'>
                                                Send tickets individually
                                            </p>
                                            <div>
                                                <Switch
                                                    onChange={(e) => {
                                                        toggleChecked()
                                                        console.log(e.target.checked)
                                                        setPurchaseType(e.target.checked ? 'shared' : "mine")
                                                    }}
                                                    checked={checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    className={`ticket-control-switch ${checked ? 'active' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    ) : null}</>
                            }


                            <form className='ticket-settings-form mb-2' onSubmit={e => {
                                                e.preventDefault()
                                                // makePayment();
                                                getRSVPTicket(selectedEvent._id)

                                                // onClick={() => {
                                                //     initializePayment(onSuccess, onClose)
                                                // }}
                                            }}>
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
                                            <input
                                                id='fullname'
                                                className='form-control px-3 py-3'
                                                required
                                                onChange={e => {
                                                    setFullname(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className='mb-2 '>
                                            <label>Email</label>
                                            <input
                                                id='email'
                                                className='form-control px-3 py-3'
                                                type='email'
                                                required
                                                onChange={e => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </div>{' '}
                                        <div className='mb-4 '>
                                            <label>Phone Number</label>
                                            <input
                                                id='phone'
                                                className='form-control px-3 py-3'
                                                required
                                                onChange={e => {
                                                    setPhone(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        {selectedEvent?.ticketsId
                                            .filter(
                                                (el, i) => Number(ticketOrderDetails[i]) !== 0
                                            )
                                            .reduce((result, ticket, i) => {
                                                const orderDetail = Number(ticketOrderDetails[i])
                                                const multiples = Array(orderDetail).fill(ticket)
                                                return result.concat(multiples)
                                            }, [])
                                            .map((el, index) => (
                                                <div className='mb-3'>
                                                    <div
                                                        className='d-flex align-items-center'
                                                        style={{
                                                            gap: '8px',
                                                            marginBottom: '22px'
                                                        }}
                                                    >
                                                        <h3 className='ticket-settings-title mb-0 '>
                                                            {el?.name}
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
                                                        <input
                                                            required
                                                            className='form-control px-3 py-3'
                                                            id={`fullName${index}`}
                                                        />
                                                    </div>
                                                    <div className='mb-2 '>
                                                        <label>Email</label>
                                                        <input
                                                            className='form-control px-3 py-3'
                                                            id={`email${index}`}
                                                        />
                                                    </div>{' '}
                                                    <div className='mb-4 '>
                                                        <label>Phone Number</label>
                                                        <input
                                                            className='form-control px-3 py-3'
                                                            id={`phone${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                                <div className='mb-'>
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
                                    className='d-flex align-items-cente  mb-0'
                                    style={{
                                        gap: '10px',
                                        marginTop: '30px'
                                    }}
                                >
                                    <input
                                        type='checkbox'
                                         required
                                        className='terms-conditions-checkbox mb-1'
                                        
                                    />
                                    <p className='terms-conditions-text mb-4 pt-0'>
                                        I accept the terms and conditions for using this
                                        service, and hereby confirm I have read the privacy
                                        policy..
                                    </p>
                                </div>
                                <div>
                                    {paystackConfig ?
                                        <Paystack
                                            email={paystackConfig?.email}
                                            amount={paystackConfig?.amount}
                                            key={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}
                                            reference={paystackConfig?.reference}
                                        /> : <button
                                            className='btn get-ticket-btn w-100 py-3'
                                            
                                        // disabled={paystackConfig.email===''}
                                        >
                                            Make Payment
                                        </button>
                                    }

                                </div>
                            </form>
                        </div>
                    )}
                </Col>
            </Row>
            <div
                className='close-modal-btn position-absolute'
                id='close-modal-btn'
                role='button'
                onClick={() => {
                    toShowEventDetails()
                    reset()
                }}
            >
                <IoClose size='35' color='white' />
            </div>

            {console.log(paystackConfig)}
            {/* {paystackConfig &&
                <Paystack
                    email={paystackConfig?.email}
                    amount={paystackConfig?.amount}
                    key={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}
                />
            } */}

            {/* <ToastContainer /> */}
            <NotificationContainer />
        </>
    )
}

export default EventDetails