import { controlAccess } from "@/lib/core/controlAccess";
import React from "react";

const AdminLayout = ({ children }) => {
  controlAccess("admin");
  return children;
};

export default AdminLayout;
