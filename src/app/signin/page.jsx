"use client";
import { useEffect } from "react";

import { createUser } from "@/services/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../../utils/constants/firebase";
import Link from "next/link";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // router.push("/home");
        // ...
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
    signInWithEmailAndPassword(auth, data.email, data.password1)
      .then(() => {
        window.location.replace("http://localhost:3000/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <h1 className="text-3xl font-bold  text-blue-700 uppercase text-center mt-5">
        Sign in
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mx-auto w-3/6">
          {/* register your input into the hook by invoking the "register" function */}
          <label>Email</label>
          <input
            className="border-2 border-blue-400 rounded-md   mb-4 mt-1 px-3 py-2  text-black-500"
            defaultValue="juanluislauretta@gmail.com"
            {...register("email")}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <label>Password</label>
          <input
            defaultValue="123456"
            className="border-2 border-blue-400 rounded-md   mb-4 mt-1 px-3 py-2 text-black-500"
            {...register("password1", { required: true })}
          />

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input
            value={"Login"}
            type="submit"
            className="cursor-pointer hover:bg-green-800 bg-green-400 text-white font-bold uppercase w-fit px-6  py-1 rounded-md mx-auto"
          />
        </div>
      </form>
      <Link href={"/signup"}>Doesn't have an account? Create one here</Link>
    </>
  );
}
