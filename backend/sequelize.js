const express = require('express');
const sequelize = require("./database.js");
const cors = require('cors');

require("./models/event.js");
require("./models/User.js");
require("./models/group.js");
require("./models/participant.js");




const app = express();
app.use(express.json());
app.use(cors());

// Preluare routers
const userRoute = require("./routes/usersRoute.js");
app.use(userRoute);
const eventRoute = require("./routes/eventsRoute.js");
app.use(eventRoute);
const groupRoute = require("./routes/groupsRoute.js");
app.use(groupRoute);
const participantRoute = require("./routes/participantsRoute.js");
app.use(participantRoute);


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully");

}).catch((err) => {
        console.error("Unable to connect to database");
});

sequelize.sync({ alter: true }).then(() => {
    console.log("All models synced successfully");
}).catch((err)=> {
    console.error("Failed to sync models");
});


app.listen(8080);
