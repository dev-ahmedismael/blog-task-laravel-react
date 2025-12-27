import RegisterForm from "@/src/components/forms/RegisterForm";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import AdbIcon from "@mui/icons-material/Adb";

export const metadata: Metadata = {
  title: "Register",
};
export default function Register() {
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
                <Typography variant="h4">Create New Account</Typography>
              </Box>
            </Grid>

            <Grid size={12}>
              <RegisterForm />
            </Grid>

            <Grid size={12}>
              <Typography variant="body2" textAlign={"center"}>
                Already have an account?{" "}
              </Typography>
              <Link href="/login">
                <Typography textAlign={"center"} color={"text.secondary"}>
                  Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}
