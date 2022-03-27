const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const DeckShema = new Shema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    owner: {
        type: Shema.Types.ObjectId,
        ref: 'User'
    }
})

const Deck = mongoose.model('Deck', DeckShema);
module.exports = Deck;