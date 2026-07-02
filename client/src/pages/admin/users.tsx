import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import {
  UserCircleIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import { Badge, Skeleton } from "@/components/ui";
import { adminApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { User } from "@/types";

const AdminUsersPage: NextPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: users, isLoading } = useSWR<(User & { _count?: { attempts: number } })[]>(
    user?.role === "ADMIN" ? "admin/users" : null,
    adminApi.users
  );

  if (user?.role !== "ADMIN") {
    return (
      <Layout>
        <div className="container-page text-center">
          <p className="text-red-500">{t("auth.adminRequired")}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{t("admin.users")} — {t("common.appName")}</title>
      </Head>

      <div className="container-page">
        <div className="mb-8">
          <Link
            href="/admin"
            className="link-accent text-sm hover:underline"
          >
            ← {t("admin.dashboard")}
          </Link>
          <h1 className="mt-1 text-2xl font-extrabold text-white">
            {t("admin.users")}
          </h1>
          <p className="mt-1 text-sm text-content-muted">
            Click on any student to view their full exam history.
          </p>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/[0.08] bg-surface-secondary">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    User
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    Exams Taken
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-white">
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {isLoading
                  ? [1, 2, 3].map((i) => (
                      <tr key={i}>
                        <td colSpan={6} className="px-6 py-3">
                          <Skeleton className="h-8 w-full" />
                        </td>
                      </tr>
                    ))
                  : users?.map((u) => (
                      <tr
                        key={u.id}
                        className="transition-colors duration-[250ms] hover:bg-white/[0.03]"
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {u.avatarUrl ? (
                              <Image
                                src={u.avatarUrl}
                                alt={u.name}
                                width={36}
                                height={36}
                                className="rounded-full flex-shrink-0"
                              />
                            ) : (
                              <UserCircleIcon className="h-9 w-9 flex-shrink-0 text-content-muted" />
                            )}
                            <span className="font-semibold text-white">
                              {u.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-content-muted">{u.email}</td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <Badge variant={u.role === "ADMIN" ? "blue" : "gray"}>{u.role}</Badge>
                        </td>

                        {/* Attempts count */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-content-secondary">
                            <ClipboardDocumentListIcon className="h-4 w-4 text-content-muted" />
                            <span className="font-medium">
                              {(u as User & { _count?: { attempts: number } })._count?.attempts ?? 0}
                            </span>
                          </div>
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-4 text-content-muted">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-BD", {
                                dateStyle: "medium",
                              })
                            : "—"}
                        </td>

                        {/* View history link */}
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/students/${u.id}`}
                            className="btn-secondary px-3 py-1.5 text-xs"
                          >
                            View History
                            <ChevronRightIcon className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsersPage;
