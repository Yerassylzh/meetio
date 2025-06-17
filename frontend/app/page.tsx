"use client";

import FadeInWrapper from "@/components/FadeInWrapper";
import IconicButton from "@/components/IconicButton";
import SpinnerSvg from "@/components/SpinnerSvg";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/features/home/components/Navbar";
import { getNewRoomId } from "@/features/meet/lib/actions";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

function Home() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isCreating === false) {
      return;
    }

    const wrapper = async () => {
      const newRoomId = await getNewRoomId();
      router.push(`/meet/${newRoomId}`);
    };
    wrapper();
  }, [isCreating, router]);

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
            <div
              className="w-[200px]"
              onClick={() => {
                setIsCreating(true);
              }}
            >
              <IconicButton
                text={"Create a room"}
                icon={
                  isCreating ? (
                    <SpinnerSvg size={17} color="var(--color-text)" />
                  ) : (
                    <PlusIcon size={17} className="text-[var(--color-text)]" />
                  )
                }
              />
            </div>
          </FadeInWrapper>
        </div>
      </div>
    </div>
  );
}
