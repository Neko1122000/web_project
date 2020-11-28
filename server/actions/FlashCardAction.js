const Promise = require('bluebird')
const {getModel} = require('../connection/mongodb')

const create = async (flashCards, setId) =>{
    const FlashCard = getModel('FlashCard')
    return Promise.map(flashCards, async(flashCard) => {
        return FlashCard.create({...flashCard, set: setId})
    }, {concurrency: 10})
}
exports.create = create

exports.update  = async (setId, flashCards) => {
    const FlashCard = getModel('FlashCard')
    await FlashCard.updateMany({set: setId}, {$set: {is_active: false}})

    await create(flashCards, setId)
}