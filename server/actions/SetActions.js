const {getModel} = require('../connection/mongodb')
const FlashCardAction = require('./FlashCardAction')
const joi = require('joi')

const _validate = async (args, creator = '') => {
    const validate_schema = joi.object({
        name: joi.string().required().trim(),
        description: joi.string().trim(),
        img: joi.string().trim(),
        updated_by: joi.string().trim().valid('only_me', 'classes', 'password').required(),
        updated_password: joi.when('update_by', {is: 'password', then: joi.string().required()}),
        class_updated: joi.when('updated_by', {is: 'classes', then: joi.array().items(joi.string())}),
        visible_by: joi.string().trim().valid('everyone', 'only_me', 'classes', 'password').required(),
        visible_password: joi.when('update_by', {is: 'password', then: joi.string().required()}),
        class_visible: joi.when('updated_by', {is: 'classes', then: joi.array().items(joi.string())}),
        flashcards: joi.array().min(2).items(joi.object({
            _id: joi.string().trim(),
            title: joi.string().trim().required(),
            description: joi.string().trim().required(),
            language: joi.string().trim(),
            img: joi.string().trim()
        }))
    })
    return {
        ... await validate_schema.validateAsync(args),
        creator: typeof creator === 'string'? creator.trim(): ""
    }
}

const _getSet = async (setId, select = '') => {
    const Set = getModel('Set')
    const set = await Set.findById(setId).select(select).lean()
    if (!set) throw new Error('Set not found')

    const FlashCard = getModel('FlashCard')
    const flash_cards = await FlashCard.find({set: setId}).select('-set').lean()

    return {
        ...set, flash_cards
    }
}

const _compare = (str, str2) => {
    return str.equals(str2)
}
exports.getSet = async(setId, userId = '', args = {}) => {
    const set = await _getSet(setId)
    const {img, description, name, flash_cards, created_at, updated_at, visible_by, creator} = set
    let flag = false

    if (visible_by === 'everyone') flag = true
    if (visible_by === 'only_me') {
        flag = (creator === userId)
        if (!flag) throw new Error ('You are not allowed to see this resource.')
    }
    if (visible_by === 'password') {
        const {password: _pass} = args
        const {visible_password} = set
        if (!_compare(visible_password, _pass)) throw new Error ('Password is not match.')
        flag = true
    }
    if (visible_by === 'classes') {
        const {visible_classes} = set
        const Class = getModel('Class')
        const classes = await Class.find({member: userId}).lean()
        for (const cl of classes) {
            if (visible_classes.includes(cl)) {
                flag = true
                break
            }
        }
        if (!flag) throw new Error ('You are not allowed to see this set.')
    }

    if (flag) return {
        img,
        description,
        name,
        flash_cards,
        created_at,
        updated_at
    }
    return null
}

exports.updateSet = async (setId, userId, args) => {
    const {flashcards, creator, ...data} = await _validate(args)

    const {updated_by, updated_password, updated_classes, creator: cr} = await _getSet(setId)

    if (updated_by === 'only_me')
        if ((cr + '') !== userId) throw new Error ('You are not allowed to change this resource.')
    if (updated_by === 'password') {
        const {password: _pass} = args
        if (!_compare(updated_password, _pass)) throw new Error ('Password is not match.')
    }
    if (updated_by === 'classes') {
        const Class = getModel('Class')
        const classes = await Class.find({member: userId}).lean()

        let flag = false
        for (const cl of classes) {
            if (updated_classes.includes(cl)) flag = true
        }

        if (!flag) throw new Error ('You are not allowed to see this set.')
    }

    const Set = getModel('Set')
    await Set.updateOne({_id: setId}, {$set: data})
    await FlashCardAction.update(flashcards)
    return true
}


exports.create = async(args, creator) => {
    const {flashcards, ...data} = await _validate(args, creator)
    const Set = getModel('Set')
    const set = await Set.create(data)
    await FlashCardAction.create(flashcards, set._id)
    return _getSet(set._id, '_id img description name created_at updated_at')
}