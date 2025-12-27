"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField } from "@mui/material";
import api from "@/src/lib/api/api";
import { AxiosError } from "axios";
import { useSnackbar } from "@/src/context/SnackbarContext";
import SubmitButton from "../common/SubmitButton";
import { CommentSchema } from "../schemas/CommentSchema";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import React from "react";

interface CommentFormProps {
  postId: number;
  commentId?: number;
  onSuccess?: () => void;
}
export default function CommentForm({
  postId,
  commentId,
  onSuccess,
}: CommentFormProps) {
  const { showSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(CommentSchema),
  });

  const onSubmit = async (values: CommentSchema) => {
    const formData = { ...values, post_id: postId };
    api
      .post("/comments", formData)
      .then(() => {
        methods.reset();
        onSuccess?.();
      })
      .catch((err: AxiosError<any>) => {
        showSnackbar(
          err.response?.data?.message ?? "Something went wrong",
          "error"
        );
      });
  };

  React.useEffect(() => {
    if (commentId) {
      api
        .get(`/comments/${commentId}`)
        .then((res) => {
          methods.setValue("body", res.data.data.body);
        })
        .catch((err: AxiosError<any>) => {
          showSnackbar(
            err.response?.data?.message ?? "Something went wrong",
            "error"
          );
        });
    }
  }, [commentId, methods, showSnackbar]);

  return (
    <Box component={"form"} onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container spacing={2} pt={1}>
        <Grid size={12}>
          <Controller
            name="body"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                multiline
                rows={3}
                label="Your comment"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <SubmitButton
            label={commentId ? "Update Comment" : "Add Comment"}
            loading={methods.formState.isLoading}
            icon={<InsertCommentOutlinedIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
