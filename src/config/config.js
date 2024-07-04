require('dotenv').config();

const config = {
    app: {
        port: 3000
    },
    serviceQiscus: {
        appId: process.env.QISCUS_APP_ID,
        appSecret: process.env.QISCUS_SECRET_KEY,
        baseUrl: process.env.QISCUS_BASE_URL,
        userId: process.env.QISCUS_USER_ID,
    }
}

module.exports = config;