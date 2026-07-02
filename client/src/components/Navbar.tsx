"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, signOut, loading } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLang = useCallback(() => {
    i18n.changeLanguage(i18n.language === "en" ? "bn" : "en");
  }, [i18n]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [signOut]);

  const navLinkClass = (href: string) =>
    clsx(
      "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-[250ms]",
      router.pathname === href || (href !== "/" && router.pathname.startsWith(href))
        ? "bg-primary-500/15 text-primary-400"
        : "text-content-secondary hover:bg-white/[0.06] hover:text-white"
    );

  return (
    <nav
      className="nav-glass"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-white transition-colors duration-[250ms] hover:text-primary-400"
          aria-label={t("common.appName")}
        >
          <AcademicCapIcon className="h-7 w-7 text-primary-500" aria-hidden="true" />
          <span>{t("common.appName")}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link href="/" className={navLinkClass("/")}>
            {t("nav.home")}
          </Link>
          <Link href="/divisions" className={navLinkClass("/divisions")}>
            {t("nav.divisions")}
          </Link>
          {user?.role === "ADMIN" && (
            <Link href="/admin" className={navLinkClass("/admin")}>
              {t("nav.admin")}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="btn-secondary hidden px-3 py-1.5 text-xs sm:inline-flex"
            aria-label="Toggle language"
          >
            {t("nav.language")}
          </button>

          <button
            onClick={toggle}
            className="rounded-lg p-2 text-content-muted transition-all duration-[250ms] hover:bg-white/[0.06] hover:text-white"
            aria-label={t("nav.darkMode")}
          >
            {dark ? (
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                  >
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-white/[0.08]"
                      />
                    ) : (
                      <UserCircleIcon className="h-9 w-9 text-content-muted" />
                    )}
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-white/[0.08] bg-surface py-2 shadow-card"
                      role="menu"
                    >
                      <div className="border-b border-white/[0.08] px-4 py-2">
                        <p className="truncate text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-content-muted">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-content-secondary transition-colors duration-[250ms] hover:bg-white/[0.06] hover:text-white"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t("nav.profile")}
                      </Link>
                      <button
                        className="w-full px-4 py-2 text-left text-sm text-red-400 transition-colors duration-[250ms] hover:bg-white/[0.06]"
                        role="menuitem"
                        onClick={handleSignOut}
                      >
                        {t("nav.signOut")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin" className="btn-primary px-4 py-2 text-sm">
                  {t("nav.signIn")}
                </Link>
              )}
            </>
          )}

          <button
            className="rounded-lg p-2 text-content-muted transition-all duration-[250ms] hover:bg-white/[0.06] hover:text-white md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/[0.08] bg-surface-secondary px-4 py-4 md:hidden">
          <Link
            href="/"
            className={clsx("block py-2", navLinkClass("/"))}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/divisions"
            className={clsx("block py-2", navLinkClass("/divisions"))}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.divisions")}
          </Link>
          {user && (
            <Link
              href="/profile"
              className={clsx("block py-2", navLinkClass("/profile"))}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.profile")}
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={clsx("block py-2", navLinkClass("/admin"))}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.admin")}
            </Link>
          )}
          <button
            onClick={toggleLang}
            className="mt-2 block w-full py-2 text-left text-sm text-content-secondary"
          >
            {t("nav.language")}
          </button>
          {user ? (
            <button
              className="block py-2 text-sm font-medium text-red-400"
              onClick={handleSignOut}
            >
              {t("nav.signOut")}
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="mt-2 block py-2 text-sm font-medium text-primary-400"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.signIn")}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
