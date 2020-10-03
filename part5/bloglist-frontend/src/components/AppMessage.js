import React from 'react'

const AppMessage = ({ appMessage }) => {
  const { message = '', type = '' } = appMessage
  if (message === '') return null
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
