import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { menuItems } from "@/shared/constants/menu";

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex items-center px-4 py-3 space-x-2 border-b border-foreground/10">
        <div className="w-5 h-5 rounded-full border-2 border-foreground" />
        <span className="font-semibold text-foreground">Acme Inc.</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Minha Barbearia</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
