const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {getModel} = require('../connection/mongodb')
const getEnv = require('../env/getEnv')
const Promise = require('bluebird')

const _createByGoogle = async (profile) => {
    const data = profile._json
    const {sub: google_id, email, name, picture: image_link} = data

    const User = getModel('User')

    const user = await User.findOne({google_id}).lean()
    if (user) {
        if (user.is_active) return user
        else await User.updateOne({_id: user._id}, {$set: {is_active: true}})

        return Object.assign({}, user, {is_active: true})
    }

    const newUser = await User.create({username: name, email, google_id, image_link})
    await _createUserSetting(newUser._id, false)
    return newUser
}

const _createByFacebook = async (profile) => {
    const data = profile._json
    const {id: facebook_id, name, picture, email} = data
    const image_link = picture? picture.data.url : null

    const User = getModel('User')

    const user = await User.findOne({facebook_id}).lean()
    if (user) {
        if (user.is_active) return user
        else await User.updateOne({_id: user._id}, {$set: {is_active: true}})

        return Object.assign({}, user, {is_active: true})
    }

    const newUser = await User.create({username: name, email, facebook_id, image_link})
    await _createUserSetting(newUser._id, false)
    return newUser
}

const _create = async (profile) => {
    const {name, email, password} = profile;
    const hashPassword = bcrypt.hashSync(password, 10);

    const User = getModel('User')
    const user = await User.findOne({email}).lean()
    if (user) throw new Error('Account has already exist')

    const newUser = await User.create({username: name, email,  password: hashPassword})
    await _createUserSetting(newUser._id, false)
    return newUser
}

const _createUserSetting = async (user_id, password) => {
    const defaultSetting = [
        {key: 'night_mode', value: 'disable'},
        {key: 'language', value: 'Vietnamese'},
        {key: 'night_mode', value: 'disable'},
        {key: 'password', value: password? 'enable': 'disable'},
        {key: 'change_name', value: 'enable'},
        {key: 'reminder', value: 'disable'},
        {key: 'update_mail', value: 'enable'},
        {key: 'voucher_mail', value: 'enable'},
        {key: 'record_mail', value: 'enable'},
        {key: 'send_time', value: '08:00'},
        {key: 'timezone', value: 'GTM+07:00'},
        {key: 'show_when_active', value: 'disable'},
        {key: 'real_name', value: 'enable'},
        {key: 'search_profile_by_google', value: 'disable'}
    ]

    const UserSetting = getModel('UserSetting')
    const _promise = defaultSetting.map(setting => {
        const obj = Object.assign({}, setting, {user: user_id, update_at: Date.now()})
        return UserSetting.create(obj)
    })

    await Promise.all(_promise)
    return true
}

const createUser = async (profile, type = '') => {
    let user

    if (type === 'google') user = await _createByGoogle(profile)
    else if (type === 'facebook') user = await  _createByFacebook(profile)
    else user = await _create(profile)

    return user
}

exports.createUser = createUser

const generateToken = async (user_id) => {
    if (!user_id) throw new Error ('User ID required')

    const User = getModel('User')
    const user = await User.findOne({_id: user_id}).lean()
    if (!user) throw new Error('User not found')

    const token = jwt.sign({user_id}, getEnv('/token'), {expiresIn: 3600})
    const refresh_token = jwt.sign({user_id}, getEnv('/token_refresh'), {expiresIn: 84600 * 7})

    return {token, refresh_token}
}
exports.generateToken = generateToken

exports.refreshToken = async (refresh_token) => {
    const decoded = jwt.verify(refresh_token, getEnv('/token_refresh'))
    const {user_id} = decoded

    const User = getModel('User')
    const user = await User.findById(user_id);
    if (!user) throw new Error ("User not found");

    const token = jwt.sign({user_id}, getEnv('/token'), {expiresIn: 3600})
    const refresh = jwt.sign({user_id}, getEnv('/token_refresh'), {expiresIn: 84600 * 7})

    return {token, refresh_token: refresh}
}

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

exports.getUserSetting = async (id) => {
    console.log(id)
    const User = getModel('User')
    const UserSetting = getModel('UserSetting')

    const user = await User.findOne({_id: id, is_active: true})
            .select('-_id username facebook_id google_id email image_link account_type')
            .lean()
    if (!user) throw new Error('User not found')

    const setting = await UserSetting.find({user: id}).select('key value').lean()
    const result = setting.map(element => {
        const obj = {}
        obj[element.key] = element.value
        return obj
    })
    return Object.assign({}, user, ...result)
}

exports.updateUserSetting = async (id, args) => {
    return true
}