"use server";

import { getToken } from "../core/token";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function protectedFetch(path) {
  const token = await getToken();
  console.log("token", token);
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.json();
  
}
