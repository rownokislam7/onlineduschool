import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const SignIn: NextPage = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace((router.query.next as string) ?? "/");
    }
  }, [user, loading, router]);

  return (
    <Layout hideFooter={false}>
      <Head>
        <title>Sign In — {t("common.appName")}</title>
        <meta name="description" content="Sign in to ExamMania with Google" />
      </Head>

      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="surface-card animate-slide-up p-10 shadow-glow-sm">
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 shadow-glow-sm">
                <AcademicCapIcon className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">
                {t("common.appName")}
              </h1>
              <p className="mt-1 text-sm text-content-muted">
                {t("common.tagline")}
              </p>
            </div>

            <hr className="mb-8 border-white/[0.08]" />

            <p className="mb-6 text-center text-sm text-content-secondary">
              {t("auth.signInRequired")}
            </p>

            <div className="flex justify-center">
              <GoogleSignInButton
                onSuccess={() => router.replace((router.query.next as string) ?? "/")}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;
