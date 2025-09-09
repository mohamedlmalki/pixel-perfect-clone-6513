import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VerificationDashboard } from "@/components/verification-dashboard";

const BulkVerification = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <VerificationDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BulkVerification;