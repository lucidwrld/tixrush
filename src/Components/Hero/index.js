import React, { useState, useEffect } from 'react'
import TicketDate from '../TicketDate'
import moment from 'moment'
import location from '../../Assets/img/location.svg'
import ticket from '../../Assets/img/getTicket.png'
import { isImage } from '../../Utils/helper'
import Axios from '../../Utils/axios'

const Hero = ({
    // isVideoBg,
    // videoBg,
    heroEvent,
    setSelectedEvent,
    toggleShowEventDetails
}) => {
    const [videoBg, setVideoBg] = useState(null)
    const [isVideoBg, setIsVideobg] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const fetchKey = async () => {
            try {
                // setLoading(true)
                const data = {
                    name: 'Deniyi Femi',
                    email: 'holarfemilekan049@gmail.com'
                }
                const response = await Axios.post(`/apiKey/generate`, data)
                setApiKey(response.data.data.key)
                // setLoading(false)
            } catch (err) {
                // setLoading(false)
                console.error(err);
            }
        };
        fetchKey();
    }, []);

    useEffect(() => {
        if (heroEvent) {

            console.log('----------->hero-event', heroEvent)
            // if (heroEvent?.thumbnail?.length > 0) {
            //     setIsVideobg(true)
            //     setVideoBg(heroEvent.thumbnail)

            // } else
            if (!isImage(heroEvent?.media[0] ?? heroEvent?.media)) {
                setIsVideobg(true)
                setVideoBg(heroEvent?.media[0] ?? heroEvent?.media)

            }
        }

    }, [heroEvent])
    const [matches, setMatches] = useState(
        window.matchMedia('(max-width: 768px)').matches
    )

    const caxios = Axios.create({
        // baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    });

    useEffect(() => {
        window
            .matchMedia('(max-width: 768px)')
            .addEventListener('change', e => setMatches(e.matches))
    }, [])

    // announcement useEffect
    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                const response = await caxios.get('/announcement/all');
                console.info(response);
                setAnnouncements(response?.data?.data.filter(announcement => { return announcement.display === true }));
            } catch (error) {
                console.error(error);
            }
        }
        if (apiKey) {
            getAnnouncements()
        }
    }, [apiKey]);


    return (
        <div>
            {
                heroEvent?.display ? (
                    <>
                        <div
                            className='hero-section px-3 px-md-5 position-relative'
                            style={
                                !matches
                                    ? {
                                        backgroundImage: ` linear-gradient(
                  to right,
                  rgba(0, 0, 0, 0) 32.09%,
                  rgba(0, 0, 0, 0.75) 69.97%
                ), linear-gradient(180deg, rgba(0, 0, 0, 0) 69.09%, rgba(0, 0, 0, 1) 89.97%),
                url(${heroEvent?.media})`
                                    }
                                    : {
                                        backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, -0.25) 100%
              ),  linear-gradient(180deg, rgba(0, 0, 0, 0) 69.09%, rgba(0, 0, 0, 1) 89.97%),
              url(${heroEvent?.media})`
                                    }
                            }
                        >
                            <div className='hero-ticket-details' >
                                <div
                                    className='d-none d-md-flex align-items-center justify-content-end '
                                    style={{
                                        gap: '22px'
                                    }}
                                >
                                    {/* <div className='text-right mt-2'> */}
                                        <div className='text-center announcement_container' >
                                            <h3 className='hero-event-name my-0 mb-1 text-center w-100' style={{
                                                maxWidth:'unset'
                                            }}>
                                                {heroEvent?.title}
                                            </h3>
                                            <p className='text-[#00E194] '>{heroEvent?.description}</p>
                                        </div>
                                    {/* </div> */}
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
                                            gap: '0',
                                            marginLeft: '15px'
                                        }}
                                    >
                                        <div className='text-center mt-2'>
                                            <p className='hero-event-location mb-1 d-none d-lg-block'>
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
                                                {heroEvent?.media}
                                            </p>

                                            <div className='announcement_container'>
                                                <h3 className='hero-event-name my-0 mb-1'>
                                                    {heroEvent?.title}
                                                </h3>
                                                <p className='text-white'>{heroEvent?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='linear-gradient-bg d-block position-absolute'></div>
                        </div>
                    </>
                ) : isVideoBg ? (
                    <div className='hero-section  position-relative video-bg-wrapper'>
                        <div className='video-bg-container '>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                id='myVideo'
                                className='back-video'
                                src={videoBg}
                                loading='lazy'
                            >
                                <source src={videoBg} type='video/mp4' />
                                Your browser does not support HTML5 video.
                            </video>
                        </div>

                        <div className='hero-ticket-details px-3 px-md-5'>
                            <div
                                className='d-none d-md-flex align-items-center justify-content-end '
                                style={{
                                    gap: '10px'
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
                                        gap: '0',
                                        marginLeft: '45px'
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

                                        <h3 className='hero-event-name my-0 mb-1 '>
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
                        <div className='linear-gradient-bg  d-block position-absolute'></div>
                    </div>
                ) : (
                    <div
                        className='hero-section px-3 px-md-5 position-relative'
                        style={
                            !matches
                                ? {
                                    backgroundImage: ` linear-gradient(
                  to right,
                  rgba(0, 0, 0, 0) 32.09%,
                  rgba(0, 0, 0, 0.75) 69.97%
                ),  linear-gradient(180deg, rgba(0, 0, 0, 0) 69.09%, rgba(0, 0, 0, 1) 89.97%),
                url(${heroEvent?.media[0] ?? heroEvent?.media})`
                                }
                                : {
                                    backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, -0.25) 100%
              ),  linear-gradient(180deg, rgba(0, 0, 0, 0) 69.09%, rgba(0, 0, 0, 1) 89.97%),
              url(${heroEvent?.media[0] ?? heroEvent?.media})`
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
                                        gap: '0',
                                        marginLeft: '15px'
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
                )}

        </div>
    )
}

export default Hero