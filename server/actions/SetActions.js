const {getModel} = require('../connection/mongodb')
const FlashCardAction = require('./FlashCardAction')
const joi = require('joi')

const _validate = async (args, creator = '') => {
    const validate_schema = joi.object({
        name: joi.string().required().trim(),
        description: joi.string().trim(),
        img: joi.string().trim(),
        updated_by: joi.string().trim().required().valid(['only_me', 'classes', 'password']),
        updated_password: joi.when('update_by', {is: 'password', then: joi.string().required()}),
        updated_visible: joi.when('updated_by', {is: 'classes', then: joi.array().items(joi.string())}),
        visible_by: joi.string().trim().required().valid(['everyone', 'only_me', 'classes', 'password']),
        visible_password: joi.when('update_by', {is: 'password', then: joi.string().required()}),
        class_visible: joi.when('updated_by', {is: 'classes', then: joi.array().items(joi.string())}),
        flashcards: joi.array().min(2).items(joi.object({
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

const _getSet = async (setId) => {
    const Set = getModel('Set')
    const set = await Set.findById(setId).lean()
    if (!set) throw new Error('Set not found')

    const FlashCard = getModel('FlashCard')
    const flashCard = await FlashCard.find({set: setId}).lean()

    return {
        ...set, flashCard
    }
}
exports.getSet = _getSet

exports.create = async(args, creator) => {
    const {flashcards, ...data} = _validate(args, creator)
    const Set = getModel('Set')
    const set = await Set.create(data)
    await FlashCardAction.create(flashcards, set._id)
    return _getSet(set._id)
}