import {
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaFacebook,
} from "react-icons/fa";

import "../../styles/insights.css";

const socialLinks = [
    {
        id: "instagram",
        label: "Instagram",
        icon: FaInstagram,
        href: "https://www.instagram.com/winspiring_minds",
        className: "social-link--instagram",
    },
    {
        id: "youtube",
        label: "YouTube",
        icon: FaYoutube,
        href: "https://youtube.com/@winspiringminds",
        className: "social-link--youtube",
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        icon: FaLinkedinIn,
        href: "https://www.linkedin.com/in/sudhir-koka-53086328",
        className: "social-link--linkedin",
    },
    {
        id:"facebook",
        label:"Facebook",
        icon:FaFacebook,
        href:"https://www.facebook.com/winspiringminds",
        className:"social-link--facebook"
    }
];

export default function SocialLinksCard() {
    return (
        <section className="insights-social-card">
            <div className="insights-social-heading">
                STAY CONNECTED
            </div>
            <p className="insights-social-copy">
    Follow the conversation beyond the insights.
    <br />
    Ideas, stories and practical leadership thinking —
    wherever you spend your time.
</p>
            <div className="insights-social-links">
                {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                        <a
                            key={social.id}
                            href={social.href}
                            className={`insights-social-link ${social.className}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon className="insights-social-icon" />
                            <span className="insights-social-label">
                                {social.label}
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}