import type { Metadata } from "next";
import { siteConfig } from "../../../config/site";

export const metadata: Metadata = {
  title: "Kurser",
  description:
    "Videokurser från Cleanconscience – kunskap för medvetna beslut.",
};

export default function KurserPage() {
  const { courses, schoolUrl } = siteConfig.teachable;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Kurser
      </h1>
      <p className="mt-2 text-gray-600">
        Våra videokurser finns på vår kursplattform. Klicka på en kurs för att
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
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {course.image && (
                <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                {course.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-500">
                {course.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                Gå till kursen →
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-gray-500">
          Inga kurser tillgängliga just nu. Kom tillbaka snart!
        </p>
      )}

      <p className="mt-12 text-sm text-gray-400">
        Kurserna levereras via vår externa kursplattform{" "}
        <a
          href={schoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-700"
        >
          Teachable
        </a>
        .
      </p>
    </div>
  );
}
