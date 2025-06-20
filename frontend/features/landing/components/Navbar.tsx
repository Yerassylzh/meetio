"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useDeviceType } from "@/context/DeviceTypeContext";
import PrimaryButton from "@/components/PrimaryButton";
import Button from "@/components/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { isMobile } = useDeviceType();
  const [isMobileNavbarOpened, setIsMobileNavbarOpened] =
    useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!isMobile) {
      setIsMobileNavbarOpened(false);
    }
  }, [isMobile, setIsMobileNavbarOpened]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex px-[40px] py-[17px]">
        <div className="gap-[10px] flex items-center justify-center">
          <Image width={30} height={30} src="/meetio.svg" alt="M" />
          <p className="text-blue-600 font-bold text-[24px] leading-[24px] tracking-[0.1px]">
            Meetio
          </p>
        </div>
        {!isMobile ? (
          <div className="flex items-center justify-end flex-1 gap-[25px]">
            <ThemeToggler />
            <Link
              href="#"
              className="font-medium text-[16px] !text-blue-500 pl-[18px]"
              target="_blank"
            >
              More
            </Link>
            <Link
              href="/login/"
              className="font-medium text-[16px] !text-blue-500 pl-[18px]"
            >
              Login
            </Link>
            <Link
              href="/signup/"
              className="font-medium text-[16px] !text-blue-500 pl-[18px]"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="w-full flex justify-end items-center">
            <button
              className="cursor-pointer"
              onClick={() => setIsMobileNavbarOpened((prev) => !prev)}
            >
              <Menu className="text-[var(--color-text)]" />
            </button>
          </div>
        )}
      </div>
      {isMobile && isMobileNavbarOpened && (
        <div
          className={`border-y-1 flex flex-col pt-[15px] gap-[15px] ${
            theme === "dark" ? "border-y-gray-700" : "border-y-gray-300"
          } py-[10px] animate-fade-in-up-fast`}
        >
          <div className="w-full flex flex-col items-start justify-start gap-[15px]">
            <div className="w-full pl-[18px]">
              <ThemeToggler />
            </div>
            <Link
              href="#"
              className="w-full font-medium text-[16px] !text-blue-500 pl-[18px]"
              target="_blank"
            >
              More
            </Link>
          </div>
          <div className="w-full flex gap-[20px] px-[10px]">
            <div className="flex flex-1">
              <Link href="/login/" className="w-full">
                <PrimaryButton className="w-full">Log in</PrimaryButton>
              </Link>
            </div>
            <div className="flex flex-1">
              <Link href="/signup/" className="w-full">
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
