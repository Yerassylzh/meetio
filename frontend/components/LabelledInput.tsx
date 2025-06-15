import { useTheme } from "@/context/ThemeContext";
import cls from "@/utils/ClassSplitterByTheme";

export default function LabelledInput({
  label,
  inputWidget,
}: {
  label: string;
  inputWidget: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[6px]">
      <p
        className={cls(theme, "text-[14px]", "text-gray-800", "text-gray-100")}
      >
        {label}
      </p>
      {inputWidget}
    </div>
  );
}
