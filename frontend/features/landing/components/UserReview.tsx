"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  content: string;
  icon_src: string;
  name: string;
  surname: string;
}

export default function UserReview({
  content,
  icon_src,
  name,
  surname,
}: Props) {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "border-gray-800" : "border-gray-100"
      } border rounded-[10px] flex-shrink-0 w-[350px] h-[450px] shadow-md p-[24px] flex flex-col justify-between items-start`}
    >
      <div className="w-full font-normal text-blue-600 text-[18px]">
        {content}
      </div>
      <div className="w-full flex flex-col items-start justify-evenly">
        <div className="rounded-[50%]">
          <Image src={icon_src} alt="I" width={60} height={60} />
        </div>
        <div className="text-[16px] text-blue-600">{name + " " + surname}</div>
        <div className="w-full flex justify-between items-center">
          <div className="text-[14px] text-blue-600">Description</div>
          <div className="flex gap-2">
            <FacebookIcon />
            <TwitterIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

const FacebookIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1172 0.600098H0.882759C0.395224 0.600098 0 0.995322 0 1.48286V15.7173C0 16.2049 0.395224 16.6001 0.882759 16.6001H8.55172V10.4125H6.46897V7.99044H8.55172V6.20837C8.55172 4.14217 9.81517 3.01665 11.6579 3.01665C12.2789 3.0153 12.8995 3.0466 13.5172 3.11044V5.27044H12.2483C11.2441 5.27044 11.0483 5.74493 11.0483 6.44561V7.98768H13.4483L13.1366 10.4098H11.0345V16.6001H15.1172C15.6048 16.6001 16 16.2049 16 15.7173V1.48286C16 0.995322 15.6048 0.600098 15.1172 0.600098Z"
        fill="#0065F2"
      />
    </svg>
  );
};

const TwitterIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.02601 15.6101C11.0636 15.6101 14.3673 10.6033 14.3673 6.26877C14.3673 6.12791 14.3673 5.98705 14.3609 5.8462C15.0012 5.38521 15.5582 4.80258 16 4.14311C15.411 4.40562 14.7771 4.57849 14.1112 4.66172C14.7899 4.25836 15.3085 3.6117 15.5582 2.84339C14.9244 3.22115 14.2201 3.49005 13.471 3.63731C12.8691 2.99706 12.0176 2.6001 11.0764 2.6001C9.26451 2.6001 7.79192 4.07269 7.79192 5.88461C7.79192 6.14071 7.82393 6.39041 7.87515 6.63371C5.14766 6.49926 2.72749 5.18673 1.10764 3.20194C0.82593 3.68853 0.665866 4.25196 0.665866 4.8538C0.665866 5.99345 1.2485 6.99866 2.12565 7.58769C1.58784 7.56849 1.08203 7.42123 0.640256 7.17793C0.640256 7.19073 0.640256 7.20354 0.640256 7.22275C0.640256 8.81058 1.77351 10.1423 3.27171 10.4432C2.9964 10.5201 2.70828 10.5585 2.40736 10.5585C2.19608 10.5585 1.9912 10.5393 1.79272 10.5009C2.20888 11.807 3.42537 12.7546 4.85954 12.7802C3.73269 13.6637 2.31773 14.1887 0.781112 14.1887C0.518607 14.1887 0.256102 14.1759 0 14.1439C1.44698 15.0659 3.17567 15.6101 5.02601 15.6101Z"
        fill="#0065F2"
      />
    </svg>
  );
};
