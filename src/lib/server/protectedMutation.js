"use server";

import { getToken } from "../core/token";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function protectedMutation(path, body = {}, method = "POST") {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: method,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
