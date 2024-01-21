"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome to My landing</h1>
      <p>
        Here you can create a space for your clients to quickly find all your
        social links!
      </p>
      <Link className="mr-5 bg-red-600" href={"/signin"}>
        Login
      </Link>
      <Link href={"/signup"}>Register</Link>
    </>
  );
  // return <button onClick={() => signIn()}>Sign In</button>;
}
