import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
