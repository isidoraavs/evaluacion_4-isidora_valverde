import { ContactForm } from "../components/ContactForm";
import type { ContactPageProps, UiElement } from "../types/ui";

export function ContactPage({ showForm = true, headingLevel = "h1" }: ContactPageProps): UiElement {
    const Heading = headingLevel;

    return (
        <section className="contact section-shell" id="contacto" aria-labelledby="contact-title">
            <div className="section-kicker"><span>03</span><span>HABLEMOS</span></div>
            <div className="contact__content">
                <div>
                    <p className="contact__overline">¿TIENES UNA IDEA O PROYECTO?</p>
                    <Heading className="contact__title" id="contact-title">Las buenas cosas<br />empiezan <span>conectando.</span></Heading>
                </div>
                <div className="contact__action">
                    <p>Estoy abierta a conversar sobre desarrollo, tecnología y aprendizaje.</p>
                    <div className="contact__links">
                        <a className="contact__button contact__email-button" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=ivalverde2026%40alu.uct.cl" target="_blank" rel="noopener noreferrer">Redactar correo en Gmail <span aria-hidden="true">↗</span></a>
                        <a className="contact__button contact__github-button" href="https://github.com/isidoraavs" target="_blank" rel="noopener noreferrer">Encuéntrame en GitHub <span aria-hidden="true">↗</span></a>
                    </div>
                    <p className="contact__email">¿Prefieres tu aplicación de correo? <a href="mailto:ivalverde2026@alu.uct.cl">Abrir correo</a></p>
                    <p className="contact__address">ivalverde2026@alu.uct.cl</p>
                </div>
            </div>
            {showForm && <ContactForm />}
        </section>
    );
}
