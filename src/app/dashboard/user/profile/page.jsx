import { getSession } from "@/lib/core/session";
import React from "react";

const ProfilePage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }
  return <div></div>;
};

export default ProfilePage;
