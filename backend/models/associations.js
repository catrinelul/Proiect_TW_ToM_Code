import User from "user.js";
import Event from "event.js";
import Group from "group.js";
import Participant from "participant.js";

// relatie one-to-many : user -> group
User.hasMany(Group, {foreignKey: "userId", onDelete: "CASCADE"});
Group.belongTo(User, {foreignKey: "userId", onDelete: "CASCADE"});

// relatie one-to-many : grup evenimente (group) -> eveniment (event)
Group.hasMany(Event, {foreignKey: "groupId", onDelete: "CASCADE"});
Event.belongTo(Group, {foreignKey: "groupId", onDelete: "CASCADE"});

// relatie one-to-many : event -> participant
Event.hasMany(Participant, {foreignKey: "eventId", onDelete: "CASCADE"});
Participant.belongTo(Event, {foreignKey: "eventId", onDelete: "CASCADE"});
