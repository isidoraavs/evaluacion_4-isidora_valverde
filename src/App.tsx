import { useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import type { PageMetadata, PageMetadataByPath, SkipContentEvent, UiElement } from "./types/ui";

const pages: PageMetadataByPath = {
  "/": { title: "Inicio", headingId: "hero-title" },
  "/perfil": { title: "Perfil", headingId: "profile-title" },
  "/proyectos": { title: "Proyectos", headingId: "projects-title" },
  "/contacto": { title: "Contacto", headingId: "contact-title" },
};

function Layout(): UiElement {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef<string | null>(null);
  const pathKey = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const page: PageMetadata = pages[pathKey] ?? {
    title: "Página no encontrada",
    headingId: "not-found-title",
  };

  useEffect((): void => {
    document.title = `${page.title} — Isidora Valverde`;
    if (previousPath.current !== null && previousPath.current !== pathname) {
      window.scrollTo(0, 0);
      main.current?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, page.title]);

  function skipToContent(_event: SkipContentEvent): void {
    main.current?.focus();
  }

  return (
    <>
      <button className="skip-link" type="button" onClick={skipToContent}>
        Saltar al contenido
      </button>
      <Navbar />
      <main
        ref={main}
        id="contenido"
        tabIndex={-1}
        aria-labelledby={page.headingId}
        key={pathname}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <ProfilePage headingLevel="h2" />
                <ProjectsPage headingLevel="h2" showApi={false} />
                <ContactPage headingLevel="h2" showForm={false} />
              </>
            }
          />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route
            path="*"
            element={
              <section className="section-shell profile" aria-labelledby="not-found-title">
                <h1 className="profile__title" id="not-found-title">
                  404 — Página no encontrada
                </h1>
                <Link to="/">Volver al inicio</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App(): UiElement {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
