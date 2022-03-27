const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const UserShema = new Shema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    decks: [{
        type: Shema.Types.ObjectId,
        ref: 'Deck'
    }]
})

const User = mongoose.model('User', UserShema);
module.exports = User;