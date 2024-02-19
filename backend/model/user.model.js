const connection = require("../helper/db");
const { DataTypes } = require("sequelize");

const User = connection.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: {
            msg: 'Email is already registerd.'
        }
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    dob: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    aadharNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    panNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    isApproved: {
        type: DataTypes.ENUM("verify", "bacic-verify", "pending"),
        defaultValue: "pending",
    },

    branchId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    bloodGroup: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    userImage: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    salary: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    travellingAllowance: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    companyId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    isBlock: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "no",
    }
});

module.exports = User;