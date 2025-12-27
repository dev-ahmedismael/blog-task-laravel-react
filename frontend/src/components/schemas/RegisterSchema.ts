import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Email is invalid").nonoptional("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password confirmation is required"),
    image: z.file("Image is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof RegisterSchema>;
