import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";
// import { ApartmentDetailsPage } from "./pages/ApartmentDetailsPage.tsx";
import { ApartmentPage } from "./pages/ApartmentPage.tsx";
import { ApartmentsListPage } from "./pages/ApartmentsListPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFoundPage.tsx";
import { LogoPreviewPage } from "./previews/LogoPreviewPage.tsx";
import "./styles/app.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<ApartmentsListPage />} />
            <Route path="/apartments" element={<ApartmentsListPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/apartments/:apartmentId" element={<ApartmentDetailsPage />} /> */}
            <Route path="/apartments/:apartmentId" element={<ApartmentPage />} />
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
