"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAudition(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const fixation = formData.get("fixation") as string;
  const manifesto = formData.get("manifesto") as string;

  if (!name || !email || !role || !fixation || !manifesto) {
    return { success: false, error: "All fields are required" };
  }

  try {
    await prisma.audition.create({
      data: {
        name,
        email,
        role,
        fixation,
        manifesto,
      },
    });
    
    revalidatePath("/auditions");
    return { success: true };
  } catch (error) {
    console.error("Error submitting audition:", error);
    return { success: false, error: "Failed to submit audition" };
  }
}
