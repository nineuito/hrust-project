import { getTranslations } from "next-intl/server";

export async function UspStrip() {
  const t = await getTranslations();
  const items = t.raw("home.usp") as string[];

  return (
    <section className="border-b-2 border-ink bg-accent-2" aria-label={t("home.menu.eyebrow")}>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-ink/60 md:grid-cols-4">
        {items.map((item) => (
          <li
            key={item}
            className="px-4 py-3 text-center font-hand text-base text-ink sm:text-lg"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
