import Link from "next/link";
import { useState } from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Attempt, Division } from "@/types";
import { Skeleton } from "@/components/ui";

interface SubjectGroup {
  subjectSlug: string;
  subjectName: string;
  isCommon: boolean;
  attempts: Attempt[];
}

interface DivisionGroup {
  divisionId: string | null;
  divisionName: string;
  divisionSlug: string | null;
  subjects: SubjectGroup[];
}

interface ExamHistoryProps {
  history: Attempt[] | undefined;
  divisions: Division[] | undefined;
  loading: boolean;
  emptyMessage?: string;
}

function groupHistory(history: Attempt[], divisions: Division[]): DivisionGroup[] {
  const divisionMap = new Map<string, Division>();
  divisions.forEach((division) => divisionMap.set(division.id, division));

  const cycle = new Map<string, Map<string, SubjectGroup>>();

  for (const attempt of history) {
    const exam = attempt.exam;
    if (!exam?.subject) continue;
    const subject = exam.subject;
    const divisionKey = exam.divisionId ?? (subject.isCommon ? "__common__" : "__unknown__");

    if (!cycle.has(divisionKey)) cycle.set(divisionKey, new Map());
    const subjectMap = cycle.get(divisionKey)!;

    if (!subjectMap.has(subject.slug)) {
      subjectMap.set(subject.slug, {
        subjectSlug: subject.slug,
        subjectName: subject.name,
        isCommon: subject.isCommon,
        attempts: [],
      });
    }

    subjectMap.get(subject.slug)!.attempts.push(attempt);
  }

  const result: DivisionGroup[] = [];

  for (const [divisionKey, subjectMap] of cycle.entries()) {
    let divisionName = "Other";
    let divisionSlug: string | null = null;
    let divisionId: string | null = null;

    if (divisionKey === "__common__") {
      divisionName = "Common Subjects";
    } else {
      const division = divisionMap.get(divisionKey);
      if (division) {
        divisionName = division.name;
        divisionSlug = division.slug;
        divisionId = division.id;
      }
    }

    result.push({
      divisionId,
      divisionName,
      divisionSlug,
      subjects: Array.from(subjectMap.values()),
    });
  }

  result.sort((a, b) => {
    if (!a.divisionSlug && b.divisionSlug) return 1;
    if (a.divisionSlug && !b.divisionSlug) return -1;
    return a.divisionName.localeCompare(b.divisionName);
  });

  return result;
}

function pctOf(attempt: Attempt) {
  return attempt.totalScore > 0 ? Math.round((attempt.score / attempt.totalScore) * 100) : 0;
}

function scoreText(pct: number) {
  if (pct >= 75) return "text-green-400";
  if (pct >= 50) return "text-primary-300";
  return "text-red-400";
}

function scoreDot(pct: number) {
  if (pct >= 75) return "bg-green-500";
  if (pct >= 50) return "bg-primary-500";
  return "bg-red-500";
}

function scoreBadge(pct: number) {
  if (pct >= 75) return "border border-green-500/30 bg-green-500/10 text-green-400";
  if (pct >= 50) return "border border-primary-500/30 bg-primary-500/10 text-primary-300";
  return "border border-red-500/30 bg-red-500/10 text-red-400";
}

function AttemptRow({ attempt }: { attempt: Attempt }) {
  const pct = pctOf(attempt);
  return (
    <Link
      href={`/result/${attempt.id}`}
      className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface-elevated px-5 py-3 transition-all duration-[250ms] hover:border-primary-500/30 hover:shadow-glow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className={clsx("h-2.5 w-2.5 flex-shrink-0 rounded-full", scoreDot(pct))} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {(attempt.exam as { title?: string })?.title ?? "Exam"}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-content-muted">
            <ClockIcon className="h-3 w-3 flex-shrink-0" />
            {attempt.completedAt
              ? new Date(attempt.completedAt).toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "In progress"}
          </p>
        </div>
      </div>

      <div className="ml-4 flex flex-shrink-0 items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold text-white">
            {attempt.score}/{attempt.totalScore}
          </p>
          <p className={clsx("text-xs font-semibold", scoreText(pct))}>{pct}%</p>
        </div>
        <ChevronRightIcon className="h-4 w-4 text-content-muted transition-colors duration-[250ms] group-hover:text-primary-400" />
      </div>
    </Link>
  );
}

function SubjectAccordion({ subject }: { subject: SubjectGroup }) {
  const [open, setOpen] = useState(false);
  const total = subject.attempts.length;
  const avgPct = total > 0 ? subject.attempts.reduce((sum, attempt) => sum + pctOf(attempt), 0) / total : 0;

  return (
    <div className="surface-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors duration-[250ms] hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/15">
            <BookOpenIcon className="h-5 w-5 text-primary-400" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">{subject.subjectName}</p>
            <p className="mt-0.5 text-xs text-content-muted">
              <span className="font-medium text-content-secondary">{total}</span>
              {total === 1 ? " exam" : " exams"} taken
              {total > 0 && (
                <>
                  {" · avg "}
                  <span className={clsx("font-semibold", scoreText(Math.round(avgPct)))}>
                    {Math.round(avgPct)}%
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            {subject.attempts.slice(0, 3).map((attempt) => {
              const pct = pctOf(attempt);
              return (
                <span key={attempt.id} className={clsx("inline-flex rounded-full px-2 py-0.5 text-xs font-semibold", scoreBadge(pct))}>
                  {pct}%
                </span>
              );
            })}
            {total > 3 && <span className="text-xs text-content-muted">+{total - 3}</span>}
          </div>
          <ChevronDownIcon className={clsx("h-5 w-5 flex-shrink-0 text-content-muted transition-transform duration-200", open && "rotate-180")} />
        </div>
      </button>

      {open && (
        <div className="space-y-2 border-t border-white/[0.06] bg-surface-secondary/50 px-4 py-3">
          {subject.attempts.map((attempt) => (
            <AttemptRow key={attempt.id} attempt={attempt} />
          ))}
        </div>
      )}
    </div>
  );
}

function DivisionAccordion({ group }: { group: DivisionGroup }) {
  const [open, setOpen] = useState(true);
  const totalAttempts = group.subjects.reduce((sum, subject) => sum + subject.attempts.length, 0);

  return (
    <div className="surface-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-5 transition-colors duration-[250ms] hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-400">
            <AcademicCapIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-white">{group.divisionName}</p>
            <p className="mt-0.5 text-xs text-content-muted">
              <span className="font-medium text-content-secondary">{group.subjects.length}</span>
              {group.subjects.length === 1 ? " subject" : " subjects"}
              {" · "}
              <span className="font-medium text-content-secondary">{totalAttempts}</span>
              {totalAttempts === 1 ? " attempt" : " attempts"} total
            </p>
          </div>
        </div>
        <ChevronDownIcon className={clsx("h-5 w-5 flex-shrink-0 text-content-muted transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="space-y-3 border-t border-white/[0.06] bg-surface-secondary/30 p-4">
          {group.subjects.map((subject) => (
            <SubjectAccordion key={subject.subjectSlug} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExamHistory({ history, divisions, loading, emptyMessage }: ExamHistoryProps) {
  const groups = !loading && history && divisions ? groupHistory(history, divisions) : [];

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!history || history.length === 0 || groups.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.12] bg-surface p-16 text-center">
        <CheckCircleIcon className="mx-auto mb-4 h-12 w-12 text-content-muted" />
        <p className="text-content-muted">{emptyMessage ?? "No exam history is available yet."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <DivisionAccordion key={group.divisionId ?? group.divisionName} group={group} />
      ))}
    </div>
  );
}
