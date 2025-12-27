"use client";
import { IconButton, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import CustomDialog from "./CustomDialog";
import PostForm from "../forms/PostForm";

export default function CreatePostButton({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Tooltip title="Create Post">
        <IconButton
          onClick={openDialog}
          size="large"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 500,
            bgcolor: "primary.main",
            color: "white",
            ":hover": { bgcolor: "primary.dark" },
          }}
        >
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>{" "}
      <CustomDialog
        title={"Create Post"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <PostForm onSuccess={onSuccess} />
      </CustomDialog>
    </React.Fragment>
  );
}
