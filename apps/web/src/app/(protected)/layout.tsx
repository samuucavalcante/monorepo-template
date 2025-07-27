import { AppSidebar } from "@/shared/components/app-sidebar";
import HeaderLayout from "@/shared/components/header-layout";
import { SidebarProvider } from "@/shared/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <HeaderLayout />

        <div className="mx-4 mt-2">{children}</div>
      </main>
    </SidebarProvider>
  );
}
