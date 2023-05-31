const router  = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../middleware/validator.js")
const authorization = require("../middleware/authorization")


//registering

router.post("/register",validator, async(req,res) => {
    try {
        //destructure the req.body(name, email, password)
        const {firstname,lastname,address, email, password} = req.body

        const user =  await pool.query("SELECT * FROM users WHERE email = $1",[email]);

        if (user.rows.length > 0) {
            return res.status(401).send("user already exists");
        
        }

        //bcrypt the password

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter a new user


        const newUser = await pool.query(`INSERT INTO users (firstname, lastname, password, email, address) VALUES ('${firstname}', '${lastname}', '${bcryptPassword}' ,'${email}','${address}') RETURNING*`);

        //generating a user token

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
        
    }

   
});

//login route

router.post("/login", validator, async (req, res) => {
    try {
        //destructuring the req.body
        const {email, password} = req.body;


        //check if user doesn't exist

        const user  = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
        if (user.rows.length === 0) {
            return res.status(500).json("email is incorrect")
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {

            return res.status(401).json("Invalid password");
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
        
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;