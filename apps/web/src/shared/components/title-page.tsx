"use client";

import { menuItems } from "@/shared/constants/menu";
import { usePathname } from "next/navigation";

export default function TitlePage() {
  const pathname = usePathname();

  const menuCurrent =
    menuItems.find((item) => item.url !== "/" && pathname.includes(item.url)) ||
    menuItems[0];

  if (!menuCurrent) return null;

  return (
    <header className="flex justify-center items-center gap-2 ">
      <menuCurrent.icon className="w-4 h-4" />
      <h1 className="text-lg cursor-default">{menuCurrent.title}</h1>
    </header>
  );
}
