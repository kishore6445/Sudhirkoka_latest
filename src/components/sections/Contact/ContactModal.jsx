import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useContact } from "./ContactContext";

import ContactForm from "./ContactForm";
import ContactSuccess from "./ContactSuccess";

import "./Contact.css";

export default function ContactModal() {
    const {
        isOpen,
        closeModal,
    } = useContact();

    const [
        submitted,
        setSubmitted,
    ] = useState(false);


    /* =====================================================
       LOCK PAGE SCROLL
    ===================================================== */

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    useEffect(() => {

        const handleEscape = (event) => {

            if (event.key === "Escape") {
                handleClose();
            }

        };


        if (isOpen) {
            window.addEventListener(
                "keydown",
                handleEscape
            );
        }


        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, [isOpen]);


    /* =====================================================
       CLOSE
    ===================================================== */

    const handleClose = () => {

        closeModal();


        setTimeout(() => {
            setSubmitted(false);
        }, 250);

    };


    if (!isOpen) {
        return null;
    }


    return (
        <div
            className="contact-modal"
            onClick={handleClose}
            role="presentation"
        >

            <div
                className="contact-modal__dialog"
                onClick={(event) =>
                    event.stopPropagation()
                }
                role="dialog"
                aria-modal="true"
                aria-label="Start the conversation"
            >

                <button
                    type="button"
                    className="contact-modal__close"
                    onClick={handleClose}
                    aria-label="Close dialog"
                >
                    <X size={24} />
                </button>


                {submitted ? (

                    <ContactSuccess
                        onClose={handleClose}
                    />

                ) : (

                    <ContactForm
                        onSuccess={() =>
                            setSubmitted(true)
                        }
                    />

                )}

            </div>

        </div>
    );
}
