"use client";

import { useTheme } from "@/context/ThemeContext";
import useToggle from "@/hooks/useToggle";
import { Ref, useCallback, useRef } from "react";

interface Props {
  question: string;
  answer: string;
}

export default function FAQuesion({ question, answer }: Props) {
  const [opened, toggleOpened] = useToggle(false);
  const iconRef = useRef<SVGSVGElement | null>(null);

  const handleOpen = useCallback(() => {
    iconRef?.current?.classList.toggle("rotate-90");
    toggleOpened();
  }, [toggleOpened]);

  const { theme } = useTheme();

  return (
    <div
      className={`border-b ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      } flex-col gap-2`}
    >
      <div
        className="w-full cursor-pointer py-[15px] flex justify-center items-center"
        onClick={handleOpen}
      >
        <div className="flex flex-1 text-[18px] leading-[28px] text-blue-600">
          {question}
        </div>
        <div className="">
          <button className="cursor-pointer">
            <RightArrowIcon ref={iconRef} />
          </button>
        </div>
      </div>
      {opened && (
        <div className="text-[18px] leading-[28px] text-blue-600 pb-[20px] animate-fade-in-up-fast">
          {answer}
        </div>
      )}
    </div>
  );
}

const RightArrowIcon = ({ ref }: { ref: Ref<SVGSVGElement> | undefined }) => {
  return (
    <svg
      ref={ref}
      width="14"
      height="23"
      viewBox="0 0 14 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6.6001L9 11.6001L4 16.6001"
        stroke="#0065F2"
        strokeWidth="1.5"
      />
    </svg>
  );
};
