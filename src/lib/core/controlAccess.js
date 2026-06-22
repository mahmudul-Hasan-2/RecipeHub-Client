import { redirect } from "next/navigation";
import { getSession } from "./session";

export const controlAccess = async (role) => {
  const session = await getSession();
  const user = session?.user;

  if (user.role !== role) {
    redirect("/forbidden");
  }
};
