import React from "react";
import {
    ArrowUpRight,
    Mail,
} from "lucide-react";

import {
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";

import "./footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="footer-brand">

                    <a
                        href="/"
                        className="footer-logo"
                    >
                        Winspiring Minds
                    </a>

                    <p className="footer-role">
                        Leadership Coach &amp;
                        <br />
                        People Development Partner
                    </p>

                    <p className="footer-tagline">
                        Helping people become
                        <br />
                        <span>better leaders.</span>
                    </p>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <div className="footer-column">

                    <h3 className="footer-column-title">
                        EXPLORE
                    </h3>

                    <nav className="footer-links">

                        <a href="#about">
                            About
                            <ArrowUpRight size={14} />
                        </a>

                        <a href="#insights">
                            Insights
                            <ArrowUpRight size={14} />
                        </a>

                        <a href="#framework">
                            Framework
                            <ArrowUpRight size={14} />
                        </a>

                        <a href="#services">
                            Solutions
                            <ArrowUpRight size={14} />
                        </a>

                        <a href="#conversation">
                            Contact
                            <ArrowUpRight size={14} />
                        </a>

                    </nav>

                </div>


                {/* =================================================
                    CONNECT
                ================================================= */}

                <div className="footer-column footer-connect">

                    <h3 className="footer-column-title">
                        CONNECT
                    </h3>

                    <div className="footer-social-links">

                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="footer-social"
                        >
                            <FaLinkedinIn size={17} />
                            <span>LinkedIn</span>
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                            className="footer-social"
                        >
                            <FaYoutube size={18} />
                            <span>YouTube</span>
                        </a>

                        <a
                            href="mailto:hello@sudhirkoka.com"
                            className="footer-social"
                        >
                            <Mail size={17} />
                            <span>Email</span>
                        </a>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM BAR
            ================================================= */}

            <div className="footer-bottom">

                <div className="footer-bottom-container">

                    <p>
                        © {currentYear} Sudhir Koka.
                        All rights reserved.
                    </p>

                    <div className="footer-legal">

                        <a href="#">
                            Privacy Policy
                        </a>

                        <span>•</span>

                        <a href="#">
                            Terms
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
