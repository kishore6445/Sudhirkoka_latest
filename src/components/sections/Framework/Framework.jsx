import React from "react";

import {
  ArrowRight,
} from "lucide-react";

import {
  frameworkData,
  approachData,
} from "./frameworkData";

import "./framework.css";


/* =========================================================
   PEOPLE GROWTH STEP
========================================================= */

const FrameworkStep = ({ item, isLast }) => {
  const Icon = item.icon;

  return (
    <div className="framework-step">

      <div className="framework-step__visual">

        <div className="framework-step__circle">

          <span className="framework-step__number">
            {item.number}
          </span>

          <div className="framework-step__icon">
            <Icon
              size={34}
              strokeWidth={1.8}
            />
          </div>

        </div>

        {!isLast && (
          <div className="framework-step__connector" />
        )}

      </div>

      <h3 className="framework-step__title">
        {item.title}
      </h3>

    </div>
  );
};


/* =========================================================
   APPROACH STEP
========================================================= */

const ApproachStep = ({ item, isLast }) => {
  const Icon = item.icon;

  return (
    <div className="approach-step">

      <div className="approach-step__visual">

        <div className="approach-step__circle">

          <Icon
            size={32}
            strokeWidth={1.8}
          />

        </div>

      </div>

      <span className="approach-step__number">
        {item.number}
      </span>

      <h3 className="approach-step__title">
        {item.title}
      </h3>

      <p className="approach-step__description">
        {item.description}
      </p>

      {!isLast && (
        <div className="approach-step__arrow">
          <ArrowRight size={24} />
        </div>
      )}

    </div>
  );
};


/* =========================================================
   FRAMEWORK
========================================================= */

const Framework = () => {
  return (
    <section className="framework-section" id="framework">

      <div className="framework-container">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="framework-header">

          <div className="framework-kicker">

            <span>
              THE PEOPLE GROWTH FRAMEWORK
            </span>

          </div>

          <div className="framework-header-line" />

          <h2 className="framework-title">
            High-Performing Teams
            <br />

            <span className="framework-title__accent">
              are Intentionally Developed
            </span>
          </h2>

          <p className="framework-description">
            A proven six-step leadership transformation framework
            for building stronger leaders, engaged teams, and
            sustainable organisational growth.
          </p>

        </div>


        {/* =================================================
            CARD 01 — PEOPLE GROWTH FRAMEWORK
        ================================================= */}

        <div className="framework-box">

          <div className="framework-box__glow framework-box__glow--top" />
          <div className="framework-box__glow framework-box__glow--bottom" />

          <div className="framework-steps">

            {frameworkData.map((item, index) => (
              <FrameworkStep
                key={item.number}
                item={item}
                isLast={index === frameworkData.length - 1}
              />
            ))}

          </div>

        </div>


        {/* =================================================
            CARD 02 — SIMPLE PROVEN APPROACH
        ================================================= */}

        <div className="approach-box">

          <div className="approach-box__glow" />

          <div className="approach-header">

            <div className="approach-kicker">

              <span className="approach-kicker-line" />

              <span>
                A SIMPLE, PROVEN APPROACH
              </span>

              <span className="approach-kicker-line" />

            </div>

            <h2 className="approach-title">
              A simple approach that delivers{" "}
              <span>
                lasting results.
              </span>
            </h2>

          </div>


          <div className="approach-steps">

            {approachData.map((item, index) => (
              <ApproachStep
                key={item.number}
                item={item}
                isLast={index === approachData.length - 1}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Framework;
