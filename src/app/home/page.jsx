"use client";
import LinksList from "@/components/LinksList";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/providers/authProvider";
import { useFirebaseAuthState } from "@/utils/hooks/useFirebaseAuthState";
import { useUserData } from "@/utils/hooks/useUserData";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";

export default function page() {
  const { userAuthData, isLoading } = useFirebaseAuthState();
  const { userData, isLoadingUserData } = useUserData(
    userAuthData?.uid || null
  );
  const authData = useContext(AuthContext);

  if (authData === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <p>{JSON.stringify(authData)}</p>

      <div className="m-5">
        {!isLoading && (
          <h1 className="font-black text-4xl">
            Welcome back {userAuthData?.displayName}
          </h1>
        )}
        {isLoadingUserData ? (
          <>
            <p>Loading user data...</p>
            <Spinner />
          </>
        ) : (
          <LinksList linksList={userData.links} />
        )}
      </div>
    </>
  );
}
