const {DataTypes} = require('sequelize');
const sequelize = require("../database.js");

const Group = sequelize.define('group', {
    idGroup: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "idUser"
        }
    }
})

module.exports = Group;