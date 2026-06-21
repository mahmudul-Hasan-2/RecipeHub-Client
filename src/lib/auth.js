import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("recipehub");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        defaultValue: "user",
      },
      isPremium: {
        defaultValue: false,
      },
      isBlocked: {
        defaultValue: false,
      },
    },
  },
  session: {
    cookieCache: { enabled: true, strategy: "jwt", maxAge: 60 * 60 * 24 * 30 }, // 30 days
  },

  plugins: [jwt()],
});
