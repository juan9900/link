"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session, status } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button className="text-green-600" onClick={() => signIn()}>
      Sign In
    </button>
  );
};

export default SignInButton;
