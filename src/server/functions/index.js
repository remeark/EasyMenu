const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const app = express();

const SECRET_KEY = "sk_test_51L4SddBaAkz8QEc2Ey9kdfPmfmM12m3EWl1uXmumAATltZiGtZlK9fQyOzUEYEQTNUNWmNqAcInmJL6wSFagbx7Z00bQ0ZtVPs";

const stripe = require("stripe")(SECRET_KEY, {apiVersion: "2020-08-27"});

app.post("/create-payment-intent/:amount", async (req, res) => {
    var amount = parseFloat(req.params.amount).toFixed(2);
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount.replace('.', ''),
            currency: "brl",
            payment_method_types: ["card"], // by default   
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
        console.log(e.message);
        res.json({error: e.message});
    }
});

exports.api = functions.https.onRequest(app);


