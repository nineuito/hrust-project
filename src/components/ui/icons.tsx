import {
  MagnifyingGlass,
  ShoppingCart,
  List as ListIcon,
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  Plus,
  Minus,
  Flame,
  Plant,
  Sparkle,
  Trophy,
  InstagramLogo,
  TelegramLogo,
  TiktokLogo,
  FacebookLogo,
  CaretRight,
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  Crosshair,
  Pizza,
  Hamburger,
  Fish,
  IceCream,
  Coffee,
  Medal,
} from "@phosphor-icons/react/dist/ssr";

export const Icon = {
  Search: MagnifyingGlass,
  Cart: ShoppingCart,
  Menu: ListIcon,
  Close: X,
  Phone,
  Pin: MapPin,
  Clock,
  Star,
  Plus,
  Minus,
  Hot: Flame,
  Vegan: Plant,
  New: Sparkle,
  Trophy,
  Medal,
  Instagram: InstagramLogo,
  Telegram: TelegramLogo,
  Tiktok: TiktokLogo,
  Facebook: FacebookLogo,
  CaretRight,
  ArrowRight,
  Check: CheckCircle,
  Download: DownloadSimple,
  Crosshair,
} as const;

export const CategoryIcon = {
  pizza: Pizza,
  rolls: Fish,
  burgers: Hamburger,
  desserts: IceCream,
  drinks: Coffee,
} as const;

export type CategoryIconId = keyof typeof CategoryIcon;

export const DIET_ICON = {
  hot: Icon.Hot,
  vegan: Icon.Vegan,
  new: Icon.New,
} as const;

export type DietIconId = keyof typeof DIET_ICON;
