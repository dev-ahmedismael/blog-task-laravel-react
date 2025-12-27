"use client";

import React, { useMemo, useState, createContext, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

function buildTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode: mode,
      primary: { main: blueGrey[500] },
      secondary: { main: mode === "dark" ? "#27272a" : "#f1f1f1" },
      background: {
        default: mode === "dark" ? "#000000" : "#f1f1f1",
        paper: mode === "dark" ? "#0e0e0e" : "#ffffff",
      },

      text: {
        primary: "#666666",
        secondary: mode === "dark" ? "#ffffff" : "#000000",
      },
    },

    typography: {
      fontFamily: "var(--font-geist-sans), sans-serif",
    },

    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {},
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            height: "3rem",
          },
        },
      },
    },
  });
}

const ThemeModeContext = createContext<{
  mode: "light" | "dark";
  toggleMode: () => void;
} | null>(null);

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside GlobalProvider");
  return ctx;
};

export default function GlobalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        {mounted && (
          <GlobalStyles
            styles={{
              body: {
                margin: 0,
                padding: 0,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                transition: "background-color 0.2s ease, color 0.2s ease",
              },
            }}
          />
        )}
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
