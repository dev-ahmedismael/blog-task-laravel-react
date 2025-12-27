"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const SnackbarContext = React.createContext<any>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarState["severity"] = "success"
  ) => {
    setState({ open: true, message, severity });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={3000}
        onClose={() => setState((s) => ({ ...s, open: false }))}
      >
        <Alert severity={state.severity} variant="standard">
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => React.useContext(SnackbarContext);
