import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CoachingGuideModal from "./CoachingGuideModal";

import guide1Cover from "../../assets/images/coaching-guides/guide-1.jpg";
import guide2Cover from "../../assets/images/coaching-guides/guide-2.jpg";
import guide3Cover from "../../assets/images/coaching-guides/guide-3.jpg";
import guide1Pdf from "../../assets/documents/coaching-guides/guide-1.pdf";
import guide2Pdf from "../../assets/documents/coaching-guides/guide-2.pdf";
import guide3Pdf from "../../assets/documents/coaching-guides/guide-3.pdf";

import "../../styles/carousel-library.css";

// ============================================================
// CAROUSEL LIBRARY DATA
// ============================================================

const carouselGuides = [
    {
        id: 1,
        number: "01",
        category: "TALENT",
        title: "You Don’t Have a Talent Shortage",
        cover: guide1Cover,
        pdf: guide1Pdf,
    },
    {
        id: 2,
        number: "02",
        category: "RETENTION",
        title: "Why Do Good Employees Quit?",
        cover: guide2Cover,
        pdf: guide2Pdf,
    },
    {
        id: 3,
        number: "03",
        category: "TEAM PERFORMANCE",
        title: "Why High-Performing Teams Stop Performing",
        cover: guide3Cover,
        pdf: guide3Pdf,
    },

    // ========================================================
    // ADD MORE CAROUSELS HERE
    // ========================================================

    // {
    //     id: 4,
    //     number: "04",
    //     category: "LEADERSHIP",
    //     title: "Your Carousel Title",
    //     cover: guide4Cover,
    //     pdf: guide4Pdf,
    // },
];


// ============================================================
// CAROUSEL LIBRARY
// ============================================================

function CarouselLibrary() {
    const [selectedGuide, setSelectedGuide] = useState(null);

    // ========================================================
    // OPEN GUIDE
    // ========================================================

    const handleOpenGuide = (guide) => {
        setSelectedGuide(guide);
    };

    // ========================================================
    // CLOSE GUIDE
    // ========================================================

    const handleCloseGuide = () => {
        setSelectedGuide(null);
    };

    return (
        <>
            <main className="carousel-library">

                <div className="carousel-library__container">

                    {/* =================================================
                        BACK NAVIGATION
                    ================================================= */}

                    <Link
                        to="/#mini-coaching-guide"
                        className="carousel-library__back"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Manager as Coach</span>
                    </Link>


                    {/* =================================================
                        INTRO
                    ================================================= */}

                    <header className="carousel-library__intro">

                        {/* <span className="carousel-library__eyebrow">
                            CAROUSEL LIBRARY
                        </span> */}

                        <h1 className="carousel-library__heading">
                            Practical resources for better
                            <br />
                            <span>leadership.</span>
                        </h1>

                        <p className="carousel-library__description">
                            A collection of short, practical visual resources
                            covering people, leadership, teams and business.
                        </p>

                    </header>


                    {/* =================================================
                        SECTION HEADER
                    ================================================= */}

                    <div className="carousel-library__section-header">

                        <span className="carousel-library__section-label">
                            ALL Resources
                        </span>

                        <span className="carousel-library__section-count">
                            {String(carouselGuides.length).padStart(2, "0")} Resources
                        </span>

                    </div>


                    {/* =================================================
                        CAROUSEL GRID
                    ================================================= */}

                    <div className="carousel-library__grid">

                        {carouselGuides.map((guide) => (
                            <article
                                className="carousel-library-card"
                                key={guide.id}
                                onClick={() => handleOpenGuide(guide)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault();
                                        handleOpenGuide(guide);
                                    }
                                }}
                            >

                                {/* =====================================
                                    COVER
                                ===================================== */}

                                <div className="carousel-library-card__cover">

                                    <img
                                        src={guide.cover}
                                        alt={guide.title}
                                    />

                                    <div className="carousel-library-card__overlay">

                                        <span>OPEN RESOURCE</span>

                                        <ArrowRight size={19} />

                                    </div>

                                </div>


                                {/* =====================================
                                    CARD CONTENT
                                ===================================== */}

                                <div className="carousel-library-card__content">

                                    <div className="carousel-library-card__meta">

                                        <div className="carousel-library-card__meta-left">

                                            <span className="carousel-library-card__number">
                                                {guide.number}
                                            </span>

                                            <span className="carousel-library-card__category">
                                                {guide.category}
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            className="carousel-library-card__link"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleOpenGuide(guide);
                                            }}
                                        >
                                            <span>Explore </span>

                                            <ArrowRight size={17} />
                                        </button>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>

                </div>

            </main>


            {/* =====================================================
                PDF MODAL
            ===================================================== */}

            <CoachingGuideModal
                isOpen={Boolean(selectedGuide)}
                guide={selectedGuide}
                onClose={handleCloseGuide}
            />
        </>
    );
}

export default CarouselLibrary;
