"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useDeviceType } from "@/context/DeviceTypeContext";
import PrimaryButton from "@/components/PrimaryButton";
import Button from "@/components/Button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { logout as logoutOAuth } from "@/features/authentication/lib/actions/oAuth";
import { logout } from "@/features/authentication/lib/actions/login";

export default function Navbar() {
  const { isMobile } = useDeviceType();
  const [isMobileNavbarOpened, setIsMobileNavbarOpened] =
    useState<boolean>(false);
  const { theme } = useTheme();
  const { isOAuth, user } = useAuth();

  useEffect(() => {
    if (!isMobile) {
      setIsMobileNavbarOpened(false);
    }
  }, [isMobile, setIsMobileNavbarOpened]);

  const logoutUser = useCallback(async () => {
    if (isOAuth) {
      await logoutOAuth();
    } else {
      await logout();
    }
  }, [isOAuth]);

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
            <p className="text-[16px] text-[var(--color-text)]">{user.name}</p>
            <Link
              href="#"
              className="font-medium text-[16px] !text-blue-500 pl-[18px]"
              target="_blank"
            >
              More
            </Link>
            <p
              className="font-medium text-[16px] !text-blue-500 pl-[18px] cursor-pointer"
              onClick={logoutUser}
            >
              Logout
            </p>
          </div>
        ) : (
          <div className="w-full flex justify-end items-center gap-4">
            <p className="text-[16px] text-[var(--color-text)]">{user.name}</p>
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
          </div>
          <div className="w-full flex gap-[20px] px-[10px]">
            <div className="flex flex-1">
              <Link href="/login/" className="w-full">
                <PrimaryButton onClick={logoutUser} className="w-full">
                  Logout
                </PrimaryButton>
              </Link>
            </div>
            <div className="flex flex-1">
              <Link href="/signup/" className="w-full">
                <Button className="w-full">More</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
