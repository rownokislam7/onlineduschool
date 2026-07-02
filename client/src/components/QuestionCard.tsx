"use client";

import React from "react";
import clsx from "clsx";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  answer: string | undefined;
  onChange: (answer: string) => void;
  showResult?: boolean;
  correctAnswer?: string | null;
}

export default function QuestionCard({
  question,
  answer,
  onChange,
  showResult = false,
  correctAnswer,
}: QuestionCardProps) {
  const isCorrect = showResult && answer === correctAnswer;
  const isWrong = showResult && answer !== undefined && answer !== correctAnswer;

  return (
    <div
      className={clsx(
        "surface-card p-6 transition-colors duration-[250ms]",
        showResult && isCorrect && "border-green-500/40",
        showResult && isWrong && "border-red-500/40"
      )}
    >
      <p className="mb-5 text-base font-medium leading-relaxed text-white">
        <span className="mr-2 font-bold text-primary-400">
          Q{question.order}.
        </span>
        {question.text}
        <span className="ml-2 text-xs font-normal text-content-muted">
          ({question.marks} {question.marks === 1 ? "mark" : "marks"})
        </span>
      </p>

      {(question.type === "MCQ" || question.type === "TRUE_FALSE") &&
        question.options && (
          <fieldset>
            <legend className="sr-only">Choose your answer</legend>
            <div className="space-y-3">
              {(question.options as string[]).map((opt, idx) => {
                const val = opt;
                const isSelected = answer === val;
                const isCorrectOption = showResult && correctAnswer === val;
                const isSelectedIncorrect = isSelected && !isCorrectOption && showResult;

                return (
                  <label
                    key={idx}
                    className={clsx(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-[250ms]",
                      isCorrectOption &&
                        "border-green-500/40 bg-green-500/10",
                      isSelectedIncorrect &&
                        "border-red-500/40 bg-red-500/10",
                      isSelected && !showResult &&
                        "border-primary-500/40 bg-primary-500/10",
                      !isSelected && !isCorrectOption &&
                        "border-white/[0.08] hover:border-primary-500/30 hover:bg-white/[0.03]"
                    )}
                  >
                    <input
                      type="radio"
                      name={`q-${question.id}`}
                      value={val}
                      checked={isSelected}
                      onChange={() => !showResult && onChange(val)}
                      disabled={showResult}
                      className="peer sr-only"
                      aria-label={opt}
                    />
                    <span
                      className={clsx(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-[250ms]",
                        isCorrectOption && "border-green-500 bg-green-500",
                        isSelectedIncorrect && "border-red-500 bg-red-500",
                        isSelected && !showResult && "border-primary-500 bg-primary-500",
                        !isSelected && !showResult && "border-white/20 bg-surface-elevated",
                        !showResult && "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/50"
                      )}
                    >
                      {(isSelected || isCorrectOption) && (
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-sm text-content-secondary">{opt}</span>
                    {isCorrectOption && (
                      <span className="ml-auto text-xs font-semibold text-green-400">
                        ✓ Correct
                      </span>
                    )}
                    {isSelectedIncorrect && (
                      <span className="ml-auto text-xs font-semibold text-red-400">
                        ✗ Wrong
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

      {question.type === "SHORT_ANSWER" && (
        <div>
          <label htmlFor={`sa-${question.id}`} className="sr-only">
            Your answer
          </label>
          <textarea
            id={`sa-${question.id}`}
            rows={4}
            value={answer ?? ""}
            onChange={(e) => !showResult && onChange(e.target.value)}
            disabled={showResult}
            placeholder="Write your answer here…"
            className={clsx(
              "input-field resize-none",
              showResult && "cursor-not-allowed opacity-70"
            )}
          />
          {showResult && correctAnswer && (
            <p className="mt-2 text-sm text-green-400">
              <span className="font-semibold">Expected: </span>
              {correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
