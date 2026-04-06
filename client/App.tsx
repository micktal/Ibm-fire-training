import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/lib/userContext";
import { LanguageProvider } from "@/lib/languageContext";
import Index from "./pages/Index";
import Form from "./pages/Form";
import Hub from "./pages/Hub";
import ModulePage from "./pages/ModulePage";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import BuilderPage from "./pages/BuilderPage";
import ChapterIntroPage from "./pages/ChapterIntroPage";
import CertificatePage from "./pages/CertificatePage";
import AdminPage from "./pages/AdminPage";
import FichePage from "./pages/FichePage";
import FicheAllPage from "./pages/FicheAllPage";
import PresentationPage from "./pages/PresentationPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/form" element={<Form />} />
                <Route path="/hub" element={<Hub />} />
                <Route path="/module/:id" element={<ModulePage />} />
                <Route path="/chapter-intro/:chapter" element={<ChapterIntroPage />} />
                <Route path="/certificat" element={<CertificatePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/fiche/:id" element={<FichePage />} />
                <Route path="/fiches" element={<FicheAllPage />} />
                <Route path="/presentation" element={<PresentationPage />} />
                {/* Pages Builder.io — catch-all avant NotFound */}
                <Route path="/builder/:slug" element={<BuilderPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNav />
            </BrowserRouter>
          </UserProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
