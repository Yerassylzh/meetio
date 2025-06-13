"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

interface DeviceTypeContextType {
  isMobile: boolean;
}

const DeviceTypeContext = createContext<DeviceTypeContextType>(
  {} as DeviceTypeContextType
);

// Import this component dynamically since it uses "window" variable
export function DeviceTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return window.innerWidth < 768;
  });

  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <DeviceTypeContext.Provider
      value={{
        isMobile: isMobile,
      }}
    >
      {children}
    </DeviceTypeContext.Provider>
  );
}

export const useDeviceType = (): DeviceTypeContextType => {
  const context = useContext<DeviceTypeContextType>(DeviceTypeContext);
  if (!context) {
    throw new Error("useDeviceType must be used within a <DeviceTypeProvider>");
  }
  return context;
};
