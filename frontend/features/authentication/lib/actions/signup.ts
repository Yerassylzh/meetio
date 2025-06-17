"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "./session";
import { redirect } from "next/navigation";
import { hashPassword } from "@/utils/passwords";
import { User } from "@/types/db";

const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .regex(/^\S+$/, { message: "Must be a single word with no spaces" })
    .trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function signup(prevState: object, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      formData: Object.fromEntries(formData),
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;
  const passwordHash = hashPassword(password);

  const existingUser: User = (await prisma.user.findUnique({
    where: { email: email },
  })) as User;

  if (existingUser) {
    if (existingUser.password === null) {
      return {
        formData: Object.fromEntries(formData),
        errors: {
          name: [],
          password: [],
          email: ["This email is already linked to Github or Google"],
        },
      };
    }
    return {
      formData: Object.fromEntries(formData),
      errors: {
        name: [],
        password: [],
        email: ["User with this handle already exists"],
      },
    };
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });

  const duration = 7 * 24 * 60 * 60 * 1000;
  await createSession({ name: user.name, email: user.email }, duration);

  redirect("/");
}
