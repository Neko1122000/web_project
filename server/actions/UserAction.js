const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {getModel} = require('../connection/mongodb')
const getEnv = require('../env/getEnv')

const _createByGoogle = async (profile) => {
    const data = profile._json
    const {sub: google_id, email, name, picture: image_link} = data

    const User = getModel('User')

    const user = await User.findOne({google_id}).lean()
    if (user) return user

    return User.create({username: name, email, google_id, image_link})
}

const _createByFacebook = async (profile) => {
    const data = profile._json
    const {id: facebook_id, name, picture, email} = data
    const image_link = picture? picture.data.url : null

    const User = getModel('User')

    const user = await User.findOne({facebook_id}).lean()
    if (user) return user

    return User.create({username: name, email, facebook_id, image_link})
}

const _create = async (profile) => {
    const {name, email, password} = profile;
    const hashPassword = bcrypt.hashSync(password, 10);

    const User = getModel('User')
    return User.create({username: name, email,  password: hashPassword})
}

const createUser = async (profile, type = '') =>{
    if (type === 'google') return _createByGoogle(profile)
    else if (type === 'facebook') return _createByFacebook(profile)
    else return _create(profile)
}

exports.createUser = createUser

const generateToken = async (user_id) => {
    if (!user_id) throw new Error ('User ID required')

    const User = getModel('User')
    const user = await User.findOne({_id: user_id}).lean()
    if (!user) throw new Error('User not found')

    return jwt.sign({user_id}, getEnv('/secret_hash_key'), {expiresIn: 84600})
}
exports.generateToken = generateToken

exports.login = async (data) => {
    const {type} = data
    const User = getModel('User')

    if (type === 'facebook') {
        const user = await User.findOne({facebook_id: data.id}).lean()
        if (!user) throw new Error('User not found')
        return generateToken(user._id)
    } else if (type === 'google') {
        const user = await User.findOne({google_id: data.id}).lean()
        if (!user) throw new Error('User not found')
        return generateToken(user._id)
    } else {
        const  {password, email} = data;
        const user = await User.findOne({email}).lean();
        if (!user) throw new Error ('Email / password not correct');

        const verify = await bcrypt.compareSync(password, user.password);
        if (!verify) throw new Error ('Email / password not correct');

        return generateToken(user._id)
    }
}