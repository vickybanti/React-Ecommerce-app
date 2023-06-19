const router = require("express").Router();
require("dotenv").config();
const express = require("express")
const pool = require("../db");
const authorization = require("../middleware/authorization")
const stripe = require("stripe")("sk_test_51NDulnFA3ATF2zMu8VuG068289VxPGuC2xFdTBQFWiX09vP7y1AWJOLRoxEjurV7gjjZw8WZpnXYAhcqX7qA5jze00afTsR0gt")

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.






router.post('/',async (req, res) => {


  //creating customers
  const customer = await stripe.customers.create({
    metadata:{
      userId : req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
      
    }
  })
    const cartItems = req.body
    console.log(cartItems)
    console.log(customer)
    const line_items = req.body.cartItems.map(item => (
          {
            price_data: {
                currency: 'usd',
                product_data: {
                  name: item.title,
                  description: item.desc,
                  image:[],
                  metadata:{
                    id:item.id
                  }
                },
                unit_amount: item.price *100,
              },
              quantity: item.count,
            }    
    )
    )
    
    const session = await stripe.checkout.sessions.create({ 
    
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'NG'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
          phone_number_collection: {
            enabled:true
          },
          customer: customer.id,
      line_items,     
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
    });
    
    res.send({url: session.url});
  });

  //stripe webhook

  // server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.


// This is your Stripe CLI webhook secret for testing your endpoint locally.
//Create order

const createOrder = async(customer,data) => {
  const items = JSON.parse(customer.metadata.cart);
  const allItems = JSON.stringify(items)
  const shipping = JSON.stringify(data.customer_details)
  const currentDate = new Date().toUTCString();
  const date = currentDate.slice(0, -7);

  
  try {
    const allOrders = await pool.query(`INSERT INTO orders(user_id,total,subtotal,customer_details,payment_status,delivery_status,date,cartitems,customer_id,payment_intent_id)
    VALUES ('${customer.metadata.userId}','${data.amount_total}', '${data.amount_subtotal}', '${shipping}'
    , '${data.payment_status}','pending','${date}','${allItems}','${data.customer}', '${data.payment_intent}')`)
    
    const newOrder =  allOrders.rows
    if(newOrder){
      console.log("Successful")
    }else{
      console.log("Error")
    }
  } catch (err) {
    console.error(err.message)
  }
}

const endpointSecret = "whsec_ea99f37947029a629717e424ea6de8ce5d78f490c39e6d1dca3901af4ffc445c";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {

  if(endpointSecret) {
    const sig = stripe.webhooks.generateTestHeaderString({
      payload: JSON.stringify(request.body),
      secret:"whsec_ea99f37947029a629717e424ea6de8ce5d78f490c39e6d1dca3901af4ffc445c",
    });

   
      const event = stripe.webhooks.constructEvent(JSON.stringify(request.body), sig, endpointSecret)
      console.log(event)
      console.log("Webhook verified")
    


    const data = event.data.object;
    const eventType = event.type
  
  //handle event

  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then(
      (customer)=> {
        console.log(customer)
        console.log("data:", data);
        createOrder(customer,data)
      }).catch(err => console.log(err.message))
    
  }
 

  // Handle the event
  

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
}
});

module.exports = router;