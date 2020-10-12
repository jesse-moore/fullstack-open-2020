import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const { anecdotes } = props

    const handleVote = ({ id, content, votes }) => {
        props.vote({ id, content, votes })
        props.setNotification(`you voted for '${content}'`, 5000)
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

const mapStateToProps = (state) => {
    const { anecdotes, filter } = state
    const anecdoteList = anecdotes
        .filter((item) =>
            item.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((e1, e2) => e2.votes - e1.votes)
    return {
        anecdotes: anecdoteList,
    }
}

const mapDispatchToProps = {
    vote,
    setNotification,
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
