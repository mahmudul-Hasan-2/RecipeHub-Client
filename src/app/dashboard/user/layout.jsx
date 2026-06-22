import { controlAccess } from "@/lib/core/controlAccess";
import React from "react";

const UserLayout = ({ children }) => {
  controlAccess("user");
  return children;
};

export default UserLayout;
