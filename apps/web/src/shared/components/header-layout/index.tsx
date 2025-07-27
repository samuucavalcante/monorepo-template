import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import TitlePage from "@/shared/components/title-page";
import { ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/shared/components/theme-toggle";

export default function HeaderLayout() {
  return (
    <div className="flex justify-between items-center w-full px-2 py-2.5 space-x-2 border-b border-white/10">
      <div className="gap-2 flex items-center">
        <SidebarTrigger className="cursor-pointer" />{" "}
        <ChevronRight className="size-4" /> <TitlePage />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
