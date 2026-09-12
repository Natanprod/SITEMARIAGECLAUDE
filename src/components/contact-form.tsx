"use client";

import { useMemo, useState, type FormEvent } from "react";
import { maison } from "@/content/site";

/**
 * Le formulaire de contact.
 *
 * Il compose une lettre structurée et l'ouvre dans le client de messagerie
 * du visiteur : aucune donnée ne transite par un tiers, et le site reste
 * entièrement statique. Pour passer à un envoi serveur, remplacer
 * `envoyer()` par une Server Action (voir README).
 */

const CHAMPS = [
  { nom: "noms", label: "Vos prénoms", type: "text", requis: true, auto: "name" },
  { nom: "email", label: "Courriel", type: "email", requis: true, auto: "email" },
  { nom: "telephone", label: "Téléphone", type: "tel", requis: false, auto: "tel" },
  { nom: "date", label: "Date de la célébration", type: "date", requis: false, auto: "off" },
  { nom: "lieu", label: "Lieu ou région", type: "text", requis: false, auto: "off" },
] as const;

const PRESTATIONS = ["Photographie", "Film", "Photographie & film", "Je ne sais pas encore"];

export function ContactForm() {
  const [prestation, setPrestation] = useState(PRESTATIONS[2]);
  const [envoye, setEnvoye] = useState(false);

  const sujet = useMemo(
    () => `Demande — ${prestation}`,
    [prestation],
  );

  function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const lignes = [
      `Prénoms : ${data.get("noms") ?? ""}`,
      `Courriel : ${data.get("email") ?? ""}`,
      `Téléphone : ${data.get("telephone") || "—"}`,
      `Date : ${data.get("date") || "—"}`,
      `Lieu : ${data.get("lieu") || "—"}`,
      `Prestation : ${prestation}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${maison.email}?subject=${encodeURIComponent(
      sujet,
    )}&body=${encodeURIComponent(lignes)}`;
    setEnvoye(true);
  }

  return (
    <form onSubmit={envoyer} className="w-full">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {CHAMPS.map((champ) => (
          <label key={champ.nom} className="block">
            <span className="label-micro text-greige">
              {champ.label}
              {champ.requis ? <span className="text-terre"> *</span> : null}
            </span>
            <input
              type={champ.type}
              name={champ.nom}
              required={champ.requis}
              autoComplete={champ.auto}
              className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent pb-3 text-ink transition-colors duration-500 outline-none focus:border-ink"
            />
          </label>
        ))}
      </div>

      <fieldset className="mt-12">
        <legend className="label-micro text-greige">Ce que vous cherchez</legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {PRESTATIONS.map((p) => {
            const actif = p === prestation;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPrestation(p)}
                aria-pressed={actif}
                className={[
                  "label-micro border px-5 py-3 transition-colors duration-500",
                  actif
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ardoise hover:border-ink",
                ].join(" ")}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-12 block">
        <span className="label-micro text-greige">
          Dites-moi ce que vous voulez garder
          <span className="text-terre"> *</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-none border-0 border-b border-ink/20 bg-transparent pb-3 text-ink transition-colors duration-500 outline-none focus:border-ink"
        />
      </label>

      <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5">
        <button
          type="submit"
          className="label border border-ink px-9 py-4 text-[0.6875rem] transition-colors duration-500 hover:bg-ink hover:text-paper"
        >
          Envoyer la demande
        </button>
        <p
          className="label-micro text-greige"
          role="status"
          aria-live="polite"
        >
          {envoye
            ? "Votre messagerie s'ouvre — il ne reste qu'à envoyer."
            : "Réponse sous quarante-huit heures."}
        </p>
      </div>
    </form>
  );
}
