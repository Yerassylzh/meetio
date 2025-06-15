"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggler from "@/components/ThemeToggler";
import IconicButton from "@/components/IconicButton";
import { GoogleIcon, GithubIcon } from "@/features/landing/components/Svgs";
import cls from "@/utils/ClassSplitterByTheme";
import Link from "next/link";
import SignupForm from "@/features/authentication/components/form/SignupForm";
import OAuthForm from "@/features/authentication/components/form/OAuthForm";

export default function Page() {
  const { theme } = useTheme();

  return (
    <div className="w-full bg-[var(--color-bg)] min-h-screen flex items-center justify-center">
      <div
        className={`w-[min(400px,100%)] rounded-[12px] m-2 shadow-lg border-[1px] ${
          theme === "dark"
            ? "border-gray-700 bg-gray-950"
            : "border-gray-300  bg-gray-100"
        }`}
      >
        <div
          className={`w-full flex flex-col gap-[10px] md:px-[40px] px-[30px] ${
            theme === "dark" ? "bg-black" : "bg-white"
          } py-[25px] rounded-[14px]`}
        >
          <div className="w-full flex items-center justify-start">
            <ThemeToggler />
          </div>
          <div className="w-full flex items-center justify-center gap-[4px]">
            <Image src="/meetio.svg" alt="M" width={30} height={30} />
            <p className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-blue-600">
              Meetio
            </p>
          </div>
          <div className="w-full text-[var(--color-text)] flex justify-center pt-[18px] text-[17px] leading-[24px] tracking-[0.1px]">
            Create your account
          </div>
          <div className="w-full flex justify-center font-normal text-[13px] leading-[11px] tracking-[0.1px] text-gray-500">
            Welcome! Please fill in the details to get started.
          </div>
          <OAuthForm />
          <div className="w-full flex items-center my-[14px] text-gray-500">
            <div
              className={cls(
                theme,
                "flex-grow border-t ",
                "border-gray-300",
                "border-gray-600"
              )}
            />
            <span className="px-4 text-sm">or</span>
            <div
              className={cls(
                theme,
                "flex-grow border-t ",
                "border-gray-300",
                "border-gray-600"
              )}
            />
          </div>
          <SignupForm />
        </div>
        <div className="w-full flex items-center justify-center p-[15px] gap-1">
          <p
            className={cls(
              theme,
              "text-[14px]",
              "text-gray-600",
              "text-gray-500"
            )}
          >
            Already have an account?
          </p>
          <Link
            href="/login/"
            className={cls(
              theme,
              "text-[14px]",
              "!text-gray-800",
              "!text-gray-100"
            )}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
