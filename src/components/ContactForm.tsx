import { useEffect, useRef, useState } from "react";
import type {
  ContactFieldChangeEvent,
  ContactFieldName,
  ContactFields,
  ContactFormErrors,
  ContactFormStatus,
  ContactSubmitEvent,
  UiElement,
} from "../types/ui";
import "./ContactForm.css";

export function ContactForm(): UiElement {
  const [fields, setFields] = useState<ContactFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  useEffect((): void => {
    if (status !== "invalid") return;
    if (errors.name) nameInput.current?.focus();
    else if (errors.email) emailInput.current?.focus();
    else if (errors.message) messageInput.current?.focus();
  }, [errors, status]);

  function updateField(field: ContactFieldName, value: string): void {
    setFields((current: ContactFields): ContactFields => ({ ...current, [field]: value }));
    setErrors((current: ContactFormErrors): ContactFormErrors => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submit(event: ContactSubmitEvent): void {
    event.preventDefault();
    const nextErrors: ContactFormErrors = {};
    if (!fields.name.trim()) nextErrors.name = "Escribe tu nombre.";
    if (!fields.email.trim()) nextErrors.email = "Escribe tu correo electrónico.";
    else if (emailInput.current?.validity.valid !== true) {
      nextErrors.email = "Escribe un correo válido, por ejemplo nombre@dominio.cl.";
    }
    if (!fields.message.trim()) nextErrors.message = "Escribe el mensaje que quieres preparar.";

    setErrors(nextErrors);
    setStatus(Object.keys(nextErrors).length > 0 ? "invalid" : "ready");
  }

  const mailto = "mailto:ivalverde2026@alu.uct.cl?subject="
    + encodeURIComponent(`Contacto de ${fields.name.trim()}`)
    + "&body=" + encodeURIComponent(`${fields.message.trim()}\n\nCorreo de respuesta: ${fields.email.trim()}`);

  return (
    <form className="contact-form" noValidate onSubmit={submit} aria-labelledby="contact-form-title">
      <h2 className="contact-form__title" id="contact-form-title">Formulario de contacto</h2>
      <p className="contact-form__intro">Prepara tu mensaje y ábrelo en tu aplicación de correo para enviarlo.</p>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-name">Nombre</label>
        <input
          ref={nameInput}
          className="contact-form__input"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={fields.name}
          onChange={(event: ContactFieldChangeEvent): void => updateField("name", event.currentTarget.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && <p className="contact-form__error" id="contact-name-error">{errors.name}</p>}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-email">Correo electrónico</label>
        <input
          ref={emailInput}
          className="contact-form__input"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={(event: ContactFieldChangeEvent): void => updateField("email", event.currentTarget.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && <p className="contact-form__error" id="contact-email-error">{errors.email}</p>}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">Mensaje</label>
        <textarea
          ref={messageInput}
          className="contact-form__input contact-form__input--message"
          id="contact-message"
          name="message"
          required
          value={fields.message}
          onChange={(event: ContactFieldChangeEvent): void => updateField("message", event.currentTarget.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && <p className="contact-form__error" id="contact-message-error">{errors.message}</p>}
      </div>

      <button className="contact-form__submit" type="submit">Preparar mensaje</button>
      {status === "invalid" && (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          Revisa los campos indicados para preparar el mensaje.
        </p>
      )}
      <div className="contact-form__result" role="status" aria-live="polite" aria-atomic="true">
        {status === "ready" && (
          <>
            <p className="contact-form__feedback">Mensaje validado. Ya puedes abrirlo en tu correo.</p>
            <a className="contact-form__mail-link" href={mailto}>Abrir correo para enviar</a>
          </>
        )}
      </div>
    </form>
  );
}
