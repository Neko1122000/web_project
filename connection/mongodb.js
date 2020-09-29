const Mongoose = require('mongoose')
Mongoose.set('useCreateIndex', true)

const connector = require('../schema')
const getEnv = require('../env/getEnv')

const MONGODB_URI = getEnv('/mongodb')

const _connection = (uri, options = {}) => {
    if (!uri) {
        throw new Error("'uri' is required.")
    }

    const defaultOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }

    const optionValidated = Object.assign(defaultOptions, options)

    process.on('SIGTERM', () => {
        Mongoose.connection.close(() => {
            console.log('Mongo Database disconnected through app termination.')
        })
    })

    const connection = Mongoose
        .createConnection(uri, optionValidated)

    connection.on('connected', () => {
        console.log('MongoDB is connected.')
    })

    connection.on('connecting', () => {
        console.log('MongoDB is connecting.')
    })

    connection.on('disconnecting', () => {
        console.log('MongoDB is disconnecting.')
    })

    connection.on('disconnected', () => {
        console.log('MongoDB is disconnected.')
    })

    connection.on('error', (error) => {
        console.error('MONGODB_ERROR', error)
        process.exit(1)
    })

    return connection
}

const originConnection = _connection(MONGODB_URI, {
    poolSize: 5
})

module.exports = connector(originConnection)