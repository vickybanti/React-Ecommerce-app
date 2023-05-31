const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const jwToken = req.header("token");
        if(!jwToken) {
            return req.status(401).send("Not authorized");
        }
        //check for a valid jwttoken. payload returns an object to be used within the routes
        const payload = jwt.verify(jwToken, process.env.jwtSecret);
        //uss the payload to request for the user token and access everythi in the routes
        req.user = payload.user;
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Unathorized user");
    }
    next(); 
}