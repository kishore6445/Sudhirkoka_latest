import { useEffect, useRef, useState } from "react";
import "./Purpose.css";

function Purpose() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const autoplayRef = useRef(null);

    const slides = [
        {
            id: "01",
            type: "purpose",
            label: "OUR PURPOSE",
            title: (
                <>
                    To empower leaders <br className="purpose__desktop-break" />
                    {" "} and organizations
                    to unlock <br className="purpose__desktop-break" />
                    {" "} the full potential of their people.
                </>
            ),
            description: (
                <>
                    We help leaders create environments where people can take
                    ownership, perform with clarity and grow with confidence.
                </>
            ),
        },
        {
            id: "02",
            type: "belief",
            label: "OUR BELIEF",
            title: (
                <>
                    When people grow, <br className="purpose__desktop-break" />
                    {" "}organizations grow and
                    <br className="purpose__desktop-break" />
                    {" "} when leaders lead well, businesses win.
                </>
            ),
            description: (
                <>
                    Growth becomes sustainable when people, leadership and
                    systems grow together.
                </>
            ),
        },
    ];


    /* =========================================================
       NEXT SLIDE
    ========================================================= */

    const nextSlide = () => {
        setActiveSlide((current) => (current + 1) % slides.length);
    };


    /* =========================================================
       AUTOPLAY
    ========================================================= */

    useEffect(() => {

        if (isPaused) {
            return;
        }

        autoplayRef.current = setInterval(() => {

            setActiveSlide((current) =>
                (current + 1) % slides.length
            );

        }, 4000);


        return () => {
            clearInterval(autoplayRef.current);
        };

    }, [isPaused, slides.length]);


    /* =========================================================
       MANUAL NEXT
    ========================================================= */

    const handleNext = () => {

        clearInterval(autoplayRef.current);

        nextSlide();

    };


    /* =========================================================
       MANUAL SLIDE SELECTION
    ========================================================= */

    const handleSelectSlide = (index) => {

        clearInterval(autoplayRef.current);

        setActiveSlide(index);

    };


    return (
        <section className="purpose" id="purpose">

            {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

            <div
                className="purpose__background"
                aria-hidden="true"
            >

                <div className="purpose__glow purpose__glow--left" />

                <div className="purpose__glow purpose__glow--right" />


                <div className="purpose__wave purpose__wave--left">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>


                <div className="purpose__wave purpose__wave--right">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>


                <div className="purpose__dots" />

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="purpose__container">


                {/* =================================================
                    LEFT — PHILOSOPHY
                ================================================= */}

                <div className="purpose__intro">

                    <h2>
                        What drives
                        <br />
                        the work
                        <br />
                        we <span>do.</span>
                    </h2>


                    <p>
                        Strong organizations are built
                        when people, leadership and
                        systems grow together.
                    </p>


                    {/* CLEANER DECORATIVE LINE */}

                    <div className="purpose__intro-line">
                        <span className="purpose__intro-line-main" />
                        <span className="purpose__intro-line-dot" />
                         <span className="purpose__intro-line-main" />
                    </div>

                </div>


                {/* =================================================
                    RIGHT — CAROUSEL
                ================================================= */}

                <div
                    className="purpose__carousel"

                    onMouseEnter={() => setIsPaused(true)}

                    onMouseLeave={() => setIsPaused(false)}
                >

                    <div
                        className="purpose__track"
                        style={{
                            transform: `translateX(-${activeSlide * 100}%)`,
                        }}
                    >

                        {slides.map((slide) => (

                            <article
                                key={slide.id}
                                className={`purpose__box purpose__box--${slide.type}`}
                            >

                                <div className="purpose__card-content">


                                    {/* =================================================
                                        CARD TOP
                                    ================================================= */}

                                    <div className="purpose__card-top">

                                        <div className="purpose__icon">

                                            {slide.type === "purpose" ? (

                                                <svg
                                                    width="25"
                                                    height="25"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                >

                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="8"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="4"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="1.5"
                                                        fill="currentColor"
                                                    />

                                                    <path
                                                        d="M16 8L21 3"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />

                                                    <path
                                                        d="M17 3H21V7"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />

                                                </svg>

                                            ) : (

                                                <svg
                                                    width="25"
                                                    height="25"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                >

                                                    <path
                                                        d="M4 6.5C4 5.67 4.67 5 5.5 5H18.5C19.33 5 20 5.67 20 6.5V16.5C20 17.33 19.33 18 18.5 18H13L9 21V18H5.5C4.67 18 4 17.33 4 16.5V6.5Z"
                                                        fill="currentColor"
                                                    />

                                                    <path
                                                        d="M8 10C8 10 9.2 8.5 12 8.5C14.8 8.5 16 10 16 10"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    />

                                                    <path
                                                        d="M9 12.5H15"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    />

                                                </svg>

                                            )}

                                        </div>


                                        <div className="purpose__label">
                                            {slide.label}
                                        </div>

                                    </div>


                                    {/* =================================================
                                        CARD TITLE
                                    ================================================= */}

                                    <h3>
                                        {slide.title}
                                    </h3>


                                    {/* =================================================
                                        DIVIDER
                                    ================================================= */}

                                    <div className="purpose__divider" />


                                    {/* =================================================
                                        DESCRIPTION
                                    ================================================= */}

                                    <div className="purpose__description">

                                        <p>
                                            {slide.description}
                                        </p>

                                    </div>

                                </div>


                                {/* =================================================
                                    NUMBER
                                ================================================= */}

                                <span className="purpose__number">
                                    {slide.id}
                                </span>


                                {/* =================================================
                                    NEXT ARROW
                                ================================================= */}

                                <button
                                    type="button"
                                    className="purpose__next"
                                    onClick={handleNext}
                                    aria-label="Next philosophy card"
                                >

                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >

                                        <path
                                            d="M5 12H19"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />

                                       {slide.type === "purpose" ? (
    <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
) : (
    <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
)}

                                    </svg>

                                </button>

                            </article>

                        ))}

                    </div>


                    {/* =================================================
                        CAROUSEL INDICATOR
                    ================================================= */}

                    <div className="purpose__controls">

                        <div className="purpose__progress">

                            {slides.map((slide, index) => (

                                <button
                                    key={slide.id}
                                    type="button"
                                    className={
                                        `purpose__progress-item ${
                                            activeSlide === index
                                                ? "is-active"
                                                : ""
                                        }`
                                    }
                                    onClick={() => handleSelectSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Purpose;
