const express = require('express');
const app = express();
const config = require('./src/config/config');
const router = require('./src/cores/router');
const middleware = require('./src/cores/middleware');
const port = 3000

const axios = require('axios');

middleware(express, app)
router(app)

app.post('/allocated-agent', async (req, res) => {
    console.log(req.body)
    return res.send('Webhook Work');
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
