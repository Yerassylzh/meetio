import { useTheme } from "@/context/ThemeContext";
import cls from "@/utils/ClassSplitterByTheme";
import { ReactNode } from "react";

export default function IconicButton({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={cls(
        theme,
        "w-full flex items-center justify-center cursor-pointer rounded-[5px] px-[12px] py-[6px] gap-[10px] border shadow-sm",
        "border-gray-300 hover:bg-gray-100",
        "border-gray-600 hover:bg-gray-950"
      )}
    >
      {icon}
      <p
        className={cls(
          theme,
          "text-[14px] leading-[24px] tracking-[0.1px]",
          "text-gray-600",
          "text-gray-400"
        )}
      >
        {text}
      </p>
    </div>
  );
}
