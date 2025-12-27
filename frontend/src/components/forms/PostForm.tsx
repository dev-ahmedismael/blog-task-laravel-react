"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import api from "@/src/lib/api/api";
import { AxiosError } from "axios";
import { useSnackbar } from "@/src/context/SnackbarContext";
import SubmitButton from "../common/SubmitButton";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import React from "react";
import { PostSchema } from "../schemas/PostSchema";

interface PostFormProps {
  postId?: number;
  onSuccess?: () => void;
}
export default function PostForm({ postId, onSuccess }: PostFormProps) {
  const { showSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      title: "",
      body: "",
      tags: [],
    },
    resolver: zodResolver(PostSchema),
  });

  const onSubmit = async (values: PostSchema) => {
    if (postId) {
      api
        .put(`/posts/${postId}`, values)
        .then(() => {
          showSnackbar("Post updated successfully", "success");
        })
        .catch((err: AxiosError<any>) => {
          showSnackbar(
            err.response?.data?.message ?? "Something went wrong",
            "error"
          );
        });
      return;
    } else {
      api
        .post("/posts", values)
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
    }
  };

  React.useEffect(() => {
    if (postId) {
      api
        .get(`/posts/${postId}`)
        .then((res) => {
          methods.reset({
            title: res.data.data.title,
            body: res.data.data.body,
            tags: res.data.data.tags,
          });
        })
        .catch((err: AxiosError<any>) => {
          showSnackbar(
            err.response?.data?.message ?? "Something went wrong",
            "error"
          );
        });
    }
  }, [postId, methods, showSnackbar]);

  return (
    <Box component={"form"} onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Controller
            name="title"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="standard"
                label="Title"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="body"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="standard"
                multiline
                rows={6}
                label="Your Post"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="tags"
            control={methods.control}
            render={({ field, fieldState }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={field.value || []}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tags"
                    placeholder="Add tag and press Enter"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <SubmitButton
            label={postId ? "Update Post" : "Add Post"}
            loading={methods.formState.isLoading}
            icon={<InsertCommentOutlinedIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
