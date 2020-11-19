const Promise = require('bluebird')
const {getModel} = require('../connection/mongodb')

exports.create = async (flashCards, setId) =>{
    const FlashCard = getModel('FlashCard')
    return Promise.map(flashCards, async(flashCard) => {
        return FlashCard.create({...flashCard, set: setId})
    }, {concurrency: 10})
}

exports.update  = async (flashCards) => {
    const FlashCard = getModel('FlashCard')
    return Promise.map(flashCards, async(flashCard) => {
        const {_id, ...info} = flashCard
        return FlashCard.updateOne({_id}, {$set: info})
    }, {concurrency: 10})
}