import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";
// import { ApartmentDetailsPage } from "./pages/ApartmentDetailsPage.tsx";
import { ApartmentPage } from "./pages/ApartmentPage.tsx";
import { ApartmentsListPage } from "./pages/ApartmentsListPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFoundPage.tsx";
import { LogoPreviewPage } from "./previews/LogoPreviewPage.tsx";
import "./styles/app.css";

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
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
