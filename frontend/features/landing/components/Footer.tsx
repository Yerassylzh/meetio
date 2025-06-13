"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  Mail,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Figma,
} from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`text-blue-600 px-6 py-12 border-t ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-col lg:flex-row justify-between items-start gap-10">
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-xl font-bold">Meetio</h2>
          <div className="flex gap-6">
            <a target="_blank" href="https://github.com/Yerassylzh/meetio">
              <Instagram className="w-6 h-6" />
            </a>
            <a target="_blank" href="https://github.com/Yerassylzh/meetio">
              <Linkedin className="w-6 h-6" />
            </a>
            <a target="_blank" href="https://github.com/Yerassylzh/meetio">
              <Github className="w-6 h-6" />
            </a>
            <a target="_blank" href="https://github.com/Yerassylzh/meetio">
              <Youtube className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://www.figma.com/design/W7V9XhQwvDiUOT2MyiKvcj/Design?node-id=0-1&t=ZDTB9QTtTq7UfRAA-1"
            >
              <Figma className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full sm:max-w-md">
          <h3 className="text-base font-semibold">Subscribe</h3>
          <form
            className={`flex rounded-md overflow-hidden border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <input
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-2 rouned-md text-[var(--color-text)] placeholder-blue-500 focus:outline-none`}
            />
            <button
              type="submit"
              className="px-4 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 text-blue-600" />
            </button>
          </form>
          <p className="text-sm text-blue-600 leading-snug">
            Join our newsletter to stay up to date on features and releases
          </p>
        </div>
      </div>
    </footer>
  );
}
