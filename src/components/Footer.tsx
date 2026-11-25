import {Link} from "react-router-dom";export function Footer(){return (<footer className="footer">
        <Link className="header__wordmark footer__mark" to="/" aria-label="Volver al inicio">IV<span>.</span></Link>
        <p>Hecho con curiosidad en Temuco, Chile.</p>
        <p className="footer__copy">© 2026 Isidora Valverde Santibáñez · ICINF1107</p>
    </footer>);}