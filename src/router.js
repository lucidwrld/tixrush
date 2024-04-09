import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Terms from './Pages/Terms'
import Policy from './Pages/Policy'
import Search from './Pages/Search'
import Intent from './Pages/Intent'
import EventDetails from './Pages/Event'
import Payment from './Pages/Payment'
import ScanTicket from './Pages/Scan_Ticket'
import Upcomingevents from './Pages/Upcoming'
import Trendingevents from './Pages/Trending'


const RouterConfig = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route exact path='/' element={<Home />} />
        <Route exact path='/:eventId' element={<Home />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/terms' element={<Terms />} />
        <Route exact path='/policy' element={<Policy />} />
        <Route exact path='/upcoming' element={<Upcomingevents />} />
        <Route exact path='/trending' element={<Trendingevents />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/verify' element={<Payment />} />
        <Route exact path='/intent/search' element={<Intent />} />
        <Route exact path='/event/:eventId' element={<EventDetails />} />
        <Route exact path='/scan-ticket/:ticketId' element={<ScanTicket />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default RouterConfig
