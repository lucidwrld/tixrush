import React from 'react'
import { isImage } from '../../Utils/helper'
import TicketDate from '../../Components/TicketDate'
import moment from 'moment'
import location from '../../Assets/img/location.svg'
import LazyLoad from 'react-lazy-load';


const FeaturedEvent = ({ event, setSelectedEvent, toggleShowEventDetails }) => {
       

    return (
        <div className='event-card' style={{ marginLeft: 10, }}>
            <div className='event-img-wrapper position-relative w-100'

                style={{
                    // objectFit: 'cover',
                    // borderRadius: '10px',
                    height: '250px',
                    borderRadius: ' 15.0839px'
                }}>
                {
                    isImage(event?.media[0]) ?
                        <LazyLoad height={250} offset={300}>
                            <img
                                style={{
                                    // objectFit: 'cover',
                                    // borderRadius: '10px',
                                    height: '100%',
                                    borderRadius: ' 15.0839px'

                                }}
                                loading='lazy'
                                src={event?.media[0]}
                                className='event-img'
                                alt='event-img'
                            />

                        </LazyLoad>
                        :
                        <LazyLoad height={250} offset={300}>

                            <video
                                className='event-img'
                                loading='lazy'
                                muted loop autoPlay/* ={true} */  playsInline style={{
                                    // objectFit: 'cover',
                                    // borderRadius: '10px',
                                    height: '100%',
                                    borderRadius: ' 15.0839px'

                                }}>
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
                        <p className='event-location mb-0'>{event?.location}</p>
                    </div>
                    <h3 className='event-name my-0 mb-3'>{event?.name}</h3>
                    <button
                        className='get-ticket-btn btn w-100 mb-2 py-3'
                        onClick={() => {
                            setSelectedEvent(event)
                            toggleShowEventDetails()
                        }}
                    >
                        Get Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeaturedEvent