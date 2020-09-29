const Confidence = require('confidence')

const config = {
    port: {
        $filter: "env",
        $default: process.env.PORT || 8080,
        production: process.env.PORT || 8080,
    },

    mongodb: {
        $filter: "env",
        $default: process.env.MONGODB_URI || 'mongodb+srv://neko:99VisHFEQQOsYdS3@cluster0.8m8uc.mongodb.net/quizlet?retryWrites=true&w=majority',
        production: process.env.MONGODB_URI || 'mongodb+srv://neko:99VisHFEQQOsYdS3@cluster0.8m8uc.mongodb.net/quizlet?retryWrites=true&w=majority',
    },
}

const store = new Confidence.Store(config)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}