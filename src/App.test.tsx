// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/GitHubProjects", () => ({ GitHubProjects: () => <section aria-label="Repositorios" /> }));

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

describe("rutas y foco", () => {
  it.each(["/", "/perfil", "/proyectos", "/contacto", "/ruta-inexistente"])(
    "presenta un único encabezado principal en %s", (path: string) => {
      window.history.replaceState({}, "", path);
      render(<App />);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(document.title).toContain("Isidora Valverde");
      if (path === "/ruta-inexistente") {
        expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("404");
      }
    },
  );

  it("conserva el foco inicial y lo lleva a main al navegar o saltar", () => {
    const previousControl = document.createElement("button");
    document.body.append(previousControl);
    previousControl.focus();
    render(<App />);
    expect(document.activeElement).toBe(previousControl);
    fireEvent.click(screen.getByRole("link", { name: "Perfil" }));
    expect(document.activeElement).toBe(screen.getByRole("main"));
    fireEvent.click(screen.getByRole("button", { name: "Saltar al contenido" }));
    expect(document.activeElement).toBe(screen.getByRole("main"));
    previousControl.remove();
  });
});
