import { Skeleton, Paper, Box } from "@mui/material";

export default function PostSkeleton() {
  return (
    <Paper sx={{ p: 5 }}>
      <Skeleton variant="text" height={40} width="60%" />
      <Skeleton variant="text" width="40%" />
      <Box display="flex" gap={2} mt={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="30%" />
      </Box>
      <Skeleton variant="rectangular" height={120} sx={{ mt: 2 }} />
    </Paper>
  );
}
