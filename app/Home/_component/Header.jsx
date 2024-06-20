"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

function Header() {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 bg-slate-100 shadow-sm sticky z-10">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={50} height={10} />
        <span className="font-bold ">
          Interview <span className="text-bold text-blue-800">AI</span>
        </span>
      </div>

      <SignInButton />
      <SignUpButton />
    </div>
  );
}

export default Header;
