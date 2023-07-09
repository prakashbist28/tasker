const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    item:{
        type:String,
        required:[true,'must provide name']
    },
    completed:{
        type : Boolean,
        default:false,
    }
})
module.exports = mongoose.model('Task',taskschema)