import type { Metadata } from "next";
import { Plan } from "@/components/plan";
import { Respiration } from "@/components/respiration";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Etiquette, Filet } from "@/components/editorial";
import { maison } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à la maison : date, lieu, et ce que vous voulez garder. Réponse sous quarante-huit heures par une note d'intention écrite.",
};

export default function Contact() {
  return (
    <>
      <Plan
        hauteur="grand"
        priority
        image={{
          src: "/plates/contact-colonne.jpg",
          alt: "Lumière de fin de jour sur un mur clair",
        }}
        titre="Écrire à la maison"
        hautGauche={<span className="label text-paper/60">05 — Contact</span>}
        basGauche={
          <p className="max-w-lg text-paper/75">
            Une date, un lieu, et ce que vous voulez garder. Cela suffit pour
            commencer.
          </p>
        }
        basDroite={
          <span className="label-micro text-terre-clair">
            Réponse sous 48 heures
          </span>
        }
      />

      <Respiration>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Etiquette accent="sauge" className="text-greige">
                La lettre
              </Etiquette>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal large>
              <Etiquette accent="sauge" className="text-greige">
                Directement
              </Etiquette>
              <dl className="mt-12 space-y-8">
                <div>
                  <dt className="label-micro text-greige">Courriel</dt>
                  <dd className="mt-3">
                    <a href={`mailto:${maison.email}`} className="link-draw">
                      {maison.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-micro text-greige">Téléphone</dt>
                  <dd className="mt-3">
                    <a
                      href={`tel:${maison.telephone.replace(/\s/g, "")}`}
                      className="link-draw"
                    >
                      {maison.telephone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-micro text-greige">Atelier</dt>
                  <dd className="mt-3 text-ardoise">
                    {maison.ville}
                    <br />
                    Sur rendez-vous
                  </dd>
                </div>
                <div>
                  <dt className="label-micro text-greige">Déplacements</dt>
                  <dd className="mt-3 text-ardoise">{maison.rayon}</dd>
                </div>
              </dl>

              <Filet className="mt-12 text-ink" />

              <p className="mt-10 text-ardoise">
                Les dates de mai à septembre se réservent le plus souvent
                douze à dix-huit mois à l&apos;avance. Je retiens peu de
                célébrations, pour donner à chacune le temps qu&apos;elle
                demande.
              </p>
            </Reveal>
          </div>
        </div>
      </Respiration>
    </>
  );
}
