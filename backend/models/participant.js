const {DataTypes} = require('sequelize');
const sequelize = require("../database.js");

const Participant = sequelize.define('participant', {
    idParticipant: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    joinMoment: {
        type: DataTypes.TIME, 
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "events",
            key: "idEvent"
        },
    }
})

module.exports = Participant;