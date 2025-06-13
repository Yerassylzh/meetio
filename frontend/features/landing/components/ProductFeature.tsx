import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  content: string;
}

export default function ProductFeature({ icon, title, content }: Props) {
  return (
    <div className="w-[min(350px,100vw)] flex flex-col gap-[16px] animate-fade-in-up">
      <div className="w-full flex gap-[16px] justify-start items-center">
        {icon}
        <p className="font-normal text-[18px] leading-[28px] tracking-[0px] text-blue-600">
          {title}
        </p>
      </div>
      <div className="w-full">
        <p className="font-normal text-[16px] leading-[28px] tracking-[0.1px] text-blue-600">
          {content}
        </p>
      </div>
    </div>
  );
}
