import type { SectionPageProps, UiElement } from "../types/ui";

export function ProfilePage({ headingLevel = "h1" }: SectionPageProps): UiElement {
    const Heading = headingLevel;

    return (
        <section className="profile section-shell" id="perfil" aria-labelledby="profile-title">
            <div className="section-kicker"><span>01</span><span>UN POCO SOBRE MÍ</span></div>
            <div className="profile__copy">
                <Heading className="profile__title" id="profile-title">Curiosidad por dentro.<br /><span>Intención en cada detalle.</span></Heading>
                <div className="profile__description">
                    <p>Curso mi segundo semestre en la Universidad Católica de Temuco. Disfruto aprender cómo se conectan el diseño de interfaces y la tecnología que las hace funcionar.</p>
                    <p>Hoy estoy enfocando mi aprendizaje en <strong>desarrollo frontend</strong> y <strong>ciberseguridad</strong>, con especial interés en crear experiencias digitales accesibles y bien estructuradas.</p>
                </div>
            </div>
            <ul className="profile__interest-list" aria-label="Áreas de interés">
                <li><span>01</span> Desarrollo frontend</li>
                <li><span>02</span> Ciberseguridad</li>
                <li><span>03</span> Accesibilidad web</li>
            </ul>
        </section>
    );
}
