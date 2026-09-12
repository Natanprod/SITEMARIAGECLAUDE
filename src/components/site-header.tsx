"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { maison, navigation } from "@/content/site";
import { EASE_RIDEAU, EASE_MAISON } from "@/lib/motion";

/**
 * L'en-tête.
 *
 * Toutes les pages s'ouvrent sur un bandeau encre : l'en-tête est donc
 * clair au repos, et bascule sur fond papier dès que la page défile.
 * Aucun logo dessiné — la marque est une composition typographique.
 */
export function SiteHeader() {
  const [defile, setDefile] = useState(false);
  const [menu, setMenu] = useState(false);
  const chemin = usePathname();
  const reduit = useReducedMotion();
  const fermerMenu = () => setMenu(false);

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 24);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  // Verrou du défilement tant que le menu plein écran est ouvert
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const surEchap = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", surEchap);
    return () => window.removeEventListener("keydown", surEchap);
  }, []);

  const clair = !defile || menu;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-700",
          defile && !menu
            ? "bg-paper/92 backdrop-blur-[2px] text-ink"
            : "bg-transparent text-paper",
        ].join(" ")}
      >
        <div className="frame flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            onClick={fermerMenu}
            className="group flex items-baseline gap-3"
            aria-label={`${maison.nom} — accueil`}
          >
            <span className="font-[family-name:var(--font-display)] text-[1.0625rem] leading-none tracking-[0.02em]">
              {maison.nom}
            </span>
            <span
              className={[
                "label-micro hidden transition-opacity duration-700 sm:inline",
                clair ? "opacity-50" : "opacity-40",
              ].join(" ")}
            >
              Maison d&apos;image
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => {
              const actif =
                chemin === item.href || chemin.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "label link-draw text-[0.6875rem]",
                    actif ? "opacity-100" : "opacity-65 hover:opacity-100",
                    "transition-opacity duration-500",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            className="label relative z-50 flex items-center gap-3 text-[0.6875rem] lg:hidden"
            aria-expanded={menu}
            aria-controls="menu-maison"
          >
            <span>{menu ? "Fermer" : "Menu"}</span>
            <span aria-hidden className="flex h-[10px] w-5 flex-col justify-between">
              <span
                className={[
                  "block h-px w-full bg-current transition-transform duration-500",
                  menu ? "translate-y-[4.5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full bg-current transition-transform duration-500",
                  menu ? "-translate-y-[4.5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        <div
          aria-hidden
          className={[
            "frame transition-opacity duration-700",
            defile && !menu ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div className="rule" />
        </div>
      </header>

      <AnimatePresence>
        {menu ? (
          <motion.div
            id="menu-maison"
            className="fixed inset-0 z-40 bg-ink text-paper"
            initial={reduit ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={
              reduit ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }
            }
            exit={reduit ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.75, ease: EASE_RIDEAU }}
          >
            <div className="frame flex h-full flex-col justify-between pt-28 pb-10">
              <nav aria-label="Navigation" className="flex flex-col">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reduit ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduit ? 0 : 0.22 + i * 0.06,
                      duration: 0.8,
                      ease: EASE_MAISON,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={fermerMenu}
                      className="group flex items-baseline gap-5 border-b border-paper/12 py-5"
                    >
                      <span className="label-micro w-8 shrink-0 opacity-40">
                        {item.index}
                      </span>
                      <span className="text-[length:var(--text-h3)] leading-none transition-opacity duration-500 group-hover:opacity-55">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="label-micro flex flex-col gap-2 text-paper/60">
                <a
                  href={`mailto:${maison.email}`}
                  onClick={fermerMenu}
                  className="link-erase"
                >
                  {maison.email}
                </a>
                <span>{maison.rayon}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
