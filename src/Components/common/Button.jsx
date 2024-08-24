import React from 'react'

export function Button({ className, btnText, onClick, type }) {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>{btnText}</button>
  )
}
