import express from 'express';
import Stripe from 'stripe';



const app = express();
const port = 3000;

const PUBLISHABLE_KEY = "pk_test_51L4SddBaAkz8QEc2Woi13XCaeAIcuk99H7YdaD7YCnMZuBv8nvpaC5blw9Vgqbm2TYE1LqVgi5ecJDaZmlE20KfS00iUhIae4W";
const SECRET_KEY = "sk_test_51L4SddBaAkz8QEc2Ey9kdfPmfmM12m3EWl1uXmumAATltZiGtZlK9fQyOzUEYEQTNUNWmNqAcInmJL6wSFagbx7Z00bQ0ZtVPs";

const stripe = Stripe(SECRET_KEY, {apiVersion: "2020-08-27"});

app.listen(port, () => {
    console.log(`Server up at http://localhost:${port}`);
});

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