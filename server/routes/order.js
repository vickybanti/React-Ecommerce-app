const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



//GET ALL ORDERS
router.get("/:userId", authorization, async(req, res) => {
    const userId = req.user
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM orders WHERE user_id = ${userId}`);
        res.json(newOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//UPDATE ORDER STATUS

router.post("/:userId", authorization, async(req, res) => {
    const userId = req.user
    try {
        //payload from authoriaztion has the user payload
        const updateOrder = await pool.query(`UPDATE orders SET(delivery_status="delivered" WHERE user_id=${userId})
WHERE user_id=${user_id} RETURNING *`)
        res.json(updateOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

router.get("/month", async(req, res) => {
    const month = new Date().getMonth();
    try {
        const getIncome = await pool.query(`SELECT SUM(amount) FROM orders GROUP BY month LIMIT 2`)
        res.json(getIncome.rows)
        
        
    } catch (err) {
        console.error(err.message)
    }
})
//DELETE 

module.exports = router;