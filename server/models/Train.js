const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    number: String,
    isBooked: { type: Boolean, default: false }
});

const TrainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seats: [SeatSchema]
});

module.exports = mongoose.model('Train', TrainSchema);