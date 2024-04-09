import React from 'react'
import { ProgressBar } from 'react-loader-spinner'
import logo from '../../Assets/img/logo.png'

const Loader = () => {
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{
        background: '#000',
        minHeight: '100vh'
      }}
    >
      <div>
        <p className='header-logo mb-0 text-center w-100 loader-logo d-flex align-items-center justify-content-center'>
          {/* <NavLink to='/' className='header-logo'> */}
          <div
            style={{
              width: '80px'
            }}
          >
            <img
              width='100%'
              height='100%'
              src={logo}
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
          {/* </NavLink> */}
        </p>
        <ProgressBar
          height='20'
          width='100%'
          ariaLabel='progress-bar-loading'
          wrapperStyle={{}}
          wrapperClass='progress-bar-wrapper'
          borderColor='#Fff'
          barColor='#fff'
        />
      </div>
    </div>
  )
}

export default Loader
