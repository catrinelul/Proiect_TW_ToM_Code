const User = require("../models/User"); 

const router = require("express").Router(); 


// CRUD pt User

    // get all users
router.get("/user", async (req,res) => {
        try{
        //    return res.status(200).json({message: "ok"});
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // create new user
router.post("/user",async(req,res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // get user after id
router.get("/user/:id", async (req,res) => {
        try{
            const user = await User.findByPk(req.params.id);
            if(user)
            {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({error: `User with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

    // update user after id
router.put("/user/:id", async(req,res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if(user)
            {
                const updateUser = await user.update(req.body);
                return res.status(200).json(updateUser);
            }
            else {
                return res.status(404).json({error: `User with id ${req.params.id} not found`});
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    });

// get user id for username and password inserted 
router.post("/logUser", async(req, res) => {
    try {
        const { inputUsername, inputPassword } = req.body;

        const user = await User.findOne({
            where : {
                username : inputUsername, 
                password : inputPassword
            }
        })

        return res.status(200).json(user);

    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;

