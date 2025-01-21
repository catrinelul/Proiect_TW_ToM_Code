const Group = require("../models/group");
const {Op} = require("sequelize");

const router = require("express").Router(); 

// CRUD pt Group

    // get all groups
router.get("/group", async (req,res) => {
        try{
        //    return res.status(200).json({message: "ok"});
            const groups = await Group.findAll();
            return res.status(200).json(groups);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // create new group
router.post("/group",async(req,res) => {
        try {
            const newGroup = await Group.create(req.body);
            return res.status(200).json(newGroup);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get group after id
router.get("/group/:id", async (req,res) => {
        try{
            const group = await Group.findByPk(req.params.id);
            if(group)
            {
                return res.status(200).json(group);
            }
            else {
                return res.status(404).json({error: `Group with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // update group after id
router.put("/group/:id", async(req,res) => {
        try {
            const group = await Group.findByPk(req.params.id);
            if(group)
            {
                const updateGroup = await group.update(req.body);
                return res.status(200).json(updateGroup);
            }
            else {
                return res.status(404).json({error: `Group with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

        // get group/s for a certain user id
router.get("/group/user/:userId", async(req,res) => {
    try {
       // const {groupId} = req.query.groupId; 
       const userId = req.params.userId;

       const groups = await Group.findAll({
           // where: groupId ? { idGroup : { [Op.eq]: groupId } } : undefined
           where: { userId : userId }
        });
        return res.status(200).json(groups);
    } catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;