"use client"

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";


export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname.startsWith("/dashboard");

  return !hideNavbar ? <Navbar /> : null;
}