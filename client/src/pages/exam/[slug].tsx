"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";
import { ProgressBar, Button, Modal, Skeleton } from "@/components/ui";
import { examsApi, attemptsApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { Question } from "@/types";

const ExamPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { user } = useAuth();

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const pendingSavePromisesRef = useRef<Map<string, Promise<unknown>>>(new Map());

  const { data: exam, isLoading } = useSWR(
    slug ? `exam/${slug}` : null,
    () => examsApi.get(slug)
  );

  // ─── Start exam ──────────────────────────────────────────

  const handleStart = useCallback(async () => {
    if (!user) {
      router.push(`/auth/signin?next=/exam/${slug}`);
      return;
    }
    try {
      const attempt = await examsApi.start(slug);
      setAttemptId(attempt.id);

      let qs = exam?.questions ?? [];
      if (exam?.randomize) {
        qs = [...qs].sort(() => Math.random() - 0.5);
      }
      setQuestions(qs);
      setStarted(true);
    } catch {
      toast.error("Could not start the exam. Please try again.");
    }
  }, [user, slug, exam, router]);

  // ─── Auto-save answer ────────────────────────────────────

  const handleAnswer = useCallback(
    (questionId: string, answer: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }));

      if (!attemptId) return;
      const savePromise = attemptsApi
        .save(attemptId, questionId, answer)
        .catch(() => {})
        .finally(() => {
          pendingSavePromisesRef.current.delete(questionId);
        });

      pendingSavePromisesRef.current.set(questionId, savePromise);
    },
    [attemptId]
  );

  // ─── Submit exam ─────────────────────────────────────────

  const doSubmit = useCallback(async () => {
    if (!attemptId) return;
    setSubmitting(true);
    setShowConfirm(false);
    try {
      await Promise.all(pendingSavePromisesRef.current.values());
      await attemptsApi.submit(attemptId);
      router.push(`/result/${attemptId}`);
    } catch {
      toast.error("Submission failed. Please try again.");
      setSubmitting(false);
    }
  }, [attemptId, router]);

  const handleTimerExpire = useCallback(() => {
    toast(t("exam.autoSubmit"), { icon: "⏰", duration: 5000 });
    doSubmit();
  }, [doSubmit, t]);

  // ─── Loading / start screen ──────────────────────────────

  if (isLoading) {
    return (
      <Layout>
        <div className="container-page space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!exam) {
    return (
      <Layout>
        <div className="container-page text-center">
          <p className="text-content-muted">{t("common.notFound")}</p>
        </div>
      </Layout>
    );
  }

  if (!started) {
    return (
      <Layout>
        <Head>
          <title>{exam.title} — {t("common.appName")}</title>
        </Head>
        <div className="container-page flex justify-center">
          <div className="surface-card w-full max-w-xl p-10 text-center">
            <h1 className="mb-2 text-2xl font-extrabold text-white">{exam.title}</h1>
            <p className="mb-6 text-sm text-content-muted">
              {exam.questions.length} questions · {exam.timeLimitMin} minutes
              {exam.randomize && " · Randomised"}
            </p>
            <Button size="lg" onClick={handleStart} className="w-full">
              {t("subject.startExam")}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // ─── Active exam ─────────────────────────────────────────

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <Layout hideFooter>
      <Head>
        <title>{exam.title} — {t("common.appName")}</title>
      </Head>

      {/* Top bar */}
      <div className="sticky top-16 z-30 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex-1">
            <p className="text-xs font-medium text-content-muted">
              {t("exam.question", { current: currentIdx + 1, total: questions.length })}
            </p>
            <ProgressBar value={progress} />
          </div>
          <Timer
            totalSeconds={exam.timeLimitMin * 60}
            onExpire={handleTimerExpire}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {currentQ && (
          <QuestionCard
            question={currentQ}
            answer={answers[currentQ.id]}
            onChange={(ans) => handleAnswer(currentQ.id, ans)}
          />
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            {t("exam.previous")}
          </Button>

          <span className="text-sm text-content-muted">
            {answeredCount}/{questions.length} answered
          </span>

          {currentIdx < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
            >
              {t("exam.next")}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setShowConfirm(true)}
              loading={submitting}
            >
              {t("exam.submitExam")}
            </Button>
          )}
        </div>

        {/* Question dots */}
        <nav
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Question navigator"
        >
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-8 w-8 rounded-full text-xs font-semibold transition-all duration-[250ms] focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                idx === currentIdx
                  ? "bg-primary-500 text-white shadow-glow-sm"
                  : answers[q.id]
                  ? "border border-green-500/30 bg-green-500/10 text-green-400"
                  : "border border-white/[0.08] bg-surface-elevated text-content-muted"
              }`}
              aria-label={`Question ${idx + 1}${answers[q.id] ? " (answered)" : ""}`}
              aria-current={idx === currentIdx ? "true" : undefined}
            >
              {idx + 1}
            </button>
          ))}
        </nav>
      </div>

      {/* Confirm submit modal */}
      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title={t("exam.submitExam")}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={doSubmit} loading={submitting}>
              {t("common.confirm")}
            </Button>
          </>
        }
      >
        <p className="text-sm text-content-secondary">
          {t("exam.confirmSubmit")}
        </p>
        <p className="mt-2 text-sm font-medium text-white">
          {answeredCount} of {questions.length} questions answered.
        </p>
      </Modal>
    </Layout>
  );
};

export default ExamPage;
