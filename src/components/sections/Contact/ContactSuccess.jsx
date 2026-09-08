import { CheckCircle2, ArrowRight } from "lucide-react";

import { contactData } from "./contactData";

export default function ContactSuccess({ onClose }) {

    return (
        <div className="contact-success">

            <div className="contact-success__icon">
                <CheckCircle2 size={32} />
            </div>


            <span className="contact-success__eyebrow">
                CONVERSATION STARTED
            </span>


            <h2 className="contact-success__title">
                {contactData.success.title}
            </h2>


            <p className="contact-success__description">
                {contactData.success.description}
            </p>


            <div className="contact-success__info">

                <div className="contact-success__item">

                    <span>
                        01
                    </span>

                    <p>
                        We’ll review your message carefully.
                    </p>

                </div>


                <div className="contact-success__item">

                    <span>
                        02
                    </span>

                    <p>
                        We’ll get back to you as soon as we can.
                    </p>

                </div>


                <div className="contact-success__item">

                    <span>
                        03
                    </span>

                    <p>
                        Your information will be treated confidentially.
                    </p>

                </div>

            </div>


            <button
                type="button"
                onClick={onClose}
                className="contact-success__button"
            >

                <span>
                    {contactData.success.button}
                </span>

                <ArrowRight size={18} />

            </button>

        </div>
    );
}