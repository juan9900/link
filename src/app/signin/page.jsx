"use client";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged } from "../../utils/constants/firebase";
import Link from "next/link";
import useErrors from "@/utils/hooks/useErrors";
import firebaseErrorRename from "@/utils/constants/firebaseErrorRename";
import { signIn } from "@/lib/auth";
import ShowPasswordButton from "@/components/ShowPasswordButton";
import { Button } from "@/components/ui/button";

export default function page() {
  const router = useRouter();
  const { errorMessage, errorCode } = useErrors((state) => state);
  const setErrors = useErrors((state) => state.setErrors);
  const resetErrors = useErrors((state) => state.resetErrors);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    //Clear the local storage data before a new user logs in
    localStorage.clear();

    resetErrors();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // router.push("/home");
        // ...
        window.location.replace("http://localhost:3000/home");
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    resetErrors();
    console.log(data);
    try {
      const userCredential = await signIn(data.email, data.password1);
      const { user } = userCredential;
      console.log(user);
      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("uid", user.uid);

      window.location.replace("http://localhost:3000/home");
    } catch (e) {
      console.log(e.message);
      setErrors({
        errorCode: e.code,
        errorMessage: firebaseErrorRename(e.code),
      });
    }
  };

  const toggleShowPassword = (e) => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto"
              src="linkHub-logo-solo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 mb-4"
                  defaultValue="juanluislauretta@gmail.com"
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="bg-white block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  defaultValue="12345678"
                  {...register("password1", { required: true })}
                />
                <ShowPasswordButton
                  toggleShowPassword={toggleShowPassword}
                  showPassword={showPassword}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-4 hover:bg-primaryDarker"
              >
                Sign in
              </Button>
            </div>

            {errorMessage && (
              <p className="text-red-500 bg-red-200 rounded-sm mx-auto w-full text-center py-2 mt-5">
                {errorMessage}
              </p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href={"/signup"}
                className="font-semibold leading-6 text-primary hover:text-primaryDarker "
              >
                Create your account here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
