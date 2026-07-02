import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Layout from "@/components/Layout";
import ExamCard from "@/components/ExamCard";
import { SkeletonCard } from "@/components/ui";
import { examsApi } from "@/lib/api";

const SubjectPage: NextPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const { data, isLoading, error } = useSWR(
    slug ? `subjects/${slug}/exams` : null,
    () => examsApi.bySubject(slug)
  );

  const subjectName =
    i18n.language === "bn" && data?.subject.namebn
      ? data.subject.namebn
      : data?.subject.name;

  return (
    <Layout>
      <Head>
        <title>
          {subjectName ?? t("common.loading")} — {t("common.appName")}
        </title>
        <meta name="description" content={`Practice exams for ${subjectName}`} />
      </Head>

      <div className="container-page">
        <Link
          href={data?.subject.divisionId ? `/division/${slug}` : "/divisions"}
          className="mb-6 inline-flex items-center gap-2 text-sm text-content-muted transition-colors duration-[250ms] hover:text-primary-400"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          {t("common.back")}
        </Link>

        {error && (
          <p className="text-center text-red-500">{t("common.error")}</p>
        )}

        {!isLoading && data && (
          <>
            <h1 className="mb-2 text-3xl font-extrabold text-white">
              {subjectName}
            </h1>
            <p className="mb-10 text-content-muted">
              {t("subject.availableExams")}
            </p>

            {data.exams.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.12] bg-surface p-12 text-center">
                <p className="text-content-muted">
                  {t("common.noResults")}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.exams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubjectPage;
