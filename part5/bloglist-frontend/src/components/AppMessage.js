import React, { useEffect } from 'react'

export default ({ appMessage, setAppMessage }) => {
    const { message = '', type = '', time = 5000 } = appMessage
    if (message === '') return null
    useEffect(() => {
        setTimeout(() => {
            setAppMessage({})
        }, time)
    }, [])
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
