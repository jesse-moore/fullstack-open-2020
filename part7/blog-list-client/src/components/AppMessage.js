import React from 'react'
import { useSelector } from 'react-redux'

const AppMessage = () => {
  const { message, type } = useSelector((state) => state.message)
  if (!message) return null
  const defaultStyle = {
    fontWeight: 'bold',
    fontSize: '1.25em',
    borderRadius: '5px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#cce5ff',
  }
  const alertStyle = {
    backgroundColor: '#f8d7da',
  }
  const notifStyle = {
    backgroundColor: '#d4edda',
  }
  const messageStyle =
    type === 'alert' ? alertStyle : type === 'notif' ? notifStyle : {}
  const styles = { ...defaultStyle, ...messageStyle }
  return (
    <div style={styles}>
      <span>{message}</span>
    </div>
  )
}

export default AppMessage
