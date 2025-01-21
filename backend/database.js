const {Sequelize} = require("sequelize");

// const sequelize = new Sequelize(
//     "proiect_tw", 
//     "root", 
//     "",
//     {
//         dialect: "mysql"
//     }
// );

const sequelize = new Sequelize(
    "techwebdatabase", 
    "catrinelmol28", 
    "BazaDateTW28",
    {
        host: "techwebproiect.cd28242q254o.eu-north-1.rds.amazonaws.com",
        dialect: "mysql"
    }
);

module.exports = sequelize;