"use client";
import { useSession } from "next-auth/react";

export default function page() {
  return (
    <>
      <h1>Protected Page</h1>
      <p>You are watching this page because you're logged in</p>
    </>
  );
}
