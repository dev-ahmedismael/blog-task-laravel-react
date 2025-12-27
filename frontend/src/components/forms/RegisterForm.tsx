"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField } from "@mui/material";
import api from "@/src/lib/api/api";
import { useSnackbar } from "@/src/context/SnackbarContext";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { AvatarUpload } from "../common/AvatarUpload";
import SubmitButton from "../common/SubmitButton";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "@/src/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { setUser } = useAuth();
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      image: undefined,
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);

      if (values.image) {
        formData.append("image", values.image);
      }

      await api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await api.get("/me").then((res) => {
        setUser(res.data.data);
      });

      router.push("/");
    } catch (err: any) {
      showSnackbar(
        err.response?.data?.message ?? "Something went wrong",
        "error"
      );
    }
  };

  return (
    <Box component={"form"} onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            pb={3}
          >
            <AvatarUpload name="image" control={methods.control} />
          </Box>
        </Grid>

        <Grid size={12}>
          <Controller
            name="name"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>

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
          <Controller
            name="password_confirmation"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password Confirmation"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <SubmitButton
            label="Create Account"
            loading={methods.formState.isLoading}
            icon={<LoginIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
