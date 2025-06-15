"use client";

import FadeInWrapper from "@/components/FadeInWrapper";
import IconicButton from "@/components/IconicButton";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Navbar from "@/features/home/components/Navbar";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

function Home() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <div className="w-full min-h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center xl:w-[500px] md:w-[400px] w-[min(350px,95%)]">
          <FadeInWrapper>
            <Image
              src="/home.png"
              alt="Preview image"
              width={0}
              height={0}
              className="w-full"
              unoptimized
              priority
            />
            <div className="w-[200px]">
              <IconicButton
                text={"Create a room"}
                icon={
                  <PlusIcon size={17} className="text-[var(--color-text)]" />
                }
              />
            </div>
          </FadeInWrapper>
        </div>
      </div>
    </div>
  );
}
