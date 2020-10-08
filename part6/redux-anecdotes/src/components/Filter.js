import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

export default () => {
    const dipatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        dipatch(setFilter(filter))
    }
    return (
        <div>
            Filter: <input onChange={handleChange} />
            <br />
        </div>
    )
}
