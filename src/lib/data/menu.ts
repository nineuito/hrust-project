import type { Locale } from "@/i18n/routing";

export type Localized = { uk: string; en: string };

export function l(value: Localized, locale: Locale | string): string {
  return locale === "en" ? value.en : value.uk;
}

export type Category = {
  id: string;
  slug: string;
  icon: string;
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
};

export const categories: Category[] = [
  { id: "pizza", slug: "pizza", icon: "🍕", label: { uk: "Піца", en: "Pizza" } },
  { id: "rolls", slug: "rolls", icon: "🍣", label: { uk: "Роли", en: "Rolls" } },
  { id: "burgers", slug: "burgers", icon: "🍔", label: { uk: "Бургери", en: "Burgers" } },
  { id: "desserts", slug: "desserts", icon: "🧁", label: { uk: "Десерти", en: "Desserts" } },
  { id: "drinks", slug: "drinks", icon: "☕", label: { uk: "Напої", en: "Drinks" } },
];

export const products: Product[] = [
  {
    id: "p1",
    categoryId: "pizza",
    name: { uk: "Маргарита", en: "Margherita" },
    description: { uk: "моцарела · базилік · томат", en: "mozzarella · basil · tomato" },
    price: 229,
    tags: ["vegan"],
    isHit: true,
  },
  {
    id: "p2",
    categoryId: "pizza",
    name: { uk: "Пепероні", en: "Pepperoni" },
    description: { uk: "салямі · моцарела · орегано", en: "salami · mozzarella · oregano" },
    price: 269,
    tags: ["hot", "hit"],
    isHit: true,
  },
  {
    id: "p3",
    categoryId: "pizza",
    name: { uk: "Четверо сирів", en: "Four cheeses" },
    description: {
      uk: "горгонзола · пармезан · моцарела · чедер",
      en: "gorgonzola · parmesan · mozzarella · cheddar",
    },
    price: 299,
    tags: [],
  },
  {
    id: "p4",
    categoryId: "pizza",
    name: { uk: "Діавола", en: "Diavola" },
    description: {
      uk: "гостра салямі · перець халапеньо · моцарела",
      en: "spicy salami · jalapeño · mozzarella",
    },
    price: 289,
    tags: ["hot"],
  },
  {
    id: "p5",
    categoryId: "pizza",
    name: { uk: "Прошуто", en: "Prosciutto" },
    description: {
      uk: "прошуто · руккола · пармезан · трюфель",
      en: "prosciutto · arugula · parmesan · truffle",
    },
    price: 329,
    tags: ["new"],
  },
  {
    id: "p6",
    categoryId: "pizza",
    name: { uk: "Веганська", en: "Vegan" },
    description: {
      uk: "артишоки · спаржа · томати · оливки",
      en: "artichokes · asparagus · tomatoes · olives",
    },
    price: 259,
    tags: ["vegan"],
  },
  {
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
  },
  {
    id: "r2",
    categoryId: "rolls",
    name: { uk: "Каліфорнія", en: "California" },
    description: {
      uk: "краб · авокадо · огірок · ікра",
      en: "crab · avocado · cucumber · roe",
    },
    price: 269,
    tags: [],
  },
  {
    id: "r3",
    categoryId: "rolls",
    name: { uk: "Спайсі тунець", en: "Spicy tuna" },
    description: {
      uk: "тунець · спайсі соус · кунжут",
      en: "tuna · spicy sauce · sesame",
    },
    price: 319,
    tags: ["hot"],
  },
  {
    id: "r4",
    categoryId: "rolls",
    name: { uk: "Вега", en: "Vega" },
    description: {
      uk: "авокадо · манго · огірок · тофу",
      en: "avocado · mango · cucumber · tofu",
    },
    price: 239,
    tags: ["vegan", "new"],
  },
  {
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
  },
  {
    id: "b2",
    categoryId: "burgers",
    name: { uk: "Classic", en: "Classic" },
    description: {
      uk: "яловичина · чедер · томат · салат",
      en: "beef · cheddar · tomato · lettuce",
    },
    price: 249,
    tags: [],
  },
  {
    id: "b3",
    categoryId: "burgers",
    name: { uk: "Spicy chicken", en: "Spicy chicken" },
    description: {
      uk: "курка · халапеньо · сирний соус",
      en: "chicken · jalapeño · cheese sauce",
    },
    price: 239,
    tags: ["hot"],
  },
  {
    id: "b4",
    categoryId: "burgers",
    name: { uk: "Beyond vegan", en: "Beyond vegan" },
    description: {
      uk: "рослинна котлета · авокадо · гуакамоле",
      en: "plant-based patty · avocado · guacamole",
    },
    price: 279,
    tags: ["vegan", "new"],
  },
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
