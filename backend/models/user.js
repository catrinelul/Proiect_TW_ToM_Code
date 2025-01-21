const {DataTypes} = require('sequelize');
const sequelize = require("../database.js");

const User = sequelize.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    }, 
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    }
})

module.exports = User;
