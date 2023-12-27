import * as z from 'zod';

export const AskSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must atleast be of 10 character(s)')
    .max(130),
  description: z.string().min(100),
  tags: z.array(z.string().min(3).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export const ProfileEditSchema = z.object({
  name: z.string().min(5).max(40),
  username: z.string().min(5).max(20),
  location: z.string().min(3).max(20),
  personalPage: z.string().url(),
  bio: z.string().min(10).max(150),
});
