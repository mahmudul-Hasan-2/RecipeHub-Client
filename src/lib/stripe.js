import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const allPricingId = {
  premiumUser: "price_1TkYXEBeE6Oekp8Nv1esXPra",
  recipe: "price_1TkU9fBeE6Oekp8NDvNYT30B",
};
