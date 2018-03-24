module.exports = (app) => {
    const tickets = require('../controllers/ticket.controller');
    app.post('/api', tickets.post);

    app.get('/api', tickets.get);

    app.put('/api', tickets.put);

    app.delete('/api', tickets.delete);
}