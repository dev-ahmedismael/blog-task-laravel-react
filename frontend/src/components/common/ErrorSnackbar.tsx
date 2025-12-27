"use client";
import { useSnackbar } from "@/src/context/SnackbarContext";
import React from "react";

export default function ErrorSnackbar({ error }: { error: string | null }) {
  const { showSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error]);
  return <></>;
}
