"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/[0.08] bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-white transition-colors duration-[250ms] hover:text-primary-400"
            >
              <AcademicCapIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
              <span>{t("common.appName")}</span>
            </Link>
            <p className="mt-2 text-sm text-content-muted">
              {t("landing.subtitle")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content-secondary">
              {t("nav.divisions")}
            </h3>
            <ul className="mt-4 space-y-2">
              {["science", "commerce", "arts"].map((d) => (
                <li key={d}>
                  <Link
                    href={`/division/${d}`}
                    className="text-sm capitalize text-content-muted transition-colors duration-[250ms] hover:text-primary-400"
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content-secondary">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-content-muted transition-colors duration-[250ms] hover:text-primary-400"
                >
                  {t("nav.profile")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@exammania.com"
                  className="text-sm text-content-muted transition-colors duration-[250ms] hover:text-primary-400"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/[0.08] pt-6">
          <p className="text-center text-xs text-content-muted">
            © {new Date().getFullYear()} {t("common.appName")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
