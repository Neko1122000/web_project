const Promise = require('bluebird')
const {getModel} = require('../connection/mongodb')
const joi = require('joi')

const _validate = async (flash_cards) => {
    const _flashCard = joi.array().min(2).items(joi.object({
        title: joi.string().trim().required(),
        description: joi.string().trim().required(),
        language: joi.string().trim(),
        img: joi.string().trim()
    }))
    return _flashCard.validateAsync(flash_cards)
}

exports.create = async (flashCards, setId) =>{
    const flash_cards = await _validate(flashCards)
    const FlashCard = getModel('FlashCard')
    return Promise.map(flash_cards, async(flash_card) => {
        return FlashCard.create({...flash_card, set: setId})
    }, {concurrency: 10})
}