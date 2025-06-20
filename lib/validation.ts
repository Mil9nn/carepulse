import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must be at most 30 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), {
    message: "Invalid phone number format.",
  }),
});

export const RegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must be at most 30 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), {
    message: "Invalid phone number format.",
  }),
});
