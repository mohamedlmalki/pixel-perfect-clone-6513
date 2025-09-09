import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col pl-6">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
            <SidebarTrigger className="lg:hidden" />
          </header>
          {/* The Outlet will render the correct page content based on the URL */}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}