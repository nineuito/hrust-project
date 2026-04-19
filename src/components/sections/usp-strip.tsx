import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/ui/icons";

export async function UspStrip() {
  const t = await getTranslations();
  const items = t.raw("home.usp") as string[];

  return (
    <section className="border-b-2 border-ink bg-accent-2" aria-label={t("home.menu.eyebrow")}>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-ink/60 md:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item}
            className="flex items-center justify-center gap-2 px-4 py-3 text-center font-body text-sm font-bold uppercase tracking-wider text-ink sm:text-base"
          >
            {i === items.length - 1 ? (
              <Icon.Star size={16} weight="fill" className="text-ink" />
            ) : null}
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
