import type { Locale } from "@/i18n/routing";

export type Localized = { uk: string; en: string };

export function l(value: Localized, locale: Locale | string): string {
  return locale === "en" ? value.en : value.uk;
}

export type Variant = {
  id: string;
  label: Localized;
  priceDelta: number;
};

export type Addon = {
  id: string;
  label: Localized;
  priceDelta: number;
};

export type Category = {
  id: "pizza" | "rolls" | "burgers" | "desserts" | "drinks";
  slug: string;
  label: Localized;
};

export type DietTag = "vegan" | "hot" | "new" | "hit";

export type Product = {
  id: string;
  categoryId: string;
  name: Localized;
  description: Localized;
  price: number;
  tags: DietTag[];
  isHit?: boolean;
  variants?: Variant[];
  variantGroupLabel?: Localized;
  addons?: Addon[];
  addonGroupLabel?: Localized;
};

export const categories: Category[] = [
  { id: "pizza", slug: "pizza", label: { uk: "Піца", en: "Pizza" } },
  { id: "rolls", slug: "rolls", label: { uk: "Роли", en: "Rolls" } },
  { id: "burgers", slug: "burgers", label: { uk: "Бургери", en: "Burgers" } },
  { id: "desserts", slug: "desserts", label: { uk: "Десерти", en: "Desserts" } },
  { id: "drinks", slug: "drinks", label: { uk: "Напої", en: "Drinks" } },
];

const PIZZA_SIZE_LABEL: Localized = { uk: "Розмір", en: "Size" };
const PIZZA_SIZES: Variant[] = [
  { id: "30", label: { uk: "30 см", en: "30 cm" }, priceDelta: 0 },
  { id: "35", label: { uk: "35 см", en: "35 cm" }, priceDelta: 60 },
  { id: "40", label: { uk: "40 см", en: "40 cm" }, priceDelta: 120 },
];

const ROLL_ADDONS_LABEL: Localized = { uk: "Додатково", en: "Extras" };
const ROLL_ADDONS: Addon[] = [
  { id: "wasabi", label: { uk: "Васабі + соєвий", en: "Wasabi + soy" }, priceDelta: 20 },
  { id: "ginger", label: { uk: "Маринований імбир", en: "Pickled ginger" }, priceDelta: 15 },
  { id: "spicy", label: { uk: "Спайсі соус", en: "Spicy sauce" }, priceDelta: 25 },
  { id: "unagi", label: { uk: "Соус унагі", en: "Unagi sauce" }, priceDelta: 25 },
];

const BURGER_ADDONS_LABEL: Localized = { uk: "Додатково", en: "Extras" };
const BURGER_ADDONS: Addon[] = [
  { id: "cheese", label: { uk: "Додатковий чедер", en: "Extra cheddar" }, priceDelta: 30 },
  { id: "bacon", label: { uk: "Хрустящий бекон", en: "Crispy bacon" }, priceDelta: 40 },
  { id: "jalapeno", label: { uk: "Халапеньо", en: "Jalapeños" }, priceDelta: 15 },
  { id: "avocado", label: { uk: "Авокадо", en: "Avocado" }, priceDelta: 35 },
];

const DRINK_SIZE_LABEL: Localized = { uk: "Обсяг", en: "Size" };
const DRINK_SIZES: Variant[] = [
  { id: "s", label: { uk: "0.3 л", en: "0.3 l" }, priceDelta: 0 },
  { id: "m", label: { uk: "0.5 л", en: "0.5 l" }, priceDelta: 30 },
];

const withPizzaOptions = <T extends Omit<Product, "variants" | "variantGroupLabel">>(p: T) => ({
  ...p,
  variants: PIZZA_SIZES,
  variantGroupLabel: PIZZA_SIZE_LABEL,
});

const withRollAddons = <T extends Omit<Product, "addons" | "addonGroupLabel">>(p: T) => ({
  ...p,
  addons: ROLL_ADDONS,
  addonGroupLabel: ROLL_ADDONS_LABEL,
});

const withBurgerAddons = <T extends Omit<Product, "addons" | "addonGroupLabel">>(p: T) => ({
  ...p,
  addons: BURGER_ADDONS,
  addonGroupLabel: BURGER_ADDONS_LABEL,
});

