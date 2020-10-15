const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    blogID: { type: String, required: true },
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Comment', commentSchema)
