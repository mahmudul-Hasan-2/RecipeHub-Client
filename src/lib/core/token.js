import { headers } from "next/headers";
import { auth } from "../auth";

export const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};
