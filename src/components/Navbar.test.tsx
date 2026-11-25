// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../context/ThemeContext";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("marca la ruta activa mediante aria-current y un modificador BEM", () => {
    render(<ThemeProvider><MemoryRouter initialEntries={["/perfil"]}><Navbar /></MemoryRouter></ThemeProvider>);
    const profile = screen.getByRole("link", { name: "Perfil" });
    expect(profile.getAttribute("aria-current")).toBe("page");
    expect(profile.classList.contains("header__link--active")).toBe(true);
    expect(screen.getByRole("link", { name: "Proyectos" }).getAttribute("aria-current")).toBeNull();
  });

  it("expone el cambio de tema mediante el estado del botón", () => {
    render(<ThemeProvider><MemoryRouter><Navbar /></MemoryRouter></ThemeProvider>);
    const button = screen.getByRole("button", { name: "Tema oscuro" });
    const before = button.getAttribute("aria-pressed");
    fireEvent.click(button);
    expect(button.getAttribute("aria-pressed")).toBe(before === "true" ? "false" : "true");
  });
});
