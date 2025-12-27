import { Button } from "@mui/material";
import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  label: string;
  icon?: React.ReactNode;
}

export default function SubmitButton({
  loading,
  label,
  icon,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      loading={loading}
      loadingPosition="start"
      startIcon={icon}
    >
      {label}
    </Button>
  );
}
