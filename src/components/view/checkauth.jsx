"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function CheckAuth({ isAuthenticated, user, children }) {
  const pathname = usePathname(); // Current path in Next.js
  const router = useRouter(); // Navigation in Next.js

  useEffect(() => {
    let shouldRedirect = null;

    // Redirect logic for the root path
    if (pathname === "/") {
      if (!isAuthenticated) {
        shouldRedirect = "/auth/login";
      } else if (user?.role === "admin") {
        shouldRedirect = "/Admin/dashboard";
      } else {
        shouldRedirect = "/shop/home";
      }
    }

    // Redirect unauthenticated users for restricted paths
    if (
      !isAuthenticated &&
      !(pathname.includes("/login") || pathname.includes("/Register"))
    ) {
      shouldRedirect = "/auth/login";
    }

    // Redirect authenticated users away from login or register
    if (
      isAuthenticated &&
      (pathname.includes("/login") || pathname.includes("/Register"))
    ) {
      shouldRedirect = user?.role === "admin" ? "/Admin/dashboard" : "/shop/home";
    }

    // Restrict non-admin users from admin paths
    if (isAuthenticated && user?.role !== "admin" && pathname.includes("/Admin")) {
      shouldRedirect = "/not-found";
    }

    // Restrict admin users from shop paths
    if (isAuthenticated && user?.role === "admin" && pathname.includes("/shop")) {
      shouldRedirect = "/Admin/dashboard";
    }

    // Perform redirection if needed
    if (shouldRedirect) {
      router.push(shouldRedirect);
    }
  }, [pathname, isAuthenticated, user, router]); // Dependencies ensure the effect runs when these values change

  // Render children when no redirection occurs
  return <>{children}</>;
}

export default CheckAuth;
