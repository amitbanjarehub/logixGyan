require("dotenv").config();
module.exports = {
    Port: 8001,                 
    Mysql: {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
}