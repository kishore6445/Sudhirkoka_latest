import {
    ArrowLeft,
    ArrowRight,
    Lightbulb,
    Play,
    Zap,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    quickBites,
} from "../../data/insightsData";

import YouTubeModal from "../../components/insights/YouTubeModal";

import "../../styles/quick-bites.css";


/* =========================================================
   QUICK BITE CARD
========================================================= */

function QuickBiteCard({
    bite,
    index,
    onOpen,
}) {

    return (
        <article className="quick-bite-card">

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="quick-bite-card__media">

                <img
                    src={bite.image}
                    alt={bite.title}
                />

                <div className="quick-bite-card__overlay" />

                <span className="quick-bite-card__number">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Play Button */}

                <button
                    type="button"
                    className="quick-bite-card__play"
                    aria-label={`Play ${bite.title}`}
                    onClick={() => onOpen(bite)}
                >
                    <Play
                        size={18}
                        fill="currentColor"
                        strokeWidth={0}
                    />
                </button>

                <span className="quick-bite-card__duration">
                    {bite.duration}
                </span>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="quick-bite-card__content">

                <div className="quick-bite-card__label">

                    <Zap
                        size={13}
                        fill="currentColor"
                    />

                    <span>
                        QUICK BITE
                    </span>

                </div>


                <h2>
                    {bite.title}
                </h2>


                <button
                    type="button"
                    className="quick-bite-card__action"
                    onClick={() => onOpen(bite)}
                >
                    <span>
                        Watch
                    </span>

                    <ArrowRight size={17} />
                </button>

            </div>

        </article>
    );
}


/* =========================================================
   QUICK BITES PAGE
========================================================= */

function QuickBites() {

    const [
        selectedBite,
        setSelectedBite
    ] = useState(null);


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, []);


    /* =====================================================
       OPEN VIDEO
    ===================================================== */

    const handleOpenVideo = (bite) => {
        setSelectedBite(bite);
    };


    /* =====================================================
       CLOSE VIDEO
    ===================================================== */

    const handleCloseVideo = () => {
        setSelectedBite(null);
    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main className="quick-bites-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="quick-bites-hero">

    <div className="quick-bites-container">

        <Link
            to="/#insights"
            className="quick-bites-back"
        >
            <ArrowLeft size={18} />
            <span>Back to Insights</span>
        </Link>


        <div className="quick-bites-hero-grid">

            <div className="quick-bites-hero-heading">

                <div className="quick-bites-eyebrow">
                    <i />
                    <span>QUICK BITES</span>
                </div>

                <h1>
                    Small ideas.
                    <br />
                    <span>Big impact.</span>
                </h1>


                <div className="quick-bites-hero-intro">

                    <p>
                        Short leadership ideas, practical reminders
                        and useful perspectives you can take in
                        whenever you have a minute.
                    </p>

                </div>


                <div className="quick-bites-values">

                    <div className="quick-bites-value">

                        <div className="quick-bites-value__icon">
                            <Play
                                size={14}
                                fill="currentColor"
                            />
                        </div>

                        <div>
                            <strong>
                                SHORT &amp; FOCUSED
                            </strong>

                            <span>
                                Ideas worth your time
                            </span>
                        </div>

                    </div>


                    <div className="quick-bites-value">

                        <div className="quick-bites-value__icon">
                            <Zap
                                size={14}
                                fill="currentColor"
                            />
                        </div>

                        <div>
                            <strong>
                                PRACTICAL
                            </strong>

                            <span>
                                Built for real situations
                            </span>
                        </div>

                    </div>


                    <div className="quick-bites-value">

                        <div className="quick-bites-value__icon">
                            <Lightbulb size={14} />
                        </div>

                        <div>
                            <strong>
                                EASY TO APPLY
                            </strong>

                            <span>
                                Take one idea with you
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                RIGHT ARCHITECTURAL GRAPHIC
            ================================================= */}

            <div className="quick-bites-graphic">

                <div
                    className="
                        quick-bites-graphic__ring
                        quick-bites-graphic__ring--outer
                    "
                />

                <div
                    className="
                        quick-bites-graphic__ring
                        quick-bites-graphic__ring--middle
                    "
                />

                <div
                    className="
                        quick-bites-graphic__ring
                        quick-bites-graphic__ring--inner
                    "
                />


                <div
                    className="
                        quick-bites-graphic__line
                        quick-bites-graphic__line--horizontal
                    "
                />

                <div
                    className="
                        quick-bites-graphic__line
                        quick-bites-graphic__line--vertical
                    "
                />


                <div className="quick-bites-graphic__center">

                    <Play
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                    />

                </div>


                <span
                    className="
                        quick-bites-graphic__label
                        quick-bites-graphic__label--top
                    "
                >
                    PERSPECTIVE
                </span>


                <span
                    className="
                        quick-bites-graphic__label
                        quick-bites-graphic__label--right
                    "
                >
                    ACTION
                </span>


                <span
                    className="
                        quick-bites-graphic__label
                        quick-bites-graphic__label--bottom
                    "
                >
                    LEADERSHIP
                </span>


                <span
                    className="
                        quick-bites-graphic__label
                        quick-bites-graphic__label--left
                    "
                >
                    PEOPLE
                </span>

            </div>

        </div>


        {/* =================================================
            HERO BOTTOM LINE
        ================================================= */}

        <div className="quick-bites-hero-line">
            <i />
        </div>


        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div className="quick-bites-scroll">

            <span>
                SCROLL TO EXPLORE
            </span>

            <i />

        </div>

    </div>

</section>

            {/* =================================================
                QUICK BITES CONTENT
            ================================================= */}

            <section className="quick-bites-content">

                <div className="quick-bites-container">


                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="quick-bites-section-heading">

                        <div>

                            <span>
                                WATCH SOMETHING USEFUL
                            </span>

                            <h2>
                                A few minutes can change perspective.
                            </h2>

                        </div>

                    </div>


                    {/* =================================================
                        QUICK BITE GRID
                    ================================================= */}

                    {quickBites.length > 0 ? (

                        <div className="quick-bites-grid">

                            {quickBites.map(
                                (bite, index) => (

                                    <QuickBiteCard
                                        key={bite.id}
                                        bite={bite}
                                        index={index}
                                        onOpen={handleOpenVideo}
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        /* =================================================
                            EMPTY STATE
                        ================================================= */

                        <div className="quick-bites-empty">

                            <Zap size={38} />

                            <span>
                                MORE QUICK BITES COMING SOON
                            </span>

                            <h3>
                                Something useful is on the way.
                            </h3>

                            <p>
                                We're preparing more short,
                                practical ideas for you.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* =================================================
                BOTTOM CTA
            ================================================= */}

            <section className="quick-bites-bottom">

                <div className="quick-bites-container">

                    <div className="quick-bites-bottom-inner">


                        <div>

                            <span>
                                KEEP EXPLORING
                            </span>

                            <h2>

                                There's more to

                                <br />

                                <em>
                                    discover.
                                </em>

                            </h2>

                        </div>


                        <Link
                            to="/insights/articles"
                            className="quick-bites-bottom-link"
                        >

                            <span>
                                Explore Articles
                            </span>

                            <ArrowRight size={18} />

                        </Link>


                    </div>

                </div>

            </section>


            {/* =================================================
                YOUTUBE MODAL
            ================================================= */}

            <YouTubeModal

                isOpen={Boolean(selectedBite)}

                videoUrl={
                    selectedBite?.youtubeUrl
                }

                title={
                    selectedBite?.title
                }

                onClose={
                    handleCloseVideo
                }

            />

        </main>

    );
}


export default QuickBites;