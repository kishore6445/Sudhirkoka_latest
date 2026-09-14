import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { contactData } from "./contactData";

export default function ContactForm({ onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        identity: "",
        otherIdentity: "",

        name: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",

        actions: [],
        message: "",

        assistance: "",

        responseMethod: "",

        anonymous: "",
    });


    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    const handleOptionChange = (
        event,
        field
    ) => {
        const {
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };


    const handleActionChange = (event) => {
        const {
            value,
            checked,
        } = event.target;

        setForm((previous) => ({
            ...previous,

            actions: checked
                ? [
                    ...previous.actions,
                    value,
                ]
                : previous.actions.filter(
                    (item) => item !== value
                ),
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        const fields = {
            "I am a":
                form.identity === "Other"
                    ? `Other: ${form.otherIdentity}`
                    : form.identity,
            "Name": form.name,
            "Email": form.email,
            "Phone": form.phone,
            "Organization": form.organization,
            "Designation": form.designation,
            "What would you like to do": form.actions.join(", "),
            "Message": form.message,
            "Assistance Needed": form.assistance,
            "Preferred Response Method": form.responseMethod,
            "Response Preference": form.anonymous,
        };

        try {
            const response = await fetch("/api/forms/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formKey: "lets-talk",
                    fields,
                    replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                        ? form.email
                        : undefined,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(
                    data.error || "Something went wrong. Please try again."
                );
            }

            onSuccess();
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setLoading(false);
        }
    };


    const {
        modal,
        sections,
        identityOptions,
        actionOptions,
        assistanceOptions,
        responseOptions,
        anonymousOptions,
        fields,
        notice,
        submitButton,
    } = contactData;


    return (
        <form
            className="contact-form"
            onSubmit={handleSubmit}
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="contact-form__header">

                <span className="contact-form__badge">
                    {modal.badge}
                </span>


                <h2 className="contact-form__title">
                    Have Something on Your Mind?
                    <br />

                    <span>
                        Let’s Talk. We are Listening.
                    </span>
                </h2>


                <div className="contact-form__subtitle">
                    {modal.description}
                </div>


                <p className="contact-form__reassurance">
                    {modal.reassurance}
                </p>

            </div>


            {/* =====================================================
                FORM BODY
            ===================================================== */}

            <div className="contact-form__body">


                {/* =================================================
                    01 — ABOUT YOU
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.aboutYou.number}
                        </span>

                        <div>
                            <h3 className="contact-form__section-title">
                                {sections.aboutYou.title}
                            </h3>

                            <span className="contact-form__section-note">
                                {sections.aboutYou.note}
                            </span>
                        </div>

                    </div>


                    <p className="contact-form__question">
                        {sections.aboutYou.question}
                    </p>


                    <div className="contact-form__options">

                        {identityOptions.map((option) => (

                            <label
                                className="contact-form__option"
                                key={option}
                            >

                                <input
                                    type="radio"
                                    name="identity"
                                    value={option}
                                    checked={
                                        form.identity === option
                                    }
                                    onChange={(event) =>
                                        handleOptionChange(
                                            event,
                                            "identity"
                                        )
                                    }
                                />

                                <span className="contact-form__radio" />

                                <span>
                                    {option}
                                </span>

                            </label>

                        ))}

                    </div>


                    {/* IDENTITY DETAILS */}

                    {form.identity &&
                        form.identity !== "Other" && (

                            <div className="contact-form__identity-fields">

                                <div className="contact-form__grid">

                                    <div className="contact-form__group">

                                        <label htmlFor="contact-name">
                                            {fields.name.label}
                                            <span className="required">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            placeholder={
                                                fields.name.placeholder
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="contact-form__group">

                                        <label htmlFor="contact-email">
                                            {fields.email.label}
                                            <span className="required">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            placeholder={
                                                fields.email.placeholder
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="contact-form__group">

                                        <label htmlFor="contact-phone">
                                            {fields.phone.label}
                                        </label>

                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            placeholder={
                                                fields.phone.placeholder
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="contact-form__group">

                                        <label htmlFor="contact-organization">
                                            {fields.organization.label}
                                        </label>

                                        <input
                                            id="contact-organization"
                                            type="text"
                                            name="organization"
                                            value={form.organization}
                                            placeholder={
                                                fields.organization.placeholder
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="contact-form__group">

                                        <label htmlFor="contact-designation">
                                            {fields.designation.label}
                                        </label>

                                        <input
                                            id="contact-designation"
                                            type="text"
                                            name="designation"
                                            value={form.designation}
                                            placeholder={
                                                fields.designation.placeholder
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>

                        )}


                    {form.identity === "Other" && (

                        <div className="contact-form__other-field">

                            <label htmlFor="otherIdentity">
                                Please tell us
                            </label>

                            <input
                                id="otherIdentity"
                                type="text"
                                name="otherIdentity"
                                value={form.otherIdentity}
                                placeholder="Tell us how you would describe yourself..."
                                onChange={handleChange}
                            />

                        </div>

                    )}

                </section>


                {/* =================================================
                    02 — WHAT WOULD YOU LIKE TO DO?
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.whatWouldYouLikeToDo.number}
                        </span>

                        <h3 className="contact-form__section-title">
                            {sections.whatWouldYouLikeToDo.title}
                        </h3>

                    </div>


                    <p className="contact-form__question">
                        {sections.whatWouldYouLikeToDo.question}
                    </p>


                    <div className="contact-form__options">

                        {actionOptions.map((option) => (

                            <label
                                className="contact-form__option"
                                key={option}
                            >

                                <input
                                    type="checkbox"
                                    name="actions"
                                    value={option}
                                    checked={form.actions.includes(option)}
                                    onChange={handleActionChange}
                                />

                                <span className="contact-form__checkbox" />

                                <span>
                                    {option}
                                </span>

                            </label>

                        ))}

                    </div>

                </section>


                {/* =================================================
                    03 — MESSAGE
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.message.number}
                        </span>

                        <div>

                            <h3 className="contact-form__section-title">
                                {sections.message.title}
                            </h3>

                            {/* <span className="contact-form__section-note">
                                We may edit your message to make it reader friendly.
                            </span> */}

                        </div>

                    </div>


                    <p className="contact-form__question">
                        {sections.message.question}
                        <span className="required">
                            *
                        </span>
                    </p>


                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what is on your mind..."
                        required
                    />


                    <p className="contact-form__message-note">
                        {sections.message.note}
                    </p>

                </section>


                {/* =================================================
                    04 — ASSISTANCE
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.assistance.number}
                        </span>

                        <h3 className="contact-form__section-title">
                            {sections.assistance.title}
                        </h3>

                    </div>


                    <p className="contact-form__question">
                        {sections.assistance.question}
                    </p>


                    <div className="contact-form__options">

                        {assistanceOptions.map((option) => (

                            <label
                                className="contact-form__option"
                                key={option}
                            >

                                <input
                                    type="radio"
                                    name="assistance"
                                    value={option}
                                    checked={
                                        form.assistance === option
                                    }
                                    onChange={(event) =>
                                        handleOptionChange(
                                            event,
                                            "assistance"
                                        )
                                    }
                                />

                                <span className="contact-form__radio" />

                                <span>
                                    {option}
                                </span>

                            </label>

                        ))}

                    </div>

                </section>


                {/* =================================================
                    05 — RESPONSE
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.response.number}
                        </span>

                        <h3 className="contact-form__section-title">
                            {sections.response.title}
                        </h3>

                    </div>


                    <div className="contact-form__options">

                        {responseOptions.map((option) => (

                            <label
                                className="contact-form__option"
                                key={option}
                            >

                                <input
                                    type="radio"
                                    name="responseMethod"
                                    value={option}
                                    checked={
                                        form.responseMethod === option
                                    }
                                    onChange={(event) =>
                                        handleOptionChange(
                                            event,
                                            "responseMethod"
                                        )
                                    }
                                />

                                <span className="contact-form__radio" />

                                <span>
                                    {option}
                                </span>

                            </label>

                        ))}

                    </div>

                </section>


                {/* =================================================
                    06 — ANONYMOUS
                ================================================= */}

                <section className="contact-form__section">

                    <div className="contact-form__section-header">

                        <span className="contact-form__section-number">
                            {sections.anonymous.number}
                        </span>

                        <h3 className="contact-form__section-title">
                            {sections.anonymous.title}
                        </h3>

                    </div>


                    <div className="contact-form__anonymous">

                        {anonymousOptions.map((option, index) => (

                            <label
                                className="contact-form__option"
                                key={option}
                            >

                                <input
                                    type="radio"
                                    name="anonymous"
                                    value={option}
                                    checked={
                                        form.anonymous === option
                                    }
                                    onChange={(event) =>
                                        handleOptionChange(
                                            event,
                                            "anonymous"
                                        )
                                    }
                                />

                                <span className="contact-form__radio" />

                                <span>
                                    {option}
                                </span>

                            </label>

                        ))}

                    </div>

                </section>


                {/* =================================================
                    NOTICE + SUBMIT
                ================================================= */}

                <div className="contact-form__footer">

                    {error && (
                        <p className="contact-form__error" role="alert">
                            {error}
                        </p>
                    )}

                    <p className="contact-form__notice">
                        {notice}
                    </p>


                    <button
                        type="submit"
                        className="contact-form__submit"
                        disabled={loading}
                    >

                        <span>
                            {loading
                                ? submitButton.loadingText
                                : submitButton.text}
                        </span>

                        {!loading && (
                            <ArrowRight size={19} />
                        )}

                    </button>

                </div>

            </div>

        </form>
    );
}
