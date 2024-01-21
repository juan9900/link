"use client";
import Spinner from "@/components/Spinner";
import { useFirebaseAuthState } from "@/utils/hooks/useFirebaseAuthState";
import { useUserData } from "@/utils/hooks/useUserData";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function page() {
  const { userAuthData, isLoading } = useFirebaseAuthState();
  const { userData, isLoadingUserData } = useUserData(
    userAuthData?.uid || null
  );

  useEffect(() => {
    // You may want to add additional checks or actions here based on userData or isLoadingUserData
    console.log(userData);
  }, [userData, isLoadingUserData]);
  // const { userData, isLoadingUserData } = useUserData(userAuthData.uid);
  console.log(userAuthData);
  return (
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
        userData && <p>User data: {JSON.stringify(userData)}</p>
      )}
    </div>
  );
}
