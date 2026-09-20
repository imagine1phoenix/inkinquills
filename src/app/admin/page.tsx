import { readAdminCollection } from "@/actions/admin";
import AdminDashboard from "@/components/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [stories, events, books] = await Promise.all([
    readAdminCollection("stories"),
    readAdminCollection("events"),
    readAdminCollection("books"),
  ]);

  return <AdminDashboard initialData={{ stories, events, books }} />;
}