import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { challengesData } from "./challengesData";
import "./challenges.css";

const Challenges = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  const activeData = challengesData[activeChallenge];

  return (
    <section className="challenges-section" id="challenges">
      <div className="challenges-container">

        {/* =========================
            SECTION HEADER
        ========================= */}
        <div className="challenges-header">

          <div className="challenges-kicker">
            
            <span>CHALLENGES</span>
          </div>

          <div className="challenges-header-line" />

          <h2 className="challenges-heading">
            Every business challenge has a{" "}
            <span>people story.</span>
          </h2>

          <p className="challenges-intro">
            Most organisations try to solve business problems through
            processes, policies and systems. The real challenge often
            starts with people.
          </p>

        </div>


        {/* =========================
            MAIN CHALLENGE AREA
        ========================= */}
        <div className="challenges-content">

          {/* =========================
              LEFT — CHALLENGE LIST
          ========================= */}
          <div
            className="challenge-list"
            role="tablist"
            aria-label="Business challenges"
          >
            {challengesData.map((challenge, index) => {
              const isActive = activeChallenge === index;

              return (
                <button
                  key={challenge.id}
                  type="button"
                  className={`challenge-item ${
                    isActive ? "challenge-item--active" : ""
                  }`}
                  onClick={() => setActiveChallenge(index)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="challenge-item-number">
                    {challenge.id}
                  </span>

                  <span className="challenge-item-title">
                    {challenge.label}
                  </span>

                  <span className="challenge-item-arrow">
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </span>
                </button>
              );
            })}
          </div>


          {/* =========================
              RIGHT — DETAIL PANEL
          ========================= */}
          <div className="challenge-detail">

            <div className="challenge-detail-top">
              <span className="challenge-detail-kicker">
                BUSINESS CHALLENGE
              </span>

              <span className="challenge-detail-number">
                {activeData.id}
              </span>
            </div>


            <h3 className="challenge-detail-title">
              {activeData.label}
            </h3>


            <div className="challenge-detail-block">
              <span className="challenge-detail-label">
                Challenge
              </span>

              <p>
                {activeData.explanation}
              </p>
            </div>


            {/* <div className="challenge-detail-block">
              <span className="challenge-detail-label">
                Business Impact
              </span>

              <p>
                {activeData.impact}
              </p>
            </div> */}

            <div className="challenge-detail-block">

            <span className="challenge-detail-label">
              Business Impact
            </span>

            <ul className="challenge-details__list">

              {activeData.impact.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}

            </ul>

          </div>
            {/* <div className="challenge-detail-block challenge-detail-block--response">
              <span className="challenge-detail-label">
                Leadership Response
              </span>

              <p>
                {activeData.response}
              </p>
            </div> */}

          </div>

        </div>


        {/* =========================
            CLOSING STATEMENT
        ========================= */}
        {/* <p className="challenges-closing">
          Behind every business challenge is a{" "}
          <span>people challenge.</span>
        </p> */}

      </div>
    </section>
  );
};

export default Challenges;
