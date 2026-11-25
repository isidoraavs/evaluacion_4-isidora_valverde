import {Link} from "react-router-dom";export function HomePage(){return (<section className="hero" id="inicio" aria-labelledby="hero-title">
            <div className="hero__grid" aria-hidden="true"></div>
            <div className="hero__content">
                <p className="hero__eyebrow"><span className="hero__status-dot"></span> PORTAFOLIO ACADÉMICO <span className="hero__eyebrow-year">· 2026</span></p>
                <h1 id="hero-title">Construyendo<br />lo que viene<span className="hero__period">.</span></h1>
                <p className="hero__intro">Hola, soy <strong>Isidora Valverde</strong>, estudiante de Ingeniería Civil en Informática. Me interesa crear tecnología clara, accesible y segura.</p>
                <Link className="hero__text-link" to="/proyectos">Explorar mi trabajo <span aria-hidden="true">↓</span></Link>
            </div>
            <figure className="hero__art">
                <div className="hero__photo-orbit hero__orbit-one" aria-hidden="true"></div>
                <div className="hero__photo-orbit hero__orbit-two" aria-hidden="true"></div>
                <div className="hero__photo-orbit hero__orbit-three" aria-hidden="true"></div>
                <img className="hero__photo" src="/img/isidora-valverde.jpeg" alt="Isidora Valverde, estudiante de Ingeniería Civil en Informática." />
                <figcaption className="hero__photo-caption"><span>ISIDORA VALVERDE</span><span>UCT · INFORMÁTICA</span></figcaption>
                <span className="hero__photo-cross hero__cross-one" aria-hidden="true">+</span>
                <span className="hero__photo-cross hero__cross-two" aria-hidden="true">+</span>
            </figure>
            <div className="hero__index" aria-hidden="true">01 — 03</div>
        </section>);}