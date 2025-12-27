"use client";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField } from "@mui/material";
import api from "@/src/lib/api/api";
import { AxiosError } from "axios";
import { useSnackbar } from "@/src/context/SnackbarContext";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import SubmitButton from "../common/SubmitButton";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { setUser } = useAuth();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginSchema) => {
    api
      .post("/login", values)
      .then(() => {
        api
          .get("/me")
          .then((res) => {
            setUser(res.data.data);
            router.push("/");
          })
          .catch((err: AxiosError<any>) => {
            showSnackbar(
              err.response?.data?.message ?? "Something went wrong",
              "error"
            );
          });
      })
      .catch((err: AxiosError<any>) => {
        showSnackbar(
          err.response?.data?.message ?? "Something went wrong",
          "error"
        );
      });
  };

  return (
    <Box component={"form"} onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="password"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <SubmitButton
            label="Login"
            loading={methods.formState.isLoading}
            icon={<LoginIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
