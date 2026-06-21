import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { allPricingId, stripe } from "../../../lib/stripe";
import { getSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();

    const pricingName = formData.get("pricing-name");
    const pricingId = allPricingId[pricingName];

    const data = await getSession();

    const user = data?.user;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      metadata: { pricingId },
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: pricingId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
