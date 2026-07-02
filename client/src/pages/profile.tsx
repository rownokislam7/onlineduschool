import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import {
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui";
import { usersApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { Attempt, Division } from "@/types";
import ExamHistory from "@/components/ExamHistory";

const ProfilePage: NextPage = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  const { data: history, isLoading: histLoading } = useSWR<Attempt[]>(
    user ? `history/${user.id}` : null,
    () => usersApi.history(user!.id)
  );

  const { data: divisions, isLoading: divLoading } = useSWR<Division[]>(
    "divisions",
    () => fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/divisions`, { credentials: "include" }).then((r) => r.json()).then((j) => (j.data as Division[]) ?? [])
  );

  const isLoading = histLoading || divLoading;
  const totalAttempts = history?.length ?? 0;

  if (!loading && !user) {
    return (
      <Layout>
        <div className="container-page text-center">
          <p className="text-content-muted">{t("auth.signInRequired")}</p>
          <Link href="/auth/signin" className="btn-primary mt-4 inline-block px-5 py-2 text-sm">{t("nav.signIn")}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{user?.name ?? t("profile.title")} — {t("common.appName")}</title>
        <meta name="description" content={`${user?.name}'s exam history on ExamMania`} />
      </Head>
      <div className="container-page">
        {user && (
          <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" aria-labelledby="profile-heading">
            <div className="flex items-center gap-5">
              {user.avatarUrl ? (
                <Image src={user.avatarUrl} alt={user.name} width={80} height={80} className="flex-shrink-0 rounded-full ring-4 ring-primary-500/20" />
              ) : (
                <UserCircleIcon className="h-20 w-20 flex-shrink-0 text-content-muted" />
              )}
              <div>
                <h1 id="profile-heading" className="text-2xl font-extrabold text-white">{user.name}</h1>
                <p className="mt-0.5 text-sm text-content-muted">{user.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant={user.role === "ADMIN" ? "blue" : "gray"}>{user.role}</Badge>
                  {user.createdAt && <span className="text-xs text-content-muted">Joined {new Date(user.createdAt).toLocaleDateString("en-BD", { month: "long", year: "numeric" })}</span>}
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-3xl font-extrabold text-primary-400">{totalAttempts}</p>
              <p className="text-xs font-medium text-content-muted">Exams Taken</p>
            </div>
          </section>
        )}

        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="mb-6 text-xl font-bold text-white">{t("profile.history")}</h2>

          <ExamHistory history={history} divisions={divisions} loading={isLoading} emptyMessage={t("profile.noHistory")} />
        </section>
      </div>
    </Layout>
  );
};

export default ProfilePage;