export const products: Product[] = [
  withPizzaOptions({
    id: "p1",
    categoryId: "pizza",
    name: { uk: "Маргарита", en: "Margherita" },
    description: { uk: "моцарела · базилік · томат", en: "mozzarella · basil · tomato" },
    price: 229,
    tags: ["vegan"],
    isHit: true,
  }),
  withPizzaOptions({
    id: "p2",
    categoryId: "pizza",
    name: { uk: "Пепероні", en: "Pepperoni" },
    description: { uk: "салямі · моцарела · орегано", en: "salami · mozzarella · oregano" },
    price: 269,
    tags: ["hot", "hit"],
    isHit: true,
  }),
  withPizzaOptions({
    id: "p3",
    categoryId: "pizza",
    name: { uk: "Четверо сирів", en: "Four cheeses" },
    description: {
      uk: "горгонзола · пармезан · моцарела · чедер",
      en: "gorgonzola · parmesan · mozzarella · cheddar",
    },
    price: 299,
    tags: [],
  }),
  withPizzaOptions({
    id: "p4",
    categoryId: "pizza",
    name: { uk: "Діавола", en: "Diavola" },
    description: {
      uk: "гостра салямі · перець халапеньо · моцарела",
      en: "spicy salami · jalapeño · mozzarella",
    },
    price: 289,
    tags: ["hot"],
  }),
  withPizzaOptions({
    id: "p5",
    categoryId: "pizza",
    name: { uk: "Прошуто", en: "Prosciutto" },
    description: {
      uk: "прошуто · руккола · пармезан · трюфель",
      en: "prosciutto · arugula · parmesan · truffle",
    },
    price: 329,
    tags: ["new"],
  }),
  withPizzaOptions({
    id: "p6",
    categoryId: "pizza",
    name: { uk: "Веганська", en: "Vegan" },
    description: {
      uk: "артишоки · спаржа · томати · оливки",
      en: "artichokes · asparagus · tomatoes · olives",
    },
    price: 259,
    tags: ["vegan"],
  }),

  withRollAddons({
    id: "r1",
    categoryId: "rolls",
    name: { uk: "Філадельфія", en: "Philadelphia" },
    description: {
      uk: "лосось · сир філадельфія · авокадо",
      en: "salmon · cream cheese · avocado",
    },
    price: 299,
    tags: ["hit"],
    isHit: true,
  }),
  withRollAddons({
    id: "r2",
    categoryId: "rolls",
    name: { uk: "Каліфорнія", en: "California" },
    description: {
      uk: "краб · авокадо · огірок · ікра",
      en: "crab · avocado · cucumber · roe",
    },
    price: 269,
    tags: [],
  }),
  withRollAddons({
    id: "r3",
    categoryId: "rolls",
    name: { uk: "Спайсі тунець", en: "Spicy tuna" },
    description: {
      uk: "тунець · спайсі соус · кунжут",
      en: "tuna · spicy sauce · sesame",
    },
    price: 319,
    tags: ["hot"],
  }),
  withRollAddons({
    id: "r4",
    categoryId: "rolls",
    name: { uk: "Вега", en: "Vega" },
    description: {
      uk: "авокадо · манго · огірок · тофу",
      en: "avocado · mango · cucumber · tofu",
    },
    price: 239,
    tags: ["vegan", "new"],
  }),

  withBurgerAddons({
    id: "b1",
    categoryId: "burgers",
    name: { uk: "Double Хрум", en: "Double Khrum" },
    description: {
      uk: "дві котлети · чедер · бекон · соус хрум",
      en: "double patty · cheddar · bacon · khrum sauce",
    },
    price: 329,
    tags: ["hit"],
    isHit: true,
  }),
  withBurgerAddons({
    id: "b2",
    categoryId: "burgers",
    name: { uk: "Classic", en: "Classic" },
    description: {
      uk: "яловичина · чедер · томат · салат",
      en: "beef · cheddar · tomato · lettuce",
    },
    price: 249,
    tags: [],
  }),
  withBurgerAddons({
    id: "b3",
    categoryId: "burgers",
    name: { uk: "Spicy chicken", en: "Spicy chicken" },
    description: {
      uk: "курка · халапеньо · сирний соус",
      en: "chicken · jalapeño · cheese sauce",
    },
    price: 239,
    tags: ["hot"],
  }),
  withBurgerAddons({
    id: "b4",
    categoryId: "burgers",
    name: { uk: "Beyond vegan", en: "Beyond vegan" },
    description: {
      uk: "рослинна котлета · авокадо · гуакамоле",
      en: "plant-based patty · avocado · guacamole",
    },
    price: 279,
    tags: ["vegan", "new"],
  }),

  {
    id: "d1",
    categoryId: "desserts",
    name: { uk: "Тірамісу", en: "Tiramisu" },
    description: {
      uk: "маскарпоне · савоярді · еспрессо",
      en: "mascarpone · savoiardi · espresso",
    },
    price: 149,
    tags: [],
  },
  {
    id: "d2",
    categoryId: "desserts",
    name: { uk: "Чізкейк", en: "Cheesecake" },
    description: {
      uk: "вершковий сир · полуничний соус",
      en: "cream cheese · strawberry sauce",
    },
    price: 139,
    tags: [],
  },
  {
    id: "d3",
    categoryId: "desserts",
    name: { uk: "Брауні", en: "Brownie" },
    description: {
      uk: "темний шоколад · горіхи · кулька морозива",
      en: "dark chocolate · nuts · ice cream scoop",
    },
    price: 129,
    tags: [],
  },
  {
    id: "dr1",
    categoryId: "drinks",
    name: { uk: "Еспрессо", en: "Espresso" },
    description: {
      uk: "свіжообсмажена арабіка",
      en: "freshly roasted arabica",
    },
    price: 45,
    tags: [],
  },
  {
    id: "dr2",
    categoryId: "drinks",
    name: { uk: "Капучіно", en: "Cappuccino" },
    description: {
      uk: "еспрессо · спінене молоко",
      en: "espresso · steamed milk",
    },
    price: 75,
    tags: [],
  },
  {
    id: "dr3",
    categoryId: "drinks",
    name: { uk: "Лимонад хрум", en: "Khrum lemonade" },
    description: {
      uk: "імбир · лайм · мʼята",
      en: "ginger · lime · mint",
    },
    price: 95,
    tags: ["new"],
    variants: DRINK_SIZES,
    variantGroupLabel: DRINK_SIZE_LABEL,
  },
  {
    id: "dr4",
    categoryId: "drinks",
    name: { uk: "Coca-Cola", en: "Coca-Cola" },
    description: { uk: "0.33 л", en: "0.33 l" },
    price: 45,
    tags: [],
  },
];

export const weeklyHits = products.filter((p) => p.isHit);

export type Review = {
  id: string;
  author: Localized;
  rating: number;
  text: Localized;
};

export const reviews: Review[] = [
  {
    id: "rv1",
    author: { uk: "Олена К.", en: "Olena K." },
    rating: 5,
    text: {
      uk: "Піца тане в роті. Доставка за 22 хв — ми в шоці.",
      en: "Pizza melts in the mouth. Delivered in 22 min — we're stunned.",
    },
  },
  {
    id: "rv2",
    author: { uk: "Макс Д.", en: "Max D." },
    rating: 5,
    text: {
      uk: "Найкращі філадельфії у місті. Крапка.",
      en: "Best Philadelphia rolls in town. Period.",
    },
  },
  {
    id: "rv3",
    author: { uk: "Аня П.", en: "Anya P." },
    rating: 5,
    text: {
      uk: "Бургер зі своєю піснею. Love від першого вкусу.",
      en: "A burger with its own soundtrack. Love at first bite.",
    },
  },
  {
    id: "rv4",
    author: { uk: "Ігор С.", en: "Igor S." },
    rating: 5,
    text: {
      uk: "Double Хрум — це щось. Замовляю раз на тиждень.",
      en: "Double Khrum is something else. I order it weekly.",
    },
  },
];

export const galleryItems = [
  { id: "g1", label: { uk: "інтер'єр", en: "interior" }, tone: "muted" as const },
  { id: "g2", label: { uk: "піч", en: "oven" }, tone: "accent2" as const },
  { id: "g3", label: { uk: "команда", en: "team" }, tone: "muted" as const },
  { id: "g4", label: { uk: "подача", en: "serving" }, tone: "accent" as const },
  { id: "g5", label: { uk: "десерти", en: "desserts" }, tone: "muted" as const },
  { id: "g6", label: { uk: "бар", en: "bar" }, tone: "accent2" as const },
];

export function hasOptions(product: Product): boolean {
  return Boolean(
    (product.variants && product.variants.length > 0) ||
      (product.addons && product.addons.length > 0),
  );
}

export type FilterableDietTag = Exclude<DietTag, "hit">;

export function dietTagsOf(product: Product): FilterableDietTag[] {
  return product.tags.filter((x): x is FilterableDietTag => x !== "hit");
}

export function computeUnitPrice(
  product: Product,
  variantId: string | undefined,
  addonIds: string[],
): number {
  let price = product.price;
  if (variantId && product.variants) {
    const v = product.variants.find((x) => x.id === variantId);
    if (v) price += v.priceDelta;
  }
  if (addonIds.length && product.addons) {
    for (const id of addonIds) {
      const a = product.addons.find((x) => x.id === id);
      if (a) price += a.priceDelta;
    }
  }
  return price;
}
