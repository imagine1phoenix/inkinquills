import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminCookieName = "inkinquills_admin";
const sessionLifetime = 60 * 60 * 8;

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function tokensMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminSession() {
  const payload = `${Date.now()}`;
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : null;
}

export function isValidAdminSession(value: string | undefined) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  const issuedAt = Number(payload);
  const expectedSignature = payload && sign(payload);

  return Boolean(
    expectedSignature &&
    signature &&
    Number.isFinite(issuedAt) &&
    Date.now() - issuedAt >= 0 &&
    Date.now() - issuedAt < sessionLifetime * 1000 &&
    tokensMatch(signature, expectedSignature),
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

export async function setAdminSession() {
  const session = createAdminSession();
  if (!session) throw new Error("ADMIN_SESSION_SECRET is not configured.");

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, session, {
    httpOnly: true,
    maxAge: sessionLifetime,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export async function requireAdminAuthentication() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Admin authentication required.");
  }
}

export function isAdminPasswordValid(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;
  return tokensMatch(password, configuredPassword);
}