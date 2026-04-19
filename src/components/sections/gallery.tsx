import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { galleryItems, l } from "@/lib/data/menu";
import { cn } from "@/lib/cn";

const GALLERY_LAYOUT = [
  "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2",
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1",
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 sm:col-span-2",
];

export async function Gallery() {
  const t = await getTranslations("home.gallery");
  const locale = await getLocale();

  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-6 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 md:auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <PlaceholderImage
              key={item.id}
              label={l(item.label, locale)}
              tone={item.tone}
              className={cn("h-full w-full", GALLERY_LAYOUT[i] ?? "")}
              rounded
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
