const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const userAttendance = connection.define("userAttendance", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    date: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
    },
    checkInTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    vehicleNo: {
        type: DataTypes.STRING,
        defaultValue: null,
    },    
    checkOutTime: {
        type: DataTypes.TIME,
        defaultValue: null,
    },
    branchId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    checkInselfie: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    checkOutselfie: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    meterStart: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    meterEnd: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    meterStartNumber: {
        type: DataTypes.STRING,
        allowNull: null,
    },
    meterEndNumber: {
        type: DataTypes.STRING,
        allowNull: null,
    },
});

module.exports = userAttendance;