const jwt = require('jsonwebtoken');
const getEnv = require('../env/getEnv')
const {getModel} = require('../connection/mongodb')

exports.authenticate = async (req, res, next) => {
    let token
    const headerAuthor = (req.headers['authorization'] || '').trim()
    const fromXHeader = (req.headers['x-access-token'] || '').trim()
    const fromHeader = fromXHeader || headerAuthor
    if (fromHeader) {
        token = fromHeader.replace('Bearer ', '').trim()
    }
    if (!token) token = (req.body.token || req.query.token || '') + ''

    try {
        if (!token) res.status(403).send('No token provided');

        jwt.verify(token, getEnv('/token') ,async function(err, decoded) {
            if (err) {
                return res.status(401).send(err.message);
            }

            const User = getModel('User')
            const user = await User.findById(decoded.id);
            if (!user) return res.status(403).send("User not found");
            req.userId = decoded.id;

            next();
        });
    } catch (e) {
        const message = e.message;
        res.status(500).send(message);
    }
};