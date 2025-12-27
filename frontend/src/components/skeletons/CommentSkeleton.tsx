"use client";
import { Box, Skeleton, Paper } from "@mui/material";

export default function CommentSkeleton() {
  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" gap={2} alignItems="center">
        <Skeleton variant="circular" width={32} height={32} />
        <Box flex={1}>
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
        </Box>
      </Box>
    </Paper>
  );
}
