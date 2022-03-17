const { DataTypes } = require('sequelize');
const db = require('../db');



const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: false,
        
    },
    lastName: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: false,
    },
    userName: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    phoneNumber: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false
    }
})




module.exports = 
    User
    