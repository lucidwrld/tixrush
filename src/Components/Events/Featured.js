import React from 'react'
import { makeRepeated } from '../../Utils/helper'
import Marquee from 'react-fast-marquee'
import { FeaturedEvent as EventCard } from '../../Components/EventsCard'


const Featured = ({
    allFeaturedEvents,
    setSelectedEvent,
    toggleShowEventDetails

}) => {
    return (
        <div
            className='overflow-hidden d-flex position-relative'
            style={{
                width: '100%'
            }}
        >
            <Marquee
                className='d-flex cstm-marquee'
                gradient={false}
                pauseOnHover={false}
                speed={30}
                loop={0}
                style={{
                    gap: 22
                }}
            >
                {makeRepeated(allFeaturedEvents, 30)
                    .slice(0, 5)
                    .map(el => (
                        <EventCard
                            event={el}
                            setSelectedEvent={setSelectedEvent}
                            toggleShowEventDetails={toggleShowEventDetails}
                        />
                    ))}
            </Marquee>
        </div>
    )
}

export default Featured