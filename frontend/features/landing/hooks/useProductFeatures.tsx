import React, { useMemo } from "react";
import { Feature1Icon, Feature2Icon, Feature3Icon } from "../components/Svgs";

interface FeatureObjectType {
  icon: React.JSX.Element;
  title: string;
  content: string;
}

export default function useProductFeatures(): FeatureObjectType[] {
  const productFeatures = useMemo(
    () => [
      {
        icon: <Feature1Icon />,
        title: "Fast & Effortless",
        content:
          "Create a link, share it, and you're in.\nNo installs, no sign-ups — just instant video meetings made simple.",
      },
      {
        icon: <Feature2Icon />,
        title: "Light or Dark",
        content:
          "Built-in theme toggler gives you control.\n Switch between light and dark mode to match your style or environment.",
      },
      {
        icon: <Feature3Icon />,
        title: "Works Everywhere",
        content:
          "Join from any device. Fully responsive and optimized for desktop, tablet, and mobile — no matter where you are.",
      },
    ],
    []
  );
  return productFeatures;
}
