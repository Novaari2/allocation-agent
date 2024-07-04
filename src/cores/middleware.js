const cors = require('cors')

const middleware = (express, app) => {
    app.use(cors())
    app.use(express.json())
}

module.exports = middleware;