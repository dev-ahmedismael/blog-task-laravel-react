"use client";
import api from "@/src/lib/api/api";
import React, { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import Comment, { CommentProps } from "./Comment";
import { Grid, Button, Box } from "@mui/material";
import CommentForm from "../forms/CommentForm";
import CommentSkeleton from "../skeletons/CommentSkeleton";

interface PostCommentsProps {
  postId: number;
  initialComments: CommentProps[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function PostComments({
  postId,
  initialComments,
}: PostCommentsProps) {
  const { data, setSize, isValidating, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.length === 0) return null;
      return `/posts/${postId}/comments?page=${pageIndex + 1}`;
    },
    fetcher,
    {
      fallbackData: [
        {
          data: initialComments,
        },
      ],
    }
  );

  const comments = useMemo(
    () => (data ? data.flatMap((page) => page.data) : []),
    [data]
  );

  const isReachingEnd =
    data &&
    data[data.length - 1]?.meta?.current_page ===
      data[data.length - 1]?.meta?.last_page;

  const handleUpdate = () => {
    mutate();
  };

  return (
    <>
      <CommentForm postId={postId} onSuccess={handleUpdate} />

      {isValidating &&
        Array.from({ length: 3 }).map((_, i) => (
          <Box key={`comment-skeleton-${i}`} mt={1}>
            <CommentSkeleton />
          </Box>
        ))}

      <Grid container spacing={1}>
        {comments.map((comment: CommentProps) => (
          <Grid size={12} key={comment.id}>
            <Comment
              comment={comment}
              postId={postId}
              onUpdate={handleUpdate}
            />
          </Grid>
        ))}
      </Grid>

      {!isReachingEnd && (
        <Box textAlign="center">
          <Button onClick={() => setSize((s) => s + 1)} disabled={isValidating}>
            {isValidating ? "Loading..." : "Show more"}
          </Button>
        </Box>
      )}
    </>
  );
}
