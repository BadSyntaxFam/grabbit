const router = require("express").Router()
const User = require("../../models/User.js")

router.get("/*", (req, res, next) => {

    //Make sure every request is authenticated and has admin role 
    if (req.session.user && req.session.user.role == "admin") {

        //Proceed to request specific endpoint
        next()
    } 
    else {

        //Send back 401 status (Unauthorized)
        res.status(401).send("You're not authorized to be here!")
    }
})

router.get("/", async (req, res) => {

    //Query all users from database
    let users = await User.query()
        .select("user.username", "user.active", 
                "user.created_at", "role.role", 
                "information.first_name",
                "information.last_name",
                "information.email")
        .joinRelated("information")
        .joinRelated("role")

    if (users.length > 0) {

        //Set status code to 200
        res.status(200)
    } 
    else {

        //Set status code to 404 (Not Found)
        res.status(404)
    }

    res.json(users)
})

module.exports = router