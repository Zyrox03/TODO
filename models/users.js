const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    backgroundImage : {
        type : String,
    },
    backgroundFilename : {
        type : String,
    },
    task: [
        {
            type: Schema.Types.ObjectId,
            ref : 'Task'
        },
    ]
});




userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);
module.exports = User;