"use server";

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@/generated/prisma";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function submitAudition(formData: FormData) {
  const codename = formData.get("codename")?.toString();
  const email = formData.get("email")?.toString();
  const role = formData.get("role")?.toString();
  const fixation = formData.get("fixation")?.toString();
  const manifesto = formData.get("manifesto")?.toString();

  if (!codename || !email || !role || !fixation || !manifesto) {
    throw new Error("Missing required fields");
  }

  try {
    await prisma.audition.create({
      data: {
        codename,
        email,
        role,
        fixation,
        manifesto,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to save audition:", error);
    return { success: false, error: "Database error" };
  }
}
