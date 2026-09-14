import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { enquiryData } from "./enquiryData";

export default function EnquiryForm({
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    organizationName: "",
    industry: "",
    organizationSize: "",
    name: "",
    designation: "",
    email: "",
    phone: "",
    lookingFor: "",
    challenge: "",
    outcome: "",
    urgency: "",
    engagement: "",
    additional: "",
    source: "",
    sourceOther: "",
    consent: false,
  });

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.consent) {
      return;
    }

    setLoading(true);
    setError("");

    const fields = {
      "Organization Name": form.organizationName,
      "Industry / Sector": form.industry,
      "Organization Size": form.organizationSize,
      "Your Name": form.name,
      "Designation / Role": form.designation,
      "Business Email": form.email,
      "Phone / WhatsApp": form.phone,
      "Looking For": form.lookingFor,
      "Challenge": form.challenge,
      "Desired Outcome": form.outcome,
      "Urgency": form.urgency,
      "Engagement Type": form.engagement,
      "Additional Notes": form.additional,
      "Heard About Us":
        form.source === "Other"
          ? `Other: ${form.sourceOther}`
          : form.source,
      "Consent": form.consent ? "Yes" : "No",
    };

    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formKey: "enquiry",
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

  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="enquiry-form__header">

        <span className="enquiry-form__badge">
          {enquiryData.modal.badge}
        </span>

        <h2 className="enquiry-form__title">
          <span>
            Let’s Solve Your People
          </span>

          <span className="enquiry-form__title-accent">
            & Leadership Challenges
          </span>
        </h2>

        <div className="enquiry-form__intro">

          {enquiryData.modal.intro.map(
            (text) => (
              <p key={text}>
                {text}
              </p>
            )
          )}

        </div>

        <p className="enquiry-form__confidential">
          {enquiryData.modal.confidentiality}
        </p>

      </header>


      {/* =================================================
          01 — ORGANIZATION DETAILS
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            01
          </span>

          <div>
            <h3>
              Organization Details
            </h3>
          </div>

        </div>


        <div className="enquiry-fields enquiry-fields--two">

          <div className="enquiry-field">

            <label htmlFor="organizationName">
              Organization Name
              <span className="required">*</span>
            </label>

            <input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="Enter your organization name"
              value={form.organizationName}
              onChange={handleChange}
              required
            />

          </div>


          <div className="enquiry-field">

            <label htmlFor="industry">
              Industry / Sector
              <span className="required">*</span>
            </label>

            <input
              id="industry"
              name="industry"
              type="text"
              placeholder="e.g. Technology, Healthcare, Manufacturing"
              value={form.industry}
              onChange={handleChange}
              required
            />

          </div>

        </div>


        <div className="enquiry-field enquiry-field--spaced">

          <label>
            Organization Size
          </label>

          <div className="enquiry-options enquiry-options--inline">

            {enquiryData.fields.organizationSize.options.map(
              (option) => (
                <label
                  className="enquiry-option"
                  key={option}
                >

                  <input
                    type="radio"
                    name="organizationSize"
                    value={option}
                    checked={
                      form.organizationSize === option
                    }
                    onChange={handleChange}
                  />

                  <span className="enquiry-radio" />

                  <span>
                    {option}
                  </span>

                </label>
              )
            )}

          </div>

        </div>


        <div className="enquiry-fields enquiry-fields--two enquiry-fields--spaced">

          <div className="enquiry-field">

            <label htmlFor="name">
              Your Name
              <span className="required">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="enquiry-field">

            <label htmlFor="designation">
              Designation / Role
              <span className="required">*</span>
            </label>

            <input
              id="designation"
              name="designation"
              type="text"
              placeholder="Your role"
              value={form.designation}
              onChange={handleChange}
              required
            />

          </div>


          <div className="enquiry-field">

            <label htmlFor="email">
              Business Email
              <span className="required">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="enquiry-field">

            <label htmlFor="phone">
              Phone / WhatsApp
              <span className="optional">
                Optional
              </span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91"
              value={form.phone}
              onChange={handleChange}
            />

          </div>

        </div>

      </section>


      {/* =================================================
          02 — WHAT ARE YOU LOOKING FOR?
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            02
          </span>

          <div>

            <h3>
              What Are You Looking For?
            </h3>

            <p>
              How can Winspiring Minds help you?
            </p>

          </div>

        </div>


        <div className="enquiry-choice-grid">

          {enquiryData.fields.lookingFor.options.map(
            (option) => (
              <label
                className="enquiry-choice"
                key={option}
              >

                <input
                  type="radio"
                  name="lookingFor"
                  value={option}
                  checked={
                    form.lookingFor === option
                  }
                  onChange={handleChange}
                  required
                />

                <span className="enquiry-choice__radio" />

                <span>
                  {option}
                </span>

              </label>
            )
          )}

        </div>

      </section>


      {/* =================================================
          03 — CHALLENGE
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            03
          </span>

          <div>

            <h3>
              Tell Us About Your Challenge
            </h3>

            {/* <p>
              What challenge are you currently
              trying to address?
            </p> */}

          </div>

        </div>


        {/* <p className="enquiry-field-description">
          Please describe the situation, problem or
          opportunity you would like help with.
        </p> */}

        <div className="enquiry-field">

          <textarea
            name="challenge"
            rows="7"
            placeholder={
              enquiryData.fields.challenge.placeholder
            }
            value={form.challenge}
            onChange={handleChange}
            required
          />

        </div>

      </section>


      {/* =================================================
          04 — OUTCOME
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            04
          </span>

          <div>

            <h3>
              What Outcome Are You Looking For?
            </h3>

            {/* <p>
              What would you like to see change
              after the intervention?
            </p> */}

          </div>

        </div>


        <div className="enquiry-field">

          <textarea
            name="outcome"
            rows="5"
            placeholder={
              enquiryData.fields.outcome.placeholder
            }
            value={form.outcome}
            onChange={handleChange}
            required
          />

        </div>


        <div className="enquiry-field enquiry-field--spaced">

          <label>
            How urgent is this requirement?
          </label>

          <div className="enquiry-options">

            {enquiryData.fields.urgency.options.map(
              (option) => (
                <label
                  className="enquiry-option"
                  key={option}
                >

                  <input
                    type="radio"
                    name="urgency"
                    value={option}
                    checked={
                      form.urgency === option
                    }
                    onChange={handleChange}
                  />

                  <span className="enquiry-radio" />

                  <span>
                    {option}
                  </span>

                </label>
              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          05 — ENGAGEMENT
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            05
          </span>

          <div>

            <h3>
              What Type of Engagement Are You Considering?
            </h3>

          </div>

        </div>


        <div className="enquiry-choice-grid">

          {enquiryData.fields.engagement.options.map(
            (option) => (
              <label
                className="enquiry-choice"
                key={option}
              >

                <input
                  type="radio"
                  name="engagement"
                  value={option}
                  checked={
                    form.engagement === option
                  }
                  onChange={handleChange}
                  required
                />

                <span className="enquiry-choice__radio" />

                <span>
                  {option}
                </span>

              </label>
            )
          )}

        </div>

      </section>


      {/* =================================================
          06 — ADDITIONAL
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            06
          </span>

          <div>

            <h3>
              Anything Else We Should Know?
            </h3>
{/* 
            <p>
              Is there anything else you would like us
              to understand about your organization,
              people or challenge?
            </p> */}

          </div>

        </div>


        <div className="enquiry-field">

          <textarea
            name="additional"
            rows="5"
            placeholder={
              enquiryData.fields.additional.placeholder
            }
            value={form.additional}
            onChange={handleChange}
          />

        </div>

      </section>


      {/* =================================================
          07 — SOURCE
      ================================================= */}

      <section className="enquiry-section">

        <div className="enquiry-section__heading">

          <span className="enquiry-section__number">
            07
          </span>

          <div>

            <h3>
              How Did You Hear About Winspiring Minds?
            </h3>

            {/* <span className="enquiry-heading-optional">
              Optional
            </span> */}

          </div>

        </div>


        <div className="enquiry-choice-grid">

          {enquiryData.fields.source.options.map(
            (option) => (
              <label
                className="enquiry-choice"
                key={option}
              >

                <input
                  type="radio"
                  name="source"
                  value={option}
                  checked={
                    form.source === option
                  }
                  onChange={handleChange}
                />

                <span className="enquiry-choice__radio" />

                <span>
                  {option}
                </span>

              </label>
            )
          )}

        </div>


        {form.source === "Other" && (
          <div className="enquiry-field enquiry-field--small-spaced">

            <input
              type="text"
              name="sourceOther"
              placeholder="Please tell us..."
              value={form.sourceOther}
              onChange={handleChange}
            />

          </div>
        )}

      </section>


      {/* =================================================
          CONSENT
      ================================================= */}

      <div className="enquiry-consent">

        <label>

          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            required
          />

          <span className="enquiry-consent__box" />

          <span className="enquiry-consent__text">
            I agree to be contacted by Winspiring Minds
            regarding my enquiry.
          </span>

        </label>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="enquiry-form__footer">

        {error && (
          <p className="enquiry-form__error" role="alert">
            {error}
          </p>
        )}

        <p>
          While we will try to revert at the earliest,
          it may take us 7 to 10 working days to reach
          out to you.
        </p>

        <button
          type="submit"
          className="enquiry-submit"
          disabled={loading}
        >

          <span>
            {loading
              ? "Sending..."
              : "Let’s Start a Conversation"}
          </span>

          <ArrowRight
            size={20}
            strokeWidth={2}
          />

        </button>

      </div>

    </form>
  );
}
