import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

export default () => {
    const anecdotes = useSelector((state) =>
        state.sort((e1, e2) => e2.votes - e1.votes)
    )
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(vote(anecdote.id))}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
