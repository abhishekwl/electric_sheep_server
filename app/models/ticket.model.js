const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    {
        uid: String,
        from: String,
        to: String,
        departure: String,
        arrival: String,
        class: String,
        seats: [ String ],
        clientName: String,
        pnr: String,
        trainNumber: String,
        ticketNumber: String,
        adults: Number,
        children: Number,
        cost: Number,
        contact: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ticket', ticketSchema);