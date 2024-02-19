const { Sequelize } = require("sequelize");
const { Mysql } = require("./config");

const sequelize = new Sequelize(Mysql.DB, Mysql.username, Mysql.password, {
    host: Mysql.host,
    dialect: Mysql.dialect,
    logging: true,
    define: {
        freezeTableName: true,
    },   
});

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.....!");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
sequelize.sync({
    // force: true
});

module.exports = sequelize;