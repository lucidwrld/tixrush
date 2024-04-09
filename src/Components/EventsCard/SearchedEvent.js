import React from 'react'
import { isImage } from '../../Utils/helper'
import TicketDate from '../../Components/TicketDate'
import moment from 'moment'
import location from '../../Assets/img/location.svg'
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom'
import { fecthLowerPrice } from '../../Utils/helper'
import naira from '../../Assets/img/naira.svg'

const SearchedEvent = ({ event }) => {
    const navigate = useNavigate()
    return (


        <div
            className='h-100'
            style={{
                background: '#282828',
                borderRadius: '12.0074px'
            }}
        >
            <div className='event-img-wrapper position-relative' style={{
                objectFit: 'cover',
                borderRadius: '10px',
                width: "100%",
                height: '200.93px',

            }}>
                {
                    isImage(event?.media[0]) ?
                        <LazyLoad height={200.93} offset={300}>

                            <img
                                src={event?.media[0]}
                                className='event-img'
                                alt='event-img'
                                style={{
                                    // objectFit: 'cover',
                                    // borderRadius: '10px',
                                    height: '100%',

                                }}
                            />
                        </LazyLoad> :
                        <LazyLoad height={200.93} offset={300}>

                            <video
                                preload='auto'
                                muted loop autoPlay playsInline
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    borderRadius: '10px',
                                    height: '100%',

                                }}
                                src={event?.media[0]}

                            >
                                <source src={event?.media[0]} type="video/mp4" />
                                Your browser does not support the video element.
                            </video>
                        </LazyLoad>


                }
                <div
                    className='position-absolute event__category-tag text-capitalize'
                    style={{
                        left: '9px',
                        bottom: '7px'
                    }}
                >
                    {event.category}
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
                        date={moment(event?.date).format('MMM Do YYYY')}
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
                            {event?.location}
                        </p>
                    </div>

                    <h3 className='event-name my-0 mb-2'>{event?.name}</h3>
                    <div className='mb-1 d-flex justify-content-between'>
                        <p className='mb-0 event-price-wrapper'>
                            From:
                            <span className='ticket-price mt-3'>
                                {' '}
                                <img src={naira} alt='icon' />{' '}
                                {fecthLowerPrice(event?.tickets ? event?.tickets : event?.ticketsId)}
                            </span>
                        </p>
                        <div className=''>
                            <button
                                className='get-ticket-btn btn  mb-2  '
                                style={{
                                    padding: '11px 20px'
                                }}
                                onClick={() => {
                                    navigate(`/${event._id}`)
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchedEvent