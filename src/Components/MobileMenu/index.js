import React, { useState } from 'react'
import { MdClose, MdArrowRight } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import ArrowDown from '../../Assets/img/arrowdown.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../Header/categories'

const MobileMenu = ({ toggle, show }) => {
  const navigate = useNavigate()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu)
  }
  return (
    <div className={`mobile-menu-bar ${show ? 'show' : ''}`}>
      <ul className='header-nav-links text-center pt-5 position-relative '>
        <li className='nav-item'>
          <button className='btn create-event-btn '>Create Event</button>
        </li>
        <li className='nav-item'>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className='nav-item' onClick={toggleSubMenu}>
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
          <>
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
                    width:"12px",
                    height:'12px'
                  }}/></span>{el.name}
                </li>
              )
            }
          </>
        }


        <li className='nav-item'>
          <NavLink to='/about'>About</NavLink>
        </li>

        <li className='nav-item'>
          <NavLink to='/contact'>Contactx</NavLink>
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
