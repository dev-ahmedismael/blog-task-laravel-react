import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Metadata } from "next";
import AdbIcon from "@mui/icons-material/Adb";
import LoginForm from "@/src/components/forms/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};
export default function Login() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      padding={5}
    >
      <Paper sx={{ py: 5, width: { sm: "500px", xs: "100%" } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid size={12}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <AdbIcon sx={{ color: "primary.main", fontSize: 50 }} />
                <Typography variant="h4">Login</Typography>
              </Box>
            </Grid>

            <Grid size={12}>
              <LoginForm />
            </Grid>

            <Grid size={12}>
              <Typography variant="body2" textAlign={"center"}>
                Don&apos;t have an account?{" "}
              </Typography>
              <Link href="/register">
                <Typography textAlign={"center"} color={"text.secondary"}>
                  Create New Account
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}
