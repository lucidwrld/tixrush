import React from 'react'

const Switch = ({ onChange }) => {
  return (
    <div>
      <label class='switch-component'>
        <input
          type='checkbox'
          onChange={(e) => {
            onChange(e)
          }}
        />
        <span class='slider round'></span>
      </label>
    </div>
  )
}

export default Switch
