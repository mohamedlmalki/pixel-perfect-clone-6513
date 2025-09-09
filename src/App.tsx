import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/app-layout";
import { VerificationDashboard } from "./components/verification-dashboard";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<VerificationDashboard initialTab="single" />} />
            <Route path="bulk" element={<VerificationDashboard initialTab="bulk" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;