const Confidence = require('confidence')

const config = {
    port: {
        $filter: "env",
        $default:  8080,
        production:  8080,
    },

    mongodb: {
        $filter: "env",
        $default: 'mongodb+srv://neko:99VisHFEQQOsYdS3@cluster0.8m8uc.mongodb.net/quizlet?retryWrites=true&w=majority',
        production: 'mongodb+srv://neko:99VisHFEQQOsYdS3@cluster0.8m8uc.mongodb.net/quizlet?retryWrites=true&w=majority',
    },

    google_client_id: {
        $filter: "env",
        $default: '234788326662-3hpa315262lg7aoqgjfkb0951vks701p.apps.googleusercontent.com',
        production: '234788326662-3hpa315262lg7aoqgjfkb0951vks701p.apps.googleusercontent.com',
    },

    google_client_secret: {
        $filter: "env",
        $default: 'ussckduhtUJp7c7ngUEAn40T',
        production: 'ussckduhtUJp7c7ngUEAn40T'
    },

    facebook_client_id: {
        $filter: "env",
        $default: '340699347152404',
        production: '340699347152404',
    },

    facebook_client_secret: {
        $filter: "env",
        $default: '37f16767b38f4660ce31f66590dcf39a',
        production: '37f16767b38f4660ce31f66590dcf39a'
    },

    token: {
        $filter: "env",
        $default: 'v8HHACULJcHrdeI',
        production: 'v8HHACULJcHrdeI'
    },

    token_refresh: {
        $filter: "env",
        $default: 'aDp6BynKHwN9R5n',
        production: 'aDp6BynKHwN9R5n'
    }
}

const store = new Confidence.Store(config)
const criteria = {
    env: 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}