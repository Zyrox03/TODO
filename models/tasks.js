const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./users')

const taskSchema = new Schema({
    task: String,
    moment :String,

});






const Task = mongoose.model('Task', taskSchema);
module.exports = Task;