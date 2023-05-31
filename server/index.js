const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//middleware

app.use(cors());
app.use(express.json());
//register and login routes
app.use("/auth", require("./routes/jwAuth"));

//login routes

app.use("/dashboard", require("./routes/dashboard"));

// CARTS

app.use("/cart", require("./routes/cart"))

app.use("/order", require("./routes/order"))

//ROUTES//
app.get("/user/:firstname", async (req, res) => {
    const {firstname} = req.params
    try {
        const name = await pool.query(`SELECT firstname FROM users WHERE firstname=${firstname}`)
        res.json(name.rows[0])
        
    } catch (err) {
        console.error(err.message)
    }
})

//create a product

//get all products
app.get("/products", async(req, res) => {
    try {
        const products = await pool.query(`SELECT * FROM products  ORDER BY type='newArrivals' DESC`);
        res.json(products.rows);
    } catch (err) {
        console.log(err.message)
        
    }
})



app.get("/product/:id", async (req, res) => {
    try{
        const { id } = req.params;
        
        const product = await pool.query(`SELECT * FROM products WHERE id = ${id}`)
        res.json(product.rows);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

  
// get the new arrivals of product

app.get("/newproducts", async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='newArrivals' LIMIT 5`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})

//get the title of new arrival
app.get("/type", async (req, res) => {
    try {
        const productType = await pool.query(`SELECT DISTINCT type FROM products WHERE type='newArrivals'`);
        res.json(productType.rows);
    } catch (err) {
        console.error(err.message);
        
    }
})



// get the trending product

app.get("/trending", async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='trending' LIMIT 5`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})

    //get by title
app.get("/trending", async (req, res) => {
    try {
        const productType = await pool.query(`SELECT DISTINCT type FROM products WHERE type='trending'`);
        res.json(productType.rows);
    } catch (err) {
        console.error(err.message);
        
    }
})



//Categories

//get all categories

app.get("/categories", async (req, res) => {
    try {
        const allCategories = await pool.query(`SELECT * FROM categories`);
        res.json(allCategories.rows);
    } catch (err) {
        console.log(err.message);
        
    }
})

//get a product by categories
app.get("/categories/:id", async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id)
        const catPro = await pool.query(`SELECT * FROM products 
        JOIN categories ON categories.id = products.cat_id
        WHERE products.cat_id =${id}`);
        res.json(catPro.rows);        
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
})

app.get("/search/:title", async(req, res) => {
    try {
        const { title } = req.query;
        //specify the column

        const search = await pool.query("SELECT * FROM products WHERE 'title' || ' ' || 'desc' LIKE $1",[`%${title}%`] );

         res.json(search.rows);
        
    } catch (err) {
        console.error(err.message);        
    }
}  )



app.listen(5000, () =>{
    console.log("server has started on port 5000");
});
