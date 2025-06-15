export default function cls(
  theme: "dark" | "light",
  clsDefault: string,
  clsLight: string,
  clsDark: string
): string {
  return clsDefault + " " + (theme === "light" ? clsLight : clsDark);
}
