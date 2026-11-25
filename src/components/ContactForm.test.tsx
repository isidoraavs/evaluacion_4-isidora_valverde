// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("asocia errores con los campos y enfoca el primero", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Preparar mensaje" }));
    const name = screen.getByLabelText("Nombre");
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(name.getAttribute("aria-describedby")).toBe("contact-name-error");
    expect(document.getElementById("contact-name-error")?.textContent).toBe("Escribe tu nombre.");
  });

  it("rechaza un correo con dos arrobas mediante la validez HTML", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Isidora" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "a@@b.com" } });
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Hola" } });
    fireEvent.click(screen.getByRole("button", { name: "Preparar mensaje" }));
    const email = screen.getByLabelText("Correo electrónico");
    expect(document.activeElement).toBe(email);
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(screen.queryByRole("link", { name: "Abrir correo para enviar" })).toBeNull();
  });

  it("prepara un mailto válido y retira la confirmación cuando se edita", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Isidora" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "isidora@example.com" } });
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Una idea & un proyecto" } });
    fireEvent.click(screen.getByRole("button", { name: "Preparar mensaje" }));
    const link = screen.getByRole("link", { name: "Abrir correo para enviar" });
    const href = new URL(link.getAttribute("href") ?? "");
    expect(href.protocol).toBe("mailto:");
    expect(href.pathname).toBe("ivalverde2026@alu.uct.cl");
    expect(href.searchParams.get("subject")).toBe("Contacto de Isidora");
    expect(href.searchParams.get("body")).toContain("Una idea & un proyecto");
    expect(href.searchParams.get("body")).toContain("isidora@example.com");
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Otra idea" } });
    expect(screen.queryByRole("link", { name: "Abrir correo para enviar" })).toBeNull();
  });
});
