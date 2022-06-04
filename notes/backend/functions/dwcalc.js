// import Stripe from "stripe";
import handler from "../util/handler";
import { calculateDwCost } from "../util/dwcost";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateDwCost(storage);
  const description = "Your Digital Worker (DW) Cost";

  // Load or secret key from the environment variables
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // await stripe.charges.create({
  //   source,
  //   amount,
  //   description,
  //   currency: "usd",
  // });

  return { status: true, amount: amount, description: description };
});