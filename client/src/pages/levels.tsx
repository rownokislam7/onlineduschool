import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";

const LevelsPage: NextPage = () => {
  const { t } = useTranslation();
  const levels = [
    {
      slug: "ssc",
      title: t("landing.ssc"),
      description: t("landing.sscDesc"),
      color: "level-card-ssc",
    },
    {
      slug: "hsc",
      title: t("landing.hsc"),
      description: t("landing.hscDesc"),
      color: "level-card-hsc",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>{t("landing.levelsTitle")} — {t("common.appName")}</title>
        <meta name="description" content={t("landing.subtitle")} />
      </Head>

      <div className="container-page">
        <h1 className="mb-4 text-3xl font-extrabold text-white">
          {t("landing.levelsTitle")}
        </h1>
        <p className="mb-10 text-content-muted">
          {t("landing.subtitle")}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {levels.map((level) => (
            <Link
              key={level.slug}
              href={`/levels/${level.slug}`}
              className={`level-card bg-gradient-to-br ${level.color} hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/50`}
            >
              <span className="mb-5 block text-sm font-semibold uppercase tracking-[0.3em] text-primary-300 leading-none">
                {t("landing.level")}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight">{level.title}</h2>
              <p className="mt-4 text-lg text-content-secondary">{level.description}</p>
              <div className="mt-8 inline-flex rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {t("landing.start")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LevelsPage;
