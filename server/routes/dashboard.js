const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');

router.get("/", authorization, async(req, res) => {
    try {
        //payload from authoriaztion has the user payload
        const user = await pool.query(`SELECT email FROM users WHERE user_id='${req.user}'`)
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

router.get("/user_id", authorization, async(req, res) => {
    try {
        //payload from authoriaztion has the user payload
        const user = await pool.query(`SELECT user_id FROM users WHERE user_id='${req.user}'`)
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});


module.exports = router;