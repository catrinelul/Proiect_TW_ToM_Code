import User from "user.js";
import Event from "event.js";
import Group from "group.js";
import Participant from "participant.js";

// relatie one-to-many : user -> group
User.hasMany(Group, {foreignKey: "userId"});
Group.belongTo(User, {foreignKey: "userId"});

// relatie one-to-many : grup evenimente (group) -> eveniment (event)
Group.hasMany(Event, {foreignKey: "groupId"});
Event.belongTo(Group, {foreignKey: "groupId"});

// relatie one-to-many : event -> participant
Event.hasMany(Participant, {foreignKey: "eventId"});
Participant.belongTo(Event, {foreignKey: "eventId"});
