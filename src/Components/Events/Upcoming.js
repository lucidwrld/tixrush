import React from 'react'
import { Row, Col } from 'reactstrap'
import { Event as EventCard } from '../EventsCard'
import { NavLink, useNavigate } from 'react-router-dom'
import arrow from "../../Assets/img/greenarrow.svg"
const Upcoming = ({
    number,
    compareDate,
    newAllEvents,
    link,
    setSelectedEvent,
    toggleShowEventDetails
}) => {
    console.log(newAllEvents)
    const sortedEvents = newAllEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.sort(compareDate);
    // Get the four closest events to the current date
    const upcomingEvents = sortedEvents.slice(0, number);
    
    return (
        <div className=''>
            <Row className='g-4'>
                {upcomingEvents.map(el => (
                    <Col sm='12' md='6' lg='3'>
                        <EventCard
                            event={el}
                            setSelectedEvent={setSelectedEvent}
                            toggleShowEventDetails={toggleShowEventDetails}
                        />
                    </Col>
                ))}
            </Row>
            <Row style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
                <a href={link} style={{textAlign: "right", color:"#00E194"}}>See more <img src={arrow} style={{width: "52px", height: "50px", marginLeft: "10px"}}/></a>
            </Row>
           
        </div>
    )
}

export default Upcoming