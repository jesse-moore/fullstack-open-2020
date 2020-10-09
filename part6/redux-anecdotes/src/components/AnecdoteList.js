import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default () => {
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes
            .filter((item) =>
                item.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((e1, e2) => e2.votes - e1.votes)
    )
    const dispatch = useDispatch()

    const handleVote = ({ id, content, votes }) => {
        dispatch(vote({ id, content, votes }))
        dispatch(setNotification(`you voted for '${content}'`, 5000))
    }

    return (
        <div>
            {anecdotes.map((anecdote) => {
                const { id, content, votes } = anecdote
                return (
                    <div key={id}>
                        <div>{content}</div>
                        <div>
                            has {votes}
                            <button
                                onClick={() =>
                                    handleVote({ id, content, votes })
                                }
                            >
                                vote
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
