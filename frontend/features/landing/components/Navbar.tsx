"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";
import useToggle from "@/hooks/useToggle";
import IconicInput from "@/components/IconicInput";
import { XIcon } from "lucide-react";
import { useDeviceType } from "@/context/DeviceTypeContext";
import PrimaryButton from "@/components/PrimaryButton";
import Button from "@/components/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { isMobile } = useDeviceType();
  const [isMobileNavbarOpened, setIsMobileNavbarOpened] =
    useState<boolean>(false);
  const [isSearching, toggleIsSearching] = useToggle(false);
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
            {isSearching ? (
              <div className="w-[200px] animate-fade-in-right-fast">
                <IconicInput
                  placeholder="Search"
                  icon={
                    <XIcon
                      className="cursor-pointer text-blue-500 absolute mr-1"
                      onClick={toggleIsSearching}
                    />
                  }
                />
              </div>
            ) : (
              <Image
                width={24}
                height={24}
                src={"/search.svg"}
                alt="Search"
                onClick={toggleIsSearching}
                className="hover:cursor-pointer animate-fade-in-right-fast"
              />
            )}
          </div>
        ) : (
          <div className="w-full flex justify-end items-center">
            <button
              className="cursor-pointer"
              onClick={() => setIsMobileNavbarOpened((prev) => !prev)}
            >
              <HamburgerIcon />
            </button>
          </div>
        )}
      </div>
      {isMobile && isMobileNavbarOpened && (
        <div
          className={`border-y-1 flex flex-col gap-[20px] ${
            theme === "dark" ? "border-y-gray-700" : "border-y-gray-300"
          } py-[10px] animate-fade-in-up-fast`}
        >
          <div className="w-full flex items-center justify-evenly">
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
            {isSearching ? (
              <div className="w-[200px] animate-fade-in-right-fast">
                <IconicInput
                  placeholder="Search"
                  icon={
                    <XIcon
                      className="cursor-pointer text-blue-500 absolute mr-1"
                      onClick={toggleIsSearching}
                    />
                  }
                />
              </div>
            ) : (
              <Image
                width={24}
                height={24}
                src={"/search.svg"}
                alt="Search"
                onClick={toggleIsSearching}
                className="hover:cursor-pointer animate-fade-in-right-fast"
              />
            )}
          </div>
          <div className="w-full flex gap-[20px] px-[10px]">
            <div className="flex flex-1">
              <PrimaryButton className="w-full">Log in</PrimaryButton>
            </div>
            <div className="flex flex-1">
              <Button className="w-full">Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const HamburgerIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      color="var(--color-text)"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  );
};
