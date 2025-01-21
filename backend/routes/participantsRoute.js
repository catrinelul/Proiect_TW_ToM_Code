const Participant = require("../models/participant"); 

const router = require("express").Router(); 


// CRUD pt Participant

    // get all participants
router.get("/participant", async (req,res) => {
        try{
        //    return res.status(200).json({message: "ok"});
            const participants = await Participant.findAll();
            return res.status(200).json(participants);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // create new participant
router.post("/participant",async(req,res) => {
        try {
            const newParticipant = await Participant.create(req.body);
            return res.status(200).json(newParticipant);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get participant after id
router.get("/participant/:id", async (req,res) => {
        try{
            const participant = await Participant.findByPk(req.params.id);
            if(participant)
            {
                return res.status(200).json(participant);
            }
            else {
                return res.status(404).json({error: `Participant with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // update participant after id
router.put("/participant/:id", async(req,res) => {
        try {
            const participant = await Participant.findByPk(req.params.id);
            if(participant)
            {
                const updateParticipant = await participant.update(req.body);
                return res.status(200).json(updateParticipant);
            }
            else {
                return res.status(404).json({error: `Participant with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get participants for a certain event
router.get("/participant/event/:eventId", async(req,res) => {
    try {
       const eventId = req.params.eventId;

       const participants = await Participant.findAll({
           // where: groupId ? { idGroup : { [Op.eq]: groupId } } : undefined
           where: { eventId : eventId }
        });

        if(participants.length == 0) {
            return res.status(250).json({mesaj : "Nu exista participanti pentru evenimentul dat"});
        } else {
            return res.status(200).json(participants);

        }
    } catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;

