import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SignupFormSchema = z
  .object({
    name: z.string().min(3, { message: "Name too short" }),
    username: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .regex(/[@#$%^&*]/, { message: "Username must contain a special character" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .regex(/[@#$%^&*]/, { message: "Password must contain a special character" }),
    confirmpassword: z.string(),
    image: z
      .any()
      .refine(
        (file) => file instanceof File,
        "Please upload a valid image file."
      )
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export const SinginFormSchema = z.object({
  email: z.string().email({ message: "Email is Invalid" }),
  password: z.string().min(6, { message: "Password too Short" })
});

