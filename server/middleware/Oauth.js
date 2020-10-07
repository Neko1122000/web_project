const jwt = require('jsonwebtoken');
const getEnv = require('../env/getEnv')
const {getModel} = require('../connection/mongodb')

exports.authenticate = async (req, res, next) => {
    try {
        const auth = req.get('Authorization');
        if (auth == null) return res.status(401).send("Not authorized");
        const token = auth.split(" ");
        if (token[0] !== 'Bearer') return res.status(401).send("Not authorized");

        jwt.verify(token[1], getEnv('/secret_hash_key') ,async function(err, decoded) {
            if (err) {
                return res.status(500).send(err.message);
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