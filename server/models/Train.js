const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seats: { type: Number, required: true },
});

module.exports = mongoose.model('Train', TrainSchema);