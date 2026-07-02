"use client";

import React, { ReactNode, useEffect, useCallback } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

// ─── Skeleton ────────────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-white/[0.06]",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="surface-card p-6">
      <Skeleton className="mb-3 h-6 w-2/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────

interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  color?: "blue" | "green" | "red" | "yellow";
}

export function ProgressBar({ value, label, color = "blue" }: ProgressBarProps) {
  const colors = {
    blue: "bg-gradient-to-r from-primary-600 to-primary-400",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-gradient-to-r from-primary-700 to-primary-400",
  };

  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs font-medium text-content-muted">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={clsx("h-full rounded-full transition-all duration-500", colors[color])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md animate-slide-up rounded-2xl border border-white/[0.08] bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-white"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-content-muted transition-colors duration-[250ms] hover:bg-white/[0.06] hover:text-white"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4 text-content-secondary">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-white/[0.08] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────

interface BadgeProps {
  children: ReactNode;
  variant?: "blue" | "green" | "red" | "yellow" | "gray";
}

export function Badge({ children, variant = "blue" }: BadgeProps) {
  const variants = {
    blue: "border border-primary-500/30 bg-primary-500/10 text-primary-300",
    green: "border border-green-500/30 bg-green-500/10 text-green-400",
    red: "border border-red-500/30 bg-red-500/10 text-red-400",
    yellow: "border border-primary-500/30 bg-primary-500/10 text-primary-200",
    gray: "border border-white/[0.08] bg-white/[0.06] text-content-muted",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}

// ─── Button ──────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-[250ms] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 shadow-sm",
    ghost:
      "text-content-secondary hover:bg-white/[0.06] hover:text-white focus:ring-white/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
