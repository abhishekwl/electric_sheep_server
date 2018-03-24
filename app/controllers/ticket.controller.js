const Ticket = require('../models/ticket.model');

exports.post = (req,res)=>{
    console.log('[POST] '+req.url);

    if(req.body.uid && req.body.from && req.body.to && req.body.departure && req.body.arrival && req.body.class && req.body.seats && req.body.clientName && req.body.pnr && req.body.trainNumber && req.body.ticketNumber && req.body.adults && req.body.children && req.body.cost && req.body.contact) {
        const ticket = new Ticket({
            uid: req.body.uid,
            from: req.body.from,
            to: req.body.to,
            departure: req.body.departure,
            arrival: req.body.arrival,
            class: req.body.class,
            seats: req.body.seats,
            clientName: req.body.clientName,
            pnr: req.body.pnr,
            trainNumber: req.body.trainNumber,
            ticketNumber: req.body.ticketNumber,
            adults: req.body.adults,
            children: req.body.children,
            cost: req.body.cost,
            contact: req.body.contact
        });
        ticket.save((err,data)=>sendMessage(err,data,res));
    } else sendMessage('Missing Params', null, res);
};

exports.get = (req,res)=>{
    console.log('[GET] '+req.url);

    if(req.query.uid && req.query.message) {
        const message = req.query.message.toString().toLowerCase();
        if(message.includes('travel') && message.includes('detail')) Ticket.findOne({ uid: req.query.uid }, (err,data)=>sendMessage(err,data,res));
    }
    else if(req.query.uid) Ticket.findOne({ uid: req.query.uid }, (err,data)=>sendMessage(err,data,res));
    else Ticket.find({}, (err,data)=>sendMessage(err,data,res));
};

exports.put = (req,res)=>{
    console.log('[PUT] '+req.url);

    if(req.query.uid) Ticket.findOneAndUpdate({ uid: req.query.uid }, { $set: req.body }, { new: true }, (err,data)=>sendMessage(err,data,res));
    else sendMessage('Missing UID', null, res);
};

exports.delete = (req,res)=>{
    console.log('[DELETE] '+req.url);

    if(req.query.uid) Ticket.remove({ uid: req.query.uid }, (err,data)=>sendMessage(err,data,res)).limit(1);
    else sendMessage('Missing UID', null, res);
};

function sendMessage(err,data,res) {
    if (err) {
        console.log('[ERROR] '+err);
        res.status(500).json({ error: err });
    } else res.status(200).json(data);
}