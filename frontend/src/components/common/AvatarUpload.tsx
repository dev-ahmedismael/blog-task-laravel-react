"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { Controller, Control } from "react-hook-form";
import { Typography } from "@mui/material";

type AvatarUploadProps = {
  name: string;
  control: Control<any>;
};

export function AvatarUpload({ name, control }: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <ButtonBase
            component="label"
            sx={{
              borderRadius: "50%",
              "&:has(:focus-visible)": {
                outline: "2px solid",
                outlineOffset: "2px",
              },
            }}
          >
            <Avatar src={preview} sx={{ width: 80, height: 80 }} />

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                field.onChange(file);

                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              }}
            />
          </ButtonBase>

          {fieldState.error && (
            <Typography color="error" variant="caption">
              {fieldState.error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
}
