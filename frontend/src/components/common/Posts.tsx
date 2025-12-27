"use client";
import Post, { PostProps } from "@/src/components/common/Post";
import { Grid, Box } from "@mui/material";
import api from "@/src/lib/api/api";
import useSWRInfinite from "swr/infinite";
import { useEffect, useMemo, useRef } from "react";
import CreatePostButton from "./CreatePostButton";
import PostSkeleton from "../skeletons/PostSkeleton";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Posts({
  initialPosts,
  path,
}: {
  initialPosts: PostProps[];
  path: string;
}) {
  const { data, setSize, isValidating, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.data.length === 0) return null;
      return `/${path}?page=${pageIndex + 1}`;
    },
    fetcher,
    {
      fallbackData: [
        {
          data: initialPosts,
        },
      ],
      revalidateOnFocus: true,
    }
  );

  const flatPosts = useMemo(
    () => (data ? data.flatMap((page) => page.data) : []),
    [data]
  );

  const isReachingEnd = data && data[data.length - 1]?.data.length === 0;

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || isReachingEnd) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isValidating) {
        setSize((s) => s + 1);
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isReachingEnd, isValidating, setSize]);

  const handleUpdate = () => {
    mutate();
  };

  return (
    <>
      <Grid container spacing={3}>
        {flatPosts.map((post) => (
          <Grid key={post.id} size={12}>
            <Post post={post} onUpdate={handleUpdate} />
          </Grid>
        ))}

        {isValidating &&
          !isReachingEnd &&
          Array.from({ length: 3 }).map((_, i) => (
            <Grid key={`skeleton-${i}`} size={12}>
              <PostSkeleton />
            </Grid>
          ))}
      </Grid>

      <Box ref={loaderRef} height={20} />

      <CreatePostButton onSuccess={handleUpdate} />
    </>
  );
}
