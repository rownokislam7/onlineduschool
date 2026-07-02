"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Exam } from "@/types";
import { Badge } from "./ui";

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  const { t, i18n } = useTranslation();
  const displayTitle = i18n.language === "bn" && exam.titlebn ? exam.titlebn : exam.title;
  const qCount = exam._count?.questions ?? exam.questions?.length ?? 0;

  return (
    <article className="surface-card-hover flex flex-col p-6">
      <div className="flex-1">
        <h3 className="line-clamp-2 text-lg font-bold text-white">
          {displayTitle}
        </h3>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-content-muted">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" aria-hidden="true" />
            {t("subject.minutes", { count: exam.timeLimitMin })}
          </span>
          <span className="flex items-center gap-1">
            <QuestionMarkCircleIcon className="h-4 w-4" aria-hidden="true" />
            {t("subject.questions", { count: qCount })}
          </span>
          {exam.randomize && (
            <Badge variant="yellow">Randomised</Badge>
          )}
        </div>
      </div>

      <Link href={`/exam/${exam.slug}`} className="btn-primary mt-5 w-full py-2.5">
        {t("subject.startExam")}
      </Link>
    </article>
  );
}
