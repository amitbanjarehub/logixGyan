const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const Expences = connection.define("Expences", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    particular: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    remark: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    ammount: {
        type: DataTypes.DOUBLE,
        allowNull: 0.00,
    },
    date: {
        type: DataTypes.DATEONLY()
    },
    supportingDocument: {
        type: DataTypes.STRING,
        defaultValue: null
    }
});

module.exports = Expences;