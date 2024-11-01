import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";

export function ThemeProvider({ children }: any) {
  return <MTThemeProvider>{children}</MTThemeProvider>;
}

export default ThemeProvider;
