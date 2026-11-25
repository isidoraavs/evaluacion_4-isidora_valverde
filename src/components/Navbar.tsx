import {Link,NavLink} from "react-router-dom";import {useTheme} from "../context/ThemeContext";export function Navbar(){const {theme,toggle}=useTheme();return (<header className="header">
        <div className="header__inner">
            <Link className="header__wordmark" to="/" aria-label="Isidora Valverde, inicio">IV<span>.</span></Link>
            <nav aria-label="Navegación principal">
                <ul className="header__nav-list">
                    <li><NavLink to="/perfil">Perfil</NavLink></li>
                    <li><NavLink to="/proyectos">Proyectos</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                </ul>
            </nav><button type="button" className="header__theme" onClick={toggle} aria-label="Cambiar tema" aria-pressed={theme === "dark"}>{theme === "dark" ? "Claro" : "Oscuro"}</button>
            <a className="header__cta" href="https://github.com/isidoraavs" target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
            </a>
        </div>
    </header>);}