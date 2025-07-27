import { Home } from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const menuItems: MenuItem[] = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
] as const;
