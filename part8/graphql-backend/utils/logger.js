const info = (...params) => {
    if (process.env.NODE_ENV === 'test') return
    console.log(...params)
}

const error = (...params) => {
    if (process.env.NODE_ENV === 'test') return
    console.error(...params)
}

module.exports = { info, error }
