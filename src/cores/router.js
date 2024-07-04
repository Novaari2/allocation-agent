const api = require('../routes/api');

const router = (app) => {
    app.use(api)
}

module.exports = router