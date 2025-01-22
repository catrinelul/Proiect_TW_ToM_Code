const { DataTypes } = require("sequelize");
const Event = require("../models/event");
const {Op} = require("sequelize");
const moment = require('moment-timezone');
const router = require("express").Router(); 

// CRUD pt Event

    // get all events
router.get("/event", async (req,res) => {
        try{
        //    return res.status(200).json({message: "ok"});
            const events = await Event.findAll();
            return res.status(200).json(events);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // create new event
router.post("/event",async(req,res) => {
        try {
            /*const {inputName,inputDate,inputStartTime,inputEndTime,inputGroupId} = req.body;
            const formatStartTime = moment(inputStartTime).format("HH:mm:ss");
            const formatEndTime = moment(inputEndTime).format("HH:mm:ss");

            const newEvent = await Event.create({
                name: inputName,
                date: moment(inputDate).format("YYYY-MM-DD"),
                startTime: formatStartTime,
                endTime: formatEndTime,
                groupId: inputGroupId
            });*/
            const newEvent = await Event.create(req.body);
            
            return res.status(200).json(newEvent);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get event after id
router.get("/event/:id", async (req,res) => {
        try{
            const event = await Event.findByPk(req.params.id);
            if(event)
            {
                return res.status(200).json(event);
            }
            else {
                return res.status(404).json({error: `Event with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // ? NU MERGE 
    // update event after id
router.put("/event/:id", async(req,res) => {
        try {
            const event = await User.findByPk(req.params.id);
            if(event)
            {
                const updateEvent = await event.update(req.body);
                return res.status(200).json(updateEvent);
            }
            else {
                return res.status(404).json({error: `Event with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get event/s for a certain group
 router.get("/event/group/:groupId", async(req,res) => {
    try {
       // const {groupId} = req.query.groupId; 
       const groupId = req.params.groupId;

       const events = await Event.findAll({
           // where: groupId ? { idGroup : { [Op.eq]: groupId } } : undefined
           where: { groupId : groupId }
        });

        if(events.length == 0) {
            return res.status(250).json({mesaj : "Nu exista events pentru grupul dat"});
        } else {
            return res.status(200).json(events);

        }
    } catch(err){
        return res.status(500).json(err);
    }
})

    // get events for current day 
router.get("/currentEvent", async (req,res) => {
    try {
        const Date = moment();

        // const today = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000))
        //     .toISOString()
        //     .split('T')[0];

        const currentDate = Date.tz('Europe/Bucharest').format('YYYY-MM-DD');
        const currentTime = Date.format('HH:mm:ss');
        //const eventDateUTC = moment.tz(`${currentDate}`, 'Europe/Bucharest').utc().format('YYYY-MM-DD HH:mm:ss');

        const events = await Event.findAll({
            where: {
                date : { [Op.eq]: eventDateUTC },
                startTime : { [Op.lte]: currentTime },
                endTime : { [Op.gte]: currentTime }
            }
        });

        //return res.status(200).json(events);
        return res.status(200).json({currentDate, currentTime});

    } catch(err) {
        return res.status(500).json(err);
    }
});

    // update events for current day if current time is between startTime - endTime

module.exports = router;