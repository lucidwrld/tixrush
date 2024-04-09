import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

const Modal = ({ setIsOpen, children }) => {

  return (
    <>
      <div className='darkBG' onClick={() => setIsOpen(false)} />
      <div className='centered'>
        <div className='modal'>
          <button className='closeBtn' onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className='modalContent'>'testing'</div>
        </div>
      </div>
    </>
  )
}

export default Modal
