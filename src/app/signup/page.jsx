"use client";
import { useEffect } from "react";

import { createUser } from "@/services/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  setDoc,
  getDoc,
  doc,
  db,
} from "../../utils/constants/firebase";
import { usersCollection } from "@/utils/constants/constants";

export default function page() {
  const router = useRouter();

  useEffect(() => {
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
    console.log(data);
    //Capitalize first and last name
    data.firstName =
      data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
    data.lastName =
      data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
    createUserWithEmailAndPassword(auth, data.email, data.password1)
      .then(async (userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${data.firstName} ${data.lastName}`,
        })
          .then(() => {
            console.log(`creating the doc in ${user.uid}`);
            setDoc(doc(db, usersCollection, user.uid), {
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
            }).then(() => {
              console.log("user created");
              // window.location.replace("http://localhost:3000/home");
            });
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log(errors);
  return (
    <>
      <h1 className="text-3xl font-bold  text-blue-700 uppercase text-center mt-5">
        Sign up
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mx-auto w-2/6">
          <label className="font-semibold mt-4 ">First name</label>
          <input
            className={`border-2 focus:outline-blue-800 ${
              errors.firstName && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2  text-black-500`}
            placeholder="John"
            defaultValue="John"
            {...register("firstName", {
              minLength: { value: 1, message: "The name cannot be blank" },
              maxLength: { value: 15, message: "The name is too long" },
              required: { value: true, message: "The name is required" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "The name is not valid",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
          <label className="font-semibold mt-4 ">Last name</label>
          <input
            className={`border-2 focus:outline-blue-800 ${
              errors.lastName && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2  text-black-500`}
            placeholder="Doe"
            defaultValue="Doe"
            {...register("lastName", {
              minLength: { value: 1, message: "The last name cannot be blank" },
              maxLength: { value: 15, message: "The last name is too long" },
              required: { value: true, message: "The last name is required" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "The last name is not valid",
              },
            })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}

          <label className="font-semibold mt-4 ">Username</label>
          <input
            className={`border-2 focus:outline-blue-800 ${
              errors.username && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2  text-black-500`}
            placeholder="Johndoe63"
            defaultValue="Johndoe63"
            {...register("username", {
              required: { value: true, message: "The username is required" },
              minLength: { value: 1, message: "The username cannot be blank" },
              maxLength: { value: 15, message: "The username is too long" },
              pattern: {
                value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                message:
                  "The username cannot contain spaces or special characters",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          {/* register your input into the hook by invoking the "register" function */}
          <label className="font-semibold mt-4 ">Email</label>
          <input
            className={`border-2 focus:outline-blue-800 ${
              errors.email && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2  text-black-500`}
            defaultValue="juanluislauretta@gmail.com"
            {...register("email", {
              required: { value: true, message: "The email is required" },
              minLength: { value: 1, message: "The email cannot be blank" },
              maxLength: { value: 30, message: "The email is too long" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "The email is not valid",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {/* include validation with required or other standard HTML validation rules */}
          <label className="font-semibold mt-4 ">Password</label>
          <input
            type="password"
            defaultValue="12345678"
            className={`border-2 focus:outline-blue-800 ${
              errors.password1 && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2 text-black-500`}
            {...register("password1", {
              required: { value: true, message: "The password is required" },
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
              maxLength: {
                value: 25,
                message: "the password must be a maximum of 25 characters",
              },
            })}
          />
          {errors.password1 && (
            <p className="text-red-500">{errors.password1.message}</p>
          )}
          <label className="font-semibold mt-4 ">Confirm password</label>
          <input
            type="password"
            defaultValue="12345678"
            className={`border-2 focus:outline-blue-800 ${
              errors.password2 && "border-red-500 focus:outline-red-500"
            } border-blue-400 rounded-md    mt-1 px-3 py-2 text-black-500`}
            {...register("password2", {
              required: {
                value: true,
                message: "The password confirmation is required",
              },
              validate: {
                confirmPassword: (value) =>
                  value === watch("password1") || "The passwords do not match",
              },
            })}
          />
          {errors.password2 && (
            <p className="text-red-500">{errors.password2.message}</p>
          )}
          <input
            disabled={Object.keys(errors).length > 0 && true}
            value={"register"}
            type="submit"
            className="disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer hover:bg-green-800 bg-green-400 text-white font-bold uppercase w-fit px-6  py-1 rounded-md mx-auto mt-4"
          />
        </div>
      </form>
    </>
  );
}
