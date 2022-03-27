const { urlencoded } = require('body-parser');
const { findByIdAndUpdate } = require('../models/User');
const User = require('../models/User');
const Deck = require('../models/Deck');

// const index = (req, res, next) => {

//        /* CallBack Way */
//           User.find({}, (err, users) => {
//                 // console.error('Error: ', err);
//                 // console.log('Found users: ', users)
//                 if (err) {
//                     next(err);
//                 } else {
//                     return res.status(200).json({ users });
//                 }
//             })
//             // return res.status(200).json({
//             //     message: 'You requested to user handle..'
//             // })
//     } 


/* Promise Way */
// const index = (req, res, next) => {
//     User.find({}) // tim khong co dieu kien
//         .then(users => {
//             return res.status(200).json({ users });
//         })
//         .catch(err => next(err))
// }

// lấy ra tất cả users
const index = async(req, res, next) => {

    const users = await User.find({});
    /* check loi */
    //   throw new Error('Check get API have been Error 🤢')
    return res.status(200).json(users);

}

const newUser = async(req, res, next) => {

    const newUser = new User(req.value.body);
    await newUser.save();
    return res.status(201).json({ user: newUser });
}

/* new user deck */
const newUserDeck = async(req, res, next) => {
    const { userId } = req.value.params;

    // create a new Deck
    const newDeck = new Deck(req.value.body);

    // get a user
    const user = await User.findById(userId);

    // assign a user as a deck'owner
    newDeck.owner = user;

    // save the deck
    await newDeck.save();

    // add deck to user's deck array 'decks'
    user.decks.push(newDeck._id);

    // save after push
    await user.save();

    // return
    return res.status(201).json({ deck: newDeck });
}

// const newUser = (req, res, next) => {
//     console.log('req.body content: ', req.body);
//     const newUser = new User(req.body);
//     console.log('new user: ', newUser);

//     // luu vao database

//     // newUser.save((err, user) => {
//     //     if (err)
//     //         console.error("Error: ", err);
//     //     else
//     //         console.log('User saved: ', user);
//     //     return res.status(201).json({ user });
//     // })
//     newUser.save()
//         .then(users => {
//             return res.status(201).json({ users });
//         })
//         .catch(err => next(err))
// }


// lấy user theo id
const getUser = async(req, res, next) => {
    //console.log('check action:', req.params);
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    console.log("Infor of User: ", user);
    return res.status(200).json({ user });
}

/* create user deck */
const getUserDecks = async(req, res, next) => {
    // get userId
    const { userId } = req.value.params;

    // get User of Deck
    const user = await User.findById(userId).populate('decks');
    // console.log('User deck: ', user.decks);
    return res.status(200).json({ decks: user.decks });
}

/*  replace user */
const replaceUser = async(req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
    //  return res.status(200).json({ user: result })
    return res.status(200).json({ success: true })
}

/*  update user */
const updateUser = async(req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
    //return res.status(200).json({user:result} );
    return res.status(200).json({ success: true })
}
module.exports = {
    index,
    newUser,
    newUserDeck,
    getUser,
    getUserDecks,
    replaceUser,
    updateUser


};