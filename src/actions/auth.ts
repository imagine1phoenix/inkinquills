"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  isAdminPasswordValid,
  setAdminSession,
} from "@/lib/admin-auth";

export type LoginState = { error: string };

export async function loginAdmin(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || !isAdminPasswordValid(password)) {
    return { error: "That password is not correct." };
  }

  try {
    await setAdminSession();
  } catch {
    return { error: "Admin authentication is not configured yet." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}