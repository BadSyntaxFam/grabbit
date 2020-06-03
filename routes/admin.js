const router = require("express").Router()

router.get("/*", (req, res, next) => {
    
    //For all admin endpoints check if session has admin role
    if (req.session.user && req.session.user.role == "admin") {

        //Proceed to request specific endpoint
        next()
    }
    else {
        
        //Send back 401 status (Unauthorized)
        res.status(401).send("You're not authorized to be here!")
    }
})

router.get("/dashboard", (req, res) => {

    //Render admin dashboard
    res.status(200).render("admin/dashboard.ejs", { session: req.session })
})

router.get("/dashboard/users", (req, res) => {

    //Render admin dashboard
    res.status(200).render("admin/dashboard_users.ejs", { session: req.session })
})

module.exports = router