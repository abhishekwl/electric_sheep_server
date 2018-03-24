const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//LOCAL
const Ticket = require('./app/models/ticket.model');

mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://localhost:27017/es';
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', (err)=>{
    console.log('[!MONGODB] ERROR: '+err);
});
mongoose.connection.once('open', ()=>{
    console.log('[MONGODB] Hook to DB success');
});

const PORT = process.env.PORT || 4269;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/',  (req,res)=>{
    console.log('[SERVER] HIT ROOT');
    res.status(200).json({ message: 'All requests should be directed to /api endpoint' });
});

require('./app/routes/ticket.routes')(app);
app.listen(PORT, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+PORT);
});