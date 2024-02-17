"use client";
import { useEffect, useState } from "react";

import { createUser } from "@/services/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged } from "../../utils/constants/firebase";
import { usersCollection } from "@/utils/constants/constants";
import useErrors from "@/utils/hooks/useErrors";
import firebaseErrorRename from "@/utils/constants/firebaseErrorRename";
import Link from "next/link";
import { addProfileData, createFirestoreUser, signUp } from "@/lib/auth";
import ShowPasswordButton from "@/components/ShowPasswordButton";

export default function page() {
  const router = useRouter();
  const { errorMessage, errorCode, setErrors, resetErrors } = useErrors(
    (state) => state
  );

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  useEffect(() => {
    resetErrors();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // window.location.replace("http://localhost:3000/home");
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
    //Capitalize first and last name
    data.firstName =
      data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
    data.lastName =
      data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
    try {
      //Create the user
      const userCredential = await signUp(data.email, data.password1);
      const { user } = userCredential;

      //Add the user first and last name to firebase auth database
      await addProfileData(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      //Create the file in firestore for the user
      await createFirestoreUser(user.uid, {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      });

      window.location.replace("http://localhost:3000/home");
    } catch (err) {
      setErrors({
        errorCode: err.code,
        errorMessage: firebaseErrorRename(err.code),
      });

      console.log(err.message);
    }
  };

  const toggleShowPassword1 = (e) => {
    setShowPassword1((prev) => !prev);
  };

  const toggleShowPassword2 = (e) => {
    setShowPassword2((prev) => !prev);
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
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6 ${
                    errors.firstName && "ring-red-500 focus:outline-red-500"
                  }`}
                  placeholder="John"
                  {...register("firstName", {
                    minLength: {
                      value: 1,
                      message: "The name cannot be blank",
                    },
                    maxLength: { value: 15, message: "The name is too long" },
                    required: { value: true, message: "The name is required" },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "The name is not valid",
                    },
                  })}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 mb-2">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6 ${
                    errors.lastName && "ring-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Doe"
                  {...register("lastName", {
                    minLength: {
                      value: 1,
                      message: "The last name cannot be blank",
                    },
                    maxLength: {
                      value: 15,
                      message: "The last name is too long",
                    },
                    required: {
                      value: true,
                      message: "The last name is required",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "The last name is not valid",
                    },
                  })}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 mb-2">{errors.lastName.message}</p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6 ${
                    errors.username && "ring-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Johndoe63"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "The username is required",
                    },
                    minLength: {
                      value: 1,
                      message: "The username cannot be blank",
                    },
                    maxLength: {
                      value: 15,
                      message: "The username is too long",
                    },
                    pattern: {
                      value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                      message:
                        "The username cannot contain spaces or special characters",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 mb-2">{errors.username.message}</p>
              )}
            </div>

            <div className="mb-2">
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
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6  ${
                    errors.email && "ring-red-500 focus:outline-red-500"
                  }`}
                  placeholder="Johndoe@gmail.com"
                  {...register("email", {
                    required: { value: true, message: "The email is required" },
                    minLength: {
                      value: 1,
                      message: "The email cannot be blank",
                    },
                    maxLength: { value: 30, message: "The email is too long" },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "The email is not valid",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 mb-2">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password1"
                  name="password1"
                  type={showPassword1 ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6  ${
                    errors.password1 && "ring-red-500 focus:outline-red-500"
                  }`}
                  {...register("password1", {
                    required: {
                      value: true,
                      message: "The password is required",
                    },
                    minLength: {
                      value: 8,
                      message:
                        "The password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 25,
                      message:
                        "the password must be a maximum of 25 characters",
                    },
                  })}
                />
                <ShowPasswordButton
                  toggleShowPassword={toggleShowPassword1}
                  showPassword={showPassword1}
                />
              </div>
              {errors.password1 && (
                <p className="text-red-500 mb-2">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password2"
                  name="password2"
                  type={showPassword2 ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm  mb-2  sm:leading-6  ${
                    errors.password2 && "ring-red-500 focus:outline-red-500"
                  }`}
                  {...register("password2", {
                    required: {
                      value: true,
                      message: "The password confirmation is required",
                    },
                    validate: {
                      confirmPassword: (value) =>
                        value === watch("password1") ||
                        "The passwords do not match",
                    },
                  })}
                />
                <ShowPasswordButton
                  toggleShowPassword={toggleShowPassword2}
                  showPassword={showPassword2}
                />
              </div>
              {errors.password2 && (
                <p className="text-red-500 mb-2">{errors.password2.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-4 hover:bg-primaryDarker"
              >
                Sign in
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 bg-red-200 rounded-sm mx-auto w-full text-center py-2 mt-5">
                {errorMessage}
              </p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className="font-semibold leading-6 text-primary hover:text-primaryDarker "
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </form>

      {errorMessage && (
        <p className="text-red-500 mx-auto w-2/6 text-center mt-3">
          {errorMessage}
        </p>
      )}
    </>
  );
}
