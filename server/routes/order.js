const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/:user_id",authorization, async(req, res) => {
    const {id} = req.params
    const {user_id} = req.params
    const {count} = req.params
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`INSERT INTO orders (user_id, product_id,count)
        VALUES (${user_id}, ${id}, ${count})`)
        res.json(newOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//GET orders by user
router.get("/:user_id", authorization, async(req, res) => {
    const {user_id} = req.params
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM products
        JOIN orders ON orders.product_id = products.id WHERE user_id =${user_id}`)
        res.json(newOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//UPDATE ORDER

router.put("/:user_id", authorization, async(req, res) => {
    const {id} = req.params
    const {user_id} = req.params
    try {
        //payload from authoriaztion has the user payload
        const updateOrder = await pool.query(`UPDATE orders SET(product_id=${id})
WHERE user_id=${user_id} RETURNING *`)
        res.json(updateOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//DELETE 

module.exports = router;