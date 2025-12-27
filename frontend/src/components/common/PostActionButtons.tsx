"use client";
import { Box, Button, DialogActions, IconButton, Tooltip } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { PostProps } from "./Post";
import { CommentProps } from "./Comment";
import CustomDialog from "./CustomDialog";
import api from "@/src/lib/api/api";

export default function PostActionButtons({
  model,
  path,
  editTitle,
  editForm,
  onUpdate,
}: {
  model: PostProps | CommentProps;
  path: string;
  editTitle: string;
  editForm: React.ReactNode;
  onUpdate?: () => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
    setOpenEditForm(false);
    onUpdate?.();
  };

  const editModel = () => {
    setOpenEditForm(true);
  };

  const deleteModel = async () => {
    try {
      setLoading(true);
      await api.delete(`/${path}/${model.id}`);
      setLoading(false);
      closeDialog();
      onUpdate?.();
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      {model.author.id === user?.id && (
        <Box display={"flex"} gap={1}>
          <Tooltip title="Edit">
            <IconButton onClick={editModel}>
              <EditNoteOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => setOpen(true)}>
              <DeleteOutlineOutlinedIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <CustomDialog
        title="Are you sure you want to delete this?"
        open={open}
        onClose={closeDialog}
      >
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={deleteModel}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </CustomDialog>

      <CustomDialog title={editTitle} open={openEditForm} onClose={closeDialog}>
        {React.cloneElement(editForm as React.ReactElement<any>, {
          onSuccess: () => {
            closeDialog();
          },
        })}
      </CustomDialog>
    </>
  );
}
