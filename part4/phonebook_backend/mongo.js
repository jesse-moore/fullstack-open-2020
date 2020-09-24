const mongoose = require('mongoose')

const [, , password, name, number] = process.argv
if (!password) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

if ((name && !number) || (!name && number)) {
    console.log(
        'Please provide both name and number as an argument: node mongo.js <password> <name> <number>'
    )
    process.exit(1)
}

const url = `mongodb+srv://user1:${password}@cluster0.n44fc.mongodb.net/Phonebook_App?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
    Person.find({}).then((result) => {
        const people = result.map(({ name, number }) => `${name} ${number}`)
        console.log(['phonebook:', ...people].join('\n'))
        mongoose.connection.close()
    })
    return
}

if (name && number) {
    const person = new Person({ name, number })
    person.save().then(() => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
