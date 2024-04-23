const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    medicine: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    drname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

const History = mongoose.model('History', historySchema);

module.exports = History;