import { readAdminCollection } from "@/actions/admin";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [stories, events, books] = await Promise.all([
    readAdminCollection("stories"),
    readAdminCollection("events"),
    readAdminCollection("books"),
  ]);

  return <AdminDashboard initialData={{ stories, events, books }} />;
}