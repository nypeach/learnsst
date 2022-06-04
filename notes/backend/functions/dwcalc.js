// import Stripe from "stripe";
import handler from "../util/handler";
import { calculateDwCost } from "../util/dwcost";

export const main = handler(async (event) => {
  const { dwDetails } = JSON.parse(event.body);
  const dwCost = calculateDwCost(dwDetails);
  const description = "Your Digital Worker (DW) Cost";

  // Load or secret key from the environment variables
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // await stripe.charges.create({
  //   source,
  //   amount,
  //   description,
  //   currency: "usd",
  // });

  return { status: true, dwCost: dwCost, description: description };
});