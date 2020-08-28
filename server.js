const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // It is a native module and boundled with node and we don`t need to define it in packages.json

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // to keep secret the key we need to add this line

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);// We have access to this because of the above line
  

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());// this middleware change all the requsts to json automatically
app.use(bodyParser.urlencoded({ extended: false }));// this mdlwre escapes all special chatacters that are not allowed as URL
app.use(cors());// this mdlwre accept all request that are not from the same origin, if we donot this, all requests from diffrent websites will be denied due to cross-origin error

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
  });
  
  app.post('/payment', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };
  
    stripe.charges.create(body, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
        res.status(200).send({ success: stripeRes });
      }
    });
  });