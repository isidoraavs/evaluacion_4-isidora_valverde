import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import type { NavigationLinkState, UiElement } from "../types/ui";
import "./Navbar.css";

function navigationClass({ isActive }: NavigationLinkState): string {
  return isActive ? "header__link header__link--active" : "header__link";
}

function wordmarkClass({ isActive }: NavigationLinkState): string {
  return isActive ? "header__wordmark header__wordmark--active" : "header__wordmark";
}

export function Navbar(): UiElement {
  const { theme, toggle } = useTheme();

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink
          className={wordmarkClass}
          to="/"
          end
          aria-label="Isidora Valverde, inicio"
        >
          IV<span aria-hidden="true">.</span>
        </NavLink>
        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            <li><NavLink className={navigationClass} to="/perfil">Perfil</NavLink></li>
            <li><NavLink className={navigationClass} to="/proyectos">Proyectos</NavLink></li>
            <li><NavLink className={navigationClass} to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>
        <button
          type="button"
          className="header__theme"
          onClick={toggle}
          aria-label="Tema oscuro"
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "Claro" : "Oscuro"}
        </button>
        <a
          className="header__cta"
          href="https://github.com/isidoraavs"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
