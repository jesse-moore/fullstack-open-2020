module.exports = (user, doc) => {
    const docUserID = doc.user.toString()
    const userID = user._id.toString()
    if (userID !== docUserID)
        throw {
            name: 'AuthorizationError',
            message: 'unauthorized method',
        }
    return
}
