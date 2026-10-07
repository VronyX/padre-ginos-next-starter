import { getCurrentUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import AdminNav from "./AdminNav";

export default async function AdminNavigation() {
  const user = await getCurrentUser();
  const canManageProducts = can(user, "products:manage");

  return <AdminNav canManageProducts={canManageProducts} />;
}