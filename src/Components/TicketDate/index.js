import React from 'react'
import ticketdate from '../../Assets/img/ticketdate.svg'
import ticketdateSM from '../../Assets/img/ticketDate-sm.svg'

const TicketDate = ({ date, size }) => {
  return (
    <div className={`event-date-wrapper position-relative ${size}`}>
      <img src={ticketdate} alt='img' width='105px' height='130px' />
      <div className='w-100 text-center'>
        <p className='ticket-month m-0 position-absolute '>
          {date ? date?.split(' ')[0] : 'NOV'}
        </p>
        <h3 className='ticket-date m-0 position-absolute'>
          {date
            ? date?.split(' ')[1].length > 3
              ? date?.split(' ')[1]?.slice(0, 2)
              : `0${date?.split(' ')[1]?.slice(0, 1)}`
            : '23'}
        </h3>
      </div>
      <p className='ticket-year position-absolute m-0'>
        {date ? date?.split(' ')[2] : '2022'}
      </p>
    </div>
  )
}

export default TicketDate
