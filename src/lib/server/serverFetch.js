"use server";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function serverFetch(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  return response.json();
}
