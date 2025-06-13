"use client";

import { useCallback, useState } from "react";

export default function useToggle(
  initialValue: boolean | (() => boolean)
): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggleState];
}
