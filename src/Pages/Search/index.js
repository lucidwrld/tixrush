import React from 'react'
import SearchIcon from '../../Assets/img/search.svg'
import SearchResult from '../../Assets/img/searchResult.png'

import { HiArrowLeft } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const Search = () => {
  return (
    <div className='p-3'>
      <div
        className='d-flex mb-4'
        style={{
          gap: '10.21px'
        }}
      >
        <NavLink to='/' className='go-back-arrow-container p-3'>
          <HiArrowLeft color='#fff' size='25' />
        </NavLink>
        <div
          className='d-flex px-3 justify-content-center align-items-center navbar-search-wrapper py-2 w-100'
          style={{
            gap: '10.21px'
          }}
        >
          <div role='button'>
            <img alt='icon' src={SearchIcon} width='22px' height='22px' />
          </div>
          <input placeholder='Search' className='form-control' />
        </div>
      </div>

      <div>
        <div>
          <h3 className='section-title mb-3 text-white'>Top Search Results</h3>
        </div>
        <div className='d-flex align-items-center justify-content-between search-result-container mb-3'>
          <div
            className='d-flex  align-items-center'
            style={{
              gap: '15px'
            }}
          >
            <div>
              <img src={SearchResult} alt='search-img' />
            </div>
            <h3 className='search-event-name'>Music Events</h3>
          </div>

          <div>
            <IoIosArrowForward size='25' color='#fff' />
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between search-result-container mb-3'>
          <div
            className='d-flex  align-items-center'
            style={{
              gap: '15px'
            }}
          >
            <div>
              <img src={SearchResult} alt='search-img' />
            </div>
            <h3 className='search-event-name'>Music Events</h3>
          </div>

          <div>
            <IoIosArrowForward size='25' color='#fff' />
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between search-result-container mb-3'>
          <div
            className='d-flex  align-items-center'
            style={{
              gap: '15px'
            }}
          >
            <div>
              <img src={SearchResult} alt='search-img' />
            </div>
            <h3 className='search-event-name'>Music Events</h3>
          </div>

          <div>
            <IoIosArrowForward size='25' color='#fff' />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Search
