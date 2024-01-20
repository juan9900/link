"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1>Welcome to My landing</h1>
      <p>
        Here you can create a space for your clients to quickly find all your
        social links!
      </p>
      <button onClick={() => signIn()}>Start journey</button>
    </>
  );
  // return <button onClick={() => signIn()}>Sign In</button>;
}
