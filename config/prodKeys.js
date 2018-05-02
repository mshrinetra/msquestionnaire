module.exports = {
    facebook: {
        clientID: process.env.MSQUESTIONNAIRE_FACEBOOK_CLIENTID,
        secret: process.env.MSQUESTIONNAIRE_FACEBOOK_SECRET,
        redirectURI: ""
    },
    mongoDB: {
        mongoURI: process.env.MSQUESTIONNAIRE_MONGODB_MONGOURI
    },
    cookie: {
        key: process.env.MSQUESTIONNAIRE_COOKIE_KEY
    }
};