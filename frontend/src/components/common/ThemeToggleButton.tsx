"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useThemeMode } from "@/src/context/ThemeContext";

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode();

  const handleChange = () => {
    toggleMode();
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={mode}
      onChange={handleChange}
      size="small"
    >
      <ToggleButton value="light">
        <LightModeOutlinedIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="dark">
        <DarkModeOutlinedIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
