import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui";
import { adminHistoryApi, adminApi, divisionsApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { Attempt, Division, User } from "@/types";
import ExamHistory from "@/components/ExamHistory";

const AdminStudentHistoryPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const { user: adminUser } = useAuth();

  const { data: history, isLoading: histLoading } = useSWR<Attempt[]>(
    userId && adminUser?.role === "ADMIN" ? `admin/students/${userId}/history` : null,
    () => adminHistoryApi.studentHistory(userId)
  );

  const { data: divisions, isLoading: divLoading } = useSWR<Division[]>(
    "divisions",
    () => divisionsApi.list()
  );

  const isLoading = histLoading || divLoading;
  const totalAttempts = history?.length ?? 0;

  if (adminUser?.role !== "ADMIN") {
    return (
      <Layout>
        <div className="container-page text-center">
          <p className="text-red-500">{t("auth.adminRequired")}</p>
        </div>
      </Layout>
    );
  }

  const { data: allUsers } = useSWR<User[]>(
    adminUser?.role === "ADMIN" ? "admin/users-list" : null,
    () => adminApi.users()
  );

  const student = allUsers?.find((u) => u.id === userId);

  return (
    <Layout>
      <Head>
        <title>
          {student?.name ?? "Student"} History — {t("common.appName")}
        </title>
      </Head>

      <div className="container-page">
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/admin" className="link-accent hover:underline">
            Dashboard
          </Link>
          <span className="text-content-muted">/</span>
          <Link href="/admin/users" className="link-accent hover:underline">
            Users
          </Link>
          <span className="text-content-muted">/</span>
          <span className="text-content-secondary">
            {student?.name ?? "Student"} History
          </span>
        </div>

        <section
          className="surface-card mb-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Student profile"
        >
          <div className="flex items-center gap-5">
            {student?.avatarUrl ? (
              <Image
                src={student.avatarUrl}
                alt={student.name}
                width={72}
                height={72}
                className="flex-shrink-0 rounded-full ring-4 ring-primary-500/20"
              />
            ) : (
              <UserCircleIcon className="h-16 w-16 flex-shrink-0 text-content-muted" />
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">
                  {student?.name ?? "Loading…"}
                </h1>
                <Badge variant="yellow">Viewing as Admin</Badge>
              </div>
              <p className="mt-0.5 text-sm text-content-muted">
                {student?.email ?? ""}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="gray">STUDENT</Badge>
                {student?.createdAt && (
                  <span className="text-xs text-content-muted">
                    Joined{" "}
                    {new Date(student.createdAt).toLocaleDateString("en-BD", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center sm:text-right">
              <p className="text-3xl font-extrabold text-primary-400">
                {totalAttempts}
              </p>
              <p className="text-xs font-medium text-content-muted">Exams Taken</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="student-history-heading">
          <h2 id="student-history-heading" className="mb-6 text-xl font-bold text-white">
            Exam History
          </h2>

          <ExamHistory history={history} divisions={divisions} loading={isLoading} emptyMessage="This student hasn't taken any exams yet." />
        </section>

        <div className="mt-10">
          <Link href="/admin/users" className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Users
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminStudentHistoryPage;
