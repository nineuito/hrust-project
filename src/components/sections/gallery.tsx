import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { galleryItems, l } from "@/lib/data/menu";

export async function Gallery() {
  const t = await getTranslations("home.gallery");
  const locale = await getLocale();

  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {galleryItems.map((item, i) => (
            <PlaceholderImage
              key={item.id}
              label={l(item.label, locale)}
              tone={item.tone}
              className={
                i === 0
                  ? "aspect-[4/5] sm:col-span-2 sm:row-span-2"
                  : "aspect-[4/3]"
              }
              rounded
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
