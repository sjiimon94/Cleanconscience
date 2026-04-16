import type { Metadata } from "next";
import { siteConfig } from "../../config/site";

export const metadata: Metadata = {
  title: "Mina kurser",
  description:
    "Videokurser från Cleanconscience – kunskap för medvetna beslut.",
};

export default function KurserPage() {
  const { courses, schoolUrl } = siteConfig.teachable;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        Mina kurser
      </h1>
      <p className="mt-2 text-ink-muted">
        Mina videokurser finns på min kursplattform. Klicka på en kurs för att
        läsa mer och anmäla dig.
      </p>

      {courses.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <a
              key={course.slug}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-border-soft bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              {course.image && (
                <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold text-ink group-hover:text-sage-dark">
                {course.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-muted">
                {course.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-clay group-hover:text-clay-dark">
                Gå till kursen →
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-muted">
          Inga kurser tillgängliga just nu. Kom tillbaka snart!
        </p>
      )}

      <p className="mt-12 text-sm text-ink-muted">
        Kurserna levereras via min externa kursplattform{" "}
        <a
          href={schoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-clay hover:text-clay-dark"
        >
          Teachable
        </a>
        .
      </p>
    </div>
  );
}
