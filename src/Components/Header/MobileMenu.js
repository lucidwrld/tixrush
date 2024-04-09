import React, { useState } from 'react'
import { MdClose, MdArrowRight } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import ArrowDown from '../../Assets/img/arrowdown.svg'
import {  useNavigate } from 'react-router-dom'
import { categories } from './categories'

const MobileMenu = ({ toggle, show, toggleCreateEvent }) => {
  const navigate = useNavigate()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu)
  }
  return (
    <div className={`mobile-menu-bar ${show ? 'show' : ''}`}>
      <ul className='header-nav-links  pt-5 position-relative '>
        <li className='nav-item text-center'>
          <button className='btn create-event-btn ' onClick={toggleCreateEvent}>
            Create Event
          </button>
        </li>
        <li className='nav-item text-center'>
          <a href='/'  onClick={() => {
            toggle(false)
          }}>Home</a>
        </li>
        <li className='nav-item text-center' onClick={toggleSubMenu}>
          Categories{' '}
          <span
            style={{
              marginLeft: '7px'
            }}
          >
            {showSubMenu ? (
              <img src={ArrowDown} />
            ) : (
              <MdArrowRight color='white' size='25' />
            )}
          </span>
        </li>


        {
          showSubMenu &&
          <div className='d-flex align-items-center justify-content-center ' style={{
            paddingLeft:'5em'
          }}>
            <div>
              {
                categories.map(el =>
                  <li
                    className='nav-item'
                    style={{
                      color: '#00e194'
                    }}
                    onClick={() => {
                      navigate(`/intent/search?event_category=${el.name.toLowerCase()}`)
                    }}
                  >
                    <span style={{
                      marginRight: "10px"
                    }}><img src={el.icon} style={{
                      width: "17px",
                      height: '17px'
                    }} /></span>{el.name}
                  </li>
                )
              }
            </div>

          </div>
        }



        {/* {showSubMenu && (


          <li
            className='nav-item'
            style={{
              color: '#00e194'
            }}
            onClick={() => {
              navigate(`/intent/search?event_category=shows`)
            }}
          >
            Shows
          </li>
        )}
        {showSubMenu && (
          <li
            style={{
              color: '#00e194'
            }}
            className='nav-item'
            onClick={() => {
              navigate(`/intent/search?event_category=movies`)
            }}
          >
            Movies
          </li>
        )}
        {showSubMenu && (
          <li
            style={{
              color: '#00e194'
            }}
            className='nav-item'
            onClick={() => {
              navigate(`/intent/search?event_category=business`)
            }}
          >
            Business
          </li>
        )}
        {showSubMenu && (
          <li
            style={{
              color: '#00e194'
            }}
            className='nav-item'
            onClick={() => {
              navigate(`/intent/search?event_category=clubs`)
            }}
          >
            Clubs
          </li>
        )}
        {showSubMenu && (
          <li
            style={{
              color: '#00e194'
            }}
            className='nav-item'
            onClick={() => {
              navigate(`/intent/search?event_category=festivals`)
            }}
          >
            Festivals
          </li>
        )} */}

        <li className='nav-item text-center'>
          <a href='/about'>About</a>
        </li>

        <li className='nav-item text-center'
          onClick={() => {
            toggle(false)
          }}
        >
           <a href='/contact'>Contact</a>
        </li>
        <li
          className='close-btn'
          onClick={() => {
            toggle(false)
          }}
        >
          <IoClose size='35' color='white' />
        </li>
      </ul>
    </div>
  )
}

export default MobileMenu
