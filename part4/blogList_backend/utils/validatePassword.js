module.exports = (password) => {
    if (!password) return { isValid: false, error: 'password required' }
    if (password.length < 3)
        return { isValid: false, error: 'password less than 3 characters' }
    return { isValid: true }
}
