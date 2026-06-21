import { headers } from "next/headers";
import { auth } from "../auth";

export const getToken = async () => {
  const requestHeaders = await headers();
  const jwt = await auth.api.getToken({
    headers: requestHeaders,
  });
  return jwt?.token || null;
};
