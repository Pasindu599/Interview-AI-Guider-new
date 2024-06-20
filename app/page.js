"use client";
import Image from "next/image";

import React from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-slate-100 shadow-sm sticky z-10">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={50} height={10} />
          <span className="font-bold ">
            Interview <span className="text-bold text-blue-800">AI</span>
          </span>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => router.push("sign-in")}
            className="bg-blue-500 p-2 rounded-lg text-blue-900 font-bold"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("sign-up")}
            className="border border-black p-2 rounded-lg text-blue-900 font-bold"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className=" flex flex-grow  flex-col items-center justify-center mt-10 p-5">
        <h1 className="text-[30px] text-center font-bold lg:text-[50px]">
          Welcome to Interview AI
        </h1>
        <h2 className="text-center text-xs">
          The best place for your interview preparation
        </h2>
        <span className="text-center mx-5 lg:mx-[400px] mt-4 text-gray-500 border  p-3">
          Welcome to AI Interview Prep, where your journey to acing AI
          interviews begins. Our platform offers realistic interview simulations
          designed to mirror real-world scenarios used by top tech companies.
        </span>
        <img
          src="https://cdn-dkeek.nitrocdn.com/JJJmSmfNOVFIMRLxeOafUbjMfnGEpNvR/assets/static/optimized/rev-ccc93af/wp-content/uploads/2021/08/undraw_Working_re_ddwy-1-1024x608.png"
          alt="home"
          className="lg:w-[800px] h-[400px]"
        />
      </div>
    </div>
  );
}
