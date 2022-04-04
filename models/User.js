const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Username is Required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is Required',
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: '',
            ref: 'Thought'
        }
    ],
    friends: {

    }
})

const User = model('User', UserSchema)