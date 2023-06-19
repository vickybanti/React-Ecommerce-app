const router = require("express").Router();
const pool = require("../db");


// app.get("/search", async(req, res)=>{
//     try {
//         //product_title, cat_title
//         const {title} = req.query;
//         res.redirect(`/search-results?query=${encodeURIComponent(searchQuery)}`);

//         const product_search = await pool.query(` SELECT * FROM products
//         WHERE title ILIKE '%${title}%' `);
//         res.json(product_search.rows);
//     } catch (error) {
//         console.error(error.message)
//     }
// })


