import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";
import { ApartmentDetailsPage } from "./pages/ApartmentDetailsPage.tsx";
import { ApartmentsListPage } from "./pages/ApartmentsListPage.tsx";
import NotFound from "./pages/NotFoundPage.tsx";
import { LogoPreviewPage } from "./previews/LogoPreviewPage.tsx";

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<ApartmentsListPage />} />
            <Route path="/apartments/:apartmentId" element={<ApartmentDetailsPage />} />
            <Route path="/not-found" element={<NotFound />} />
          </Route>
          <Route path="/preview/logos" element={<LogoPreviewPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
