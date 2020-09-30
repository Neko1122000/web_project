const _getConnection = connection => () => {
    return connection
}

const _validatedOptions = (options = {}) => {
    return Object.assign({}, options)
}

const _getModel = connection => (collection = '', options = {}) => {
    const {plugin} = _validatedOptions(options)

    try {
        const Schema = require(`./schemas/${collection}`)
        if (typeof plugin === 'function') {
            Schema.plugin(plugin)
        }

        return connection.model(collection, Schema)
    } catch (e) {
        console.error(e)

        process.exit(1)
    }
}

module.exports = connection => {
    return {
        getConnection: _getConnection(connection),
        getModel: _getModel(connection)
    }
}
