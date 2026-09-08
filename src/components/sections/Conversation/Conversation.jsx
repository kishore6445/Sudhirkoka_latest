import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import "./conversation.css";

import EnquiryModal from "../Contact/EnquiryModal";

const questions = [
  {
    number: "01",
    text: "Is your leadership pipeline ready for what's next?",
  },
  {
    number: "02",
    text: "Are your teams aligned with your business goals?",
  },
  {
    number: "03",
    text: "Is your culture helping your organisation grow?",
  },
];

const Conversation = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="conversation-section">
      <div className="conversation-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="conversation-content">

          <span className="conversation-eyebrow">
            LET'S START A CONVERSATION
          </span>

          <h2 className="conversation-heading">
            Sometimes the right question
            <br/>
            is where <span>transformation begins.</span>
          </h2>

          <p className="conversation-intro">
            The answers often begin by asking better questions about
            leadership, people, teams, and culture.
          </p>

          <div className="conversation-questions">
            {questions.map((question) => (
              <div
                className="conversation-question"
                key={question.number}
              >
                <span className="conversation-question-number">
                  {question.number}
                </span>

                <span className="conversation-question-text">
                  {question.text}
                </span>
              </div>
            ))}
          </div>

          <div className="conversation-direct">
            <span>
              Have another question?
            </span>

            <span>
              Ask us directly

              <ArrowRight
                size={17}
                strokeWidth={2.8}
              />
            </span>
          </div>

        </div>

        {/* =================================================
            RIGHT — ENQUIRY CARD
        ================================================= */}

        <div className="conversation-card">

          <div className="conversation-card-top">

            <span className="conversation-card-eyebrow">
              GET IN TOUCH
            </span>

            <h3>
              Ask us anything.
            </h3>

            <p>
              Have a question about your organisation,
              leadership, teams, or culture? Start a conversation
              with us.
            </p>

          </div>

          <form
            className="conversation-form"
            onSubmit={handleSubmit}
          >

            <div className="conversation-field">

              <label htmlFor="conversation-name">
                NAME
              </label>

              <input
                id="conversation-name"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />

            </div>

            <div className="conversation-field">

              <label htmlFor="conversation-email">
                EMAIL
              </label>

              <input
                id="conversation-email"
                type="email"
                name="email"
                placeholder="you@company.com"
                required
              />

            </div>

            <div className="conversation-field">

              <label htmlFor="conversation-phone">
                PHONE
              </label>

              <input
                id="conversation-phone"
                type="tel"
                name="phone"
                placeholder="+91"
              />

            </div>

            <button
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
              className="conversation-submit"
            >
              <span>
                Send Enquiry
              </span>

              <ArrowRight
                size={18}
                strokeWidth={1.8}
              />
            </button>

          </form>

        </div>

      </div>

      {/* =================================================
          ENQUIRY MODAL
      ================================================= */}

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

    </section>
  );
};

export default Conversation;
