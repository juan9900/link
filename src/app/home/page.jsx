"use client";
import { useContext, useEffect } from "react";

import Spinner from "@/components/Spinner";
import { AuthContext } from "@/providers/authProvider";
import { useFirebaseAuthState } from "@/utils/hooks/useFirebaseAuthState";
import { useUserData } from "@/utils/hooks/useUserData";

import PhonePreview from "@/components/PhonePreview";
import LinksListContainer from "@/components/LinksListContainer";

export default function page() {
  const { userAuthData, isLoading } = useFirebaseAuthState();
  const { userData, isLoadingUserData, userLinks, setUserLinks } = useUserData(
    userAuthData?.uid || null
  );
  const authData = useContext(AuthContext);

  if (authData === null) {
    return <p>Loading</p>;
  }

  return (
    <>
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
          <div className="flex flex-row justify-between items-start mt-14 min-h-full">
            <LinksListContainer
              userLinks={userLinks}
              setUserLinks={setUserLinks}
            />
            <PhonePreview userLinks={userLinks} />
          </div>
        )}
      </div>
    </>
  );
}
