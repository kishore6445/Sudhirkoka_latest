import React from "react";
import "./cta.css";
import { useContact } from "../../sections/Contact/ContactContext";

const CTA = () => {
    const { openModal } = useContact();

    return (
        <section className="cta-section">
            <div className="cta-container">

                {/* Decorative Elements */}
                <div className="cta-circle cta-circle--one" />
                <div className="cta-circle cta-circle--two" />

                <div className="cta-content">

                    <span className="cta-eyebrow">
                        READY TO WIN?
                    </span>

                    <h2 className="cta-heading">
                        Stronger leadership starts
                        <br />
                        <span>with a conversation.</span>
                    </h2>

                    <p className="cta-description">
                        Whether you're developing yourself, your leaders,
                        or your organisation,<br /> let's explore what's possible.
                    </p>

                    <button
                        type="button"
                        className="cta-button"
                        onClick={openModal}
                    >
                        Let's Talk
                    </button>

                </div>

            </div>
        </section>
    );
};

export default CTA;
