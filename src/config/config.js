require('dotenv').config();

const config = {
    app: {
        port: 3000
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    },
    serviceQiscus: {
        appId: process.env.QISCUS_APP_ID,
        appSecret: process.env.QISCUS_SECRET_KEY,
        baseUrl: process.env.QISCUS_BASE_URL,
        userId: process.env.QISCUS_USER_ID,
    }
}

module.exports = config;