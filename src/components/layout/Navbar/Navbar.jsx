
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.png";
import Button from "../../common/Button/Button";
import { useContact } from "../../sections/Contact/ContactContext";
import "./Navbar.css";

const navLinks = [
    {
        label: "Home",
        href: "#home",
    },
    {
        label: "Insights",
        href: "#insights",
    },
    {
        label: "Challenges",
        href: "#challenges",
    },
    {
        label: "Framework",
        href: "#framework",
    },
    {
        label: "Services",
        href: "#services",
    },
    {
        label: "About",
        href: "#about",
    },
];

function Navbar({ light = false }) {
    const { openModal } = useContact();
    const location = useLocation();

    const isHome = location.pathname === "/";

    const sectionHref = (href) =>
        isHome ? href : `/${href}`;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* =====================================================
                DESKTOP / MAIN NAVBAR
            ===================================================== */}

            <header
                className={`navbar ${
                    light ? "navbar--light" : ""
                } ${
                    isScrolled
                        ? "navbar--scrolled"
                        : ""
                }`}
            >
                <div className="navbar__container">

                    {/* Logo */}

                    <a
                        href={sectionHref("#home")}
                        className="navbar__logo"
                        onClick={closeMenu}
                        aria-label="Winspiring Minds - Home"
                    >
                        <img
                            src={logo}
                            alt="Winspiring Minds"
                            className="navbar__brand-logo"
                        />
                    </a>


                    {/* Desktop Navigation */}

                    <nav
                        className="navbar__nav"
                        aria-label="Main navigation"
                    >
                        <ul className="navbar__list">

                            {navLinks.map((link) => (
                                <li
                                    key={link.label}
                                    className="navbar__item"
                                >
                                    <a
                                        href={sectionHref(link.href)}
                                        className="navbar__link"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </nav>


                    {/* Desktop CTA */}

                    <div className="navbar__actions">
                        <Button
                            variant={
                                isScrolled
                                    ? "dark"
                                    : "primary"
                            }
                            className="navbar__cta"
                            onClick={openModal}
                        >
                            Let's Talk
                        </Button>
                    </div>


                    {/* Mobile Toggle */}

                    <button
                        type="button"
                        className="navbar__mobile-toggle"
                        onClick={() =>
                            setIsMenuOpen(true)
                        }
                        aria-label="Open navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <Menu size={24} />
                    </button>

                </div>
            </header>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            <div
                className={`mobile-menu ${
                    isMenuOpen
                        ? "mobile-menu--open"
                        : ""
                }`}
                aria-hidden={!isMenuOpen}
            >

                {/* Overlay */}

                <div
                    className="mobile-menu__overlay"
                    onClick={closeMenu}
                />


                {/* Drawer */}

                <aside
                    className="mobile-menu__drawer"
                    aria-label="Mobile navigation"
                >

                    {/* Mobile Header */}

                    <div className="mobile-menu__header">

                        <a
                            href={sectionHref("#home")}
                            className="mobile-menu__logo"
                            onClick={closeMenu}
                            aria-label="Winspiring Minds - Home"
                        >
                            <img
                                src={logo}
                                alt="Winspiring Minds"
                                className="mobile-menu__brand-logo"
                            />
                        </a>

                        <button
                            type="button"
                            className="mobile-menu__close"
                            onClick={closeMenu}
                            aria-label="Close navigation menu"
                        >
                            <X size={24} />
                        </button>

                    </div>


                    {/* Mobile Navigation */}

                    <nav
                        className="mobile-menu__nav"
                        aria-label="Mobile navigation links"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={sectionHref(link.href)}
                                className="mobile-menu__link"
                                onClick={closeMenu}
                            >
                                <span>
                                    {link.label}
                                </span>

                                <span
                                    className="mobile-menu__arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </a>
                        ))}
                    </nav>


                    {/* Mobile CTA */}

                    <div className="mobile-menu__footer">

                        <Button
                            variant="dark"
                            className="mobile-menu__cta"
                            onClick={() => {
                                closeMenu();
                                openModal();
                            }}
                        >
                            Let's Talk
                        </Button>

                    </div>

                </aside>

            </div>
        </>
    );
}

export default Navbar;

