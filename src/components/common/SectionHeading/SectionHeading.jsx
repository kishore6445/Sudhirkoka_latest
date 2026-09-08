import "./SectionHeading.css";

const SectionHeading = ({
  eyebrow,
  children,
}) => {
  return (
    <div className="section-heading">

      {/* =========================================
          EYEBROW + HORIZONTAL LINE
      ========================================= */}
      <div className="section-heading__top">

        <div className="section-heading__eyebrow">
          <i className="section-heading__eyebrow-line" />

          <span>
            {eyebrow}
          </span>
        </div>

        <div className="section-heading__divider" />

      </div>


      {/* =========================================
          MAIN HEADING

          The actual heading content is passed
          through children so each section can
          have its own text/highlight.
      ========================================= */}
      <h2 className="section-heading__title">
        {children}
      </h2>

    </div>
  );
};

export default SectionHeading;