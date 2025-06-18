"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  deleteSession,
} from "@/features/authentication/lib/actions/session";
import { redirect } from "next/navigation";
import { hashPassword } from "@/utils/passwords";
import { User } from "@/types/db";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

type Errors = {
  name?: string[];
  email: string[];
  password?: string[];
};

export async function login(prevState: object, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      formData: Object.fromEntries(formData),
      errors: result.error.flatten().fieldErrors as Errors,
    };
  }

  const { email, password } = result.data;
  const passwordHash = await hashPassword(password);

  const user: User = (await prisma.user.findUnique({
    where: { email: email },
  })) as User;

  const isOAuth = user && user.password === null;
  if (isOAuth) {
    return {
      formData: Object.fromEntries(formData),
      errors: {
        email: ["This email is linked to Github or Google"],
        password: [],
      },
    };
  }

  if (!user || user.password !== passwordHash) {
    return {
      formData: Object.fromEntries(formData),
      errors: {
        email: [],
        password: ["Invalid handle or password"],
      },
    };
  }

  const days90 = 90 * 24 * 60 * 60 * 1000;
  await createSession({ name: user.name, email: user.email }, days90);

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function createIfDoesnotExist(email: string, name: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: email,
        name: name || "",
      },
    });
  }
}
