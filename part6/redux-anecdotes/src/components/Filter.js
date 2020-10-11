import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        props.setFilter(filter)
    }
    return (
        <div style={{ marginBottom: '20px' }}>
            Filter: <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    setFilter,
}

export default connect(null,mapDispatchToProps)(Filter)
