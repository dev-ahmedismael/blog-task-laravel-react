"use client";
import { Paper, Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import PostActionButtons from "./PostActionButtons";
import PostComments from "./PostComments";
import PostForm from "../forms/PostForm";
import ErrorSnackbar from "./ErrorSnackbar";
import api from "@/src/lib/api/api";
import React from "react";
import { CommentProps } from "./Comment";

export interface PostProps {
  id: number;
  title: string;
  body: string;
  author: {
    id: number;
    image: string;
    name: string;
    email: string;
  };
  tags: string[];
  updated_at: string;
  expires_at: string;
}

export default function Post({
  post,
  onUpdate,
}: {
  post: PostProps;
  onUpdate?: () => void;
}) {
  const [comments, setComments] = React.useState<CommentProps[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/posts/${post.id}/comments`);
        setComments(res.data.data);
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch comments");
      }
    };
    fetchComments();

    const expiryDate = new Date(post.expires_at.replace(" ", "T"));

    const now = new Date();

    if (expiryDate < now) {
      setIsExpired(true);
    }
  }, [post.id]);

  return (
    <>
      <Paper sx={{ p: 5, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h5" color="primary.main">
              {post.title}
            </Typography>
            <Typography variant="body2">
              Last updated: {post.updated_at}
            </Typography>
          </Box>
          <Box>
            <Box display={"flex"} justifyContent={"end"}>
              <PostActionButtons
                model={post}
                path="posts"
                editTitle="Edit post"
                editForm={<PostForm postId={post.id} />}
                onUpdate={onUpdate}
              />
            </Box>

            <Box display={"flex"} justifyContent={"end"}>
              <Typography color="error" sx={{ fontSize: "small" }}>
                {isExpired ? "Expired" : `Expires at: ${post.expires_at}`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar src={post.author.image} alt={post.author.name} />
          <Box>
            <Typography variant="body1" color="text.secondary">
              {post.author.name}
            </Typography>
            <Typography variant="body2">{post.author.email}</Typography>
          </Box>
        </Box>

        <Typography variant="body1">{post.body}</Typography>

        <Box display={"flex"} gap={2}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} color="primary" />
          ))}
        </Box>

        <Divider />

        <Typography variant="h6" color="primary.main">
          Comments
        </Typography>

        <PostComments postId={post.id} initialComments={comments} />
      </Paper>

      <ErrorSnackbar error={error} />
    </>
  );
}
