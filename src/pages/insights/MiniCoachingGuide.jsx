import { useEffect, useState } from "react";
import {
    ArrowRight,
    FileText,
    X,
    CheckCircle2,
    Lightbulb,
    UsersRound,
} from "lucide-react";

import CoachingGuideModal from "./CoachingGuideModal";

import guide1Cover from "../../assets/images/coaching-guides/guide-1.jpg";
import guide2Cover from "../../assets/images/coaching-guides/guide-2.jpg";
import guide3Cover from "../../assets/images/coaching-guides/guide-3.jpg";
import guide1Pdf from "../../assets/documents/coaching-guides/guide-1.pdf";
import guide2Pdf from "../../assets/documents/coaching-guides/guide-2.pdf";
import guide3Pdf from "../../assets/documents/coaching-guides/guide-3.pdf";

import "../../styles/mini-coaching-guide.css";


// ============================================================
// MINI COACHING GUIDES
// ============================================================

const coachingGuides = [
    {
        id: 1,
        number: "01",
        category: "TALENT",
        title: "You Don’t Have a Talent Shortage",
        description:
            "A practical perspective on why organisations may be struggling to unlock the talent they already have.",
        cover: guide1Cover,
        pdf: guide1Pdf,
    },
    {
        id: 2,
        number: "02",
        category: "RETENTION",
        title: "Why Do Good Employees Quit?",
        description:
            "Understanding the deeper reasons good employees leave, even when compensation is not the problem.",
        cover: guide2Cover,
        pdf: guide2Pdf,
    },
    {
        id: 3,
        number: "03",
        category: "TEAM PERFORMANCE",
        title: "Why High-Performing Teams Stop Performing",
        description:
            "What changes when a strong team starts losing momentum, accountability and performance.",
        cover: guide3Cover,
        pdf: guide3Pdf,
    },
];


// ============================================================
// MANAGER AS A COACH RESOURCE
// ============================================================

const managerAsCoachPoints = [
    "Conduct short learning sessions with their teams",
    "Start meaningful conversations",
    "Facilitate team discussions",
    "Explain important workplace concepts",
    "Build awareness around behaviours and attitudes",
    "Help employees reflect and learn from their experiences",
    "Reinforce key leadership and organizational messages",
    "Turn everyday workplace situations into learning moments",
];


// ============================================================
// MANAGER AS A COACH MODAL
// ============================================================

function ManagerAsCoachModal({ isOpen, onClose }) {

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose]);


    if (!isOpen) {
        return null;
    }


    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };


    return (
        <div
            className="manager-coach-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manager-coach-modal-title"
            onMouseDown={handleBackdropClick}
        >

            <div className="manager-coach-modal__panel">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="manager-coach-modal__header">

                    <div className="manager-coach-modal__eyebrow">
                        <span className="manager-coach-modal__eyebrow-line" />
                        <span>MANAGERIAL RESOURCE</span>
                    </div>


                    <button
                        type="button"
                        className="manager-coach-modal__close"
                        onClick={onClose}
                        aria-label="Close Manager as a Coach resource"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* =====================================================
                    TITLE
                ===================================================== */}

                <div className="manager-coach-modal__title-block">

                    <h2 id="manager-coach-modal-title">
                        Manager as a Coach
                    </h2>

                    <h3>
                        Turn Everyday Management Moments into Learning
                        Opportunities
                    </h3>

                </div>


                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <div className="manager-coach-modal__content">

                    <p>
                        Great managers don't just assign work, monitor
                        performance and solve problems.
                    </p>

                    <p className="manager-coach-modal__emphasis">
                        They develop people.
                    </p>

                    <p>
                        And one of the most powerful ways to develop people is
                        to become a <strong>Coach at Work.</strong>
                    </p>

                    <p>
                        But coaching doesn't always require a formal coaching
                        session. It can happen during a team meeting, a
                        one-to-one conversation, after a difficult situation,
                        or while discussing a challenge with a team member.
                    </p>

                    <p className="manager-coach-modal__strong">
                        Manager as a Coach is designed to make this easier.
                    </p>

                    <p>
                        This resource provides managers with{" "}
                        <strong>
                            ready-to-use carousels, frameworks, practical
                            tools, stories, activities and learning materials
                        </strong>{" "}
                        on a wide range of workplace and leadership topics.
                    </p>


                    {/* =================================================
                        HOW MANAGERS CAN USE THESE RESOURCES
                    ================================================= */}

                    <div className="manager-coach-modal__resource-box">

                        <div className="manager-coach-modal__resource-heading">
                            <UsersRound size={18} />
                            <h4>
                                Managers can use these resources to:
                            </h4>
                        </div>


                        <div className="manager-coach-modal__points">

                            {managerAsCoachPoints.map((point) => (
                                <div
                                    className="manager-coach-modal__point"
                                    key={point}
                                >
                                    <CheckCircle2 size={15} />
                                    <span>{point}</span>
                                </div>
                            ))}

                        </div>

                    </div>


                    {/* =================================================
                        LEARN SHARE DISCUSS APPLY
                    ================================================= */}

                    <div className="manager-coach-modal__section">

                        <h4>
                            Learn. Share. Discuss. Apply.
                        </h4>

                        <p>
                            Instead of waiting for a formal training program,
                            managers can use these materials to create{" "}
                            <strong>
                                small, frequent and practical learning moments
                            </strong>{" "}
                            within their teams.
                        </p>

                    </div>


                    {/* =================================================
                        LEARNING MOMENTS
                    ================================================= */}

                    <div className="manager-coach-modal__learning-box">

                        <div className="manager-coach-modal__learning-icon">
                            <Lightbulb size={22} />
                        </div>

                        <div className="manager-coach-modal__learning-list">

                            <p>
                                A 10-minute discussion can create awareness.
                            </p>

                            <p>
                                A powerful question can trigger reflection.
                            </p>

                            <p>
                                A real-life story can change perspective.
                            </p>

                            <p>
                                A simple framework can change behaviour.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        MAKE LEARNING PART OF THE WORKDAY
                    ================================================= */}

                    <div className="manager-coach-modal__section manager-coach-modal__section--divider">

                        <h4>
                            Make Learning Part of the Workday
                        </h4>

                        <p>
                            The objective is simple:
                        </p>

                        <p className="manager-coach-modal__strong">
                            Don't just manage your team. Develop your team.
                        </p>

                        <p>
                            Use these resources to create conversations,
                            challenge thinking, share experiences and
                            encourage your people to learn from one another.
                        </p>

                        <p>
                            Because the best managers don't create dependency.
                        </p>

                        <p className="manager-coach-modal__strong">
                            They create capable, confident and independent
                            people.
                        </p>

                    </div>


                    {/* =================================================
                        CLOSING
                    ================================================= */}

                    <div className="manager-coach-modal__closing">

                        <span>
                            Practical resources.
                        </span>

                        <span>
                            Meaningful conversations.
                        </span>

                        <span>
                            Better managers.
                        </span>

                        <span>
                            Stronger teams.
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}


// ============================================================
// COMPONENT
// ============================================================

function MiniCoachingGuide() {

    const [selectedGuide, setSelectedGuide] = useState(null);
    const [isManagerCoachOpen, setIsManagerCoachOpen] = useState(false);


    // ========================================================
    // PDF GUIDE
    // ========================================================

    const handleOpenGuide = (guide) => {
        setSelectedGuide(guide);
    };


    const handleCloseGuide = () => {
        setSelectedGuide(null);
    };


    // ========================================================
    // MANAGER AS A COACH
    // ========================================================

    const handleOpenManagerCoach = () => {
        setIsManagerCoachOpen(true);
    };


    const handleCloseManagerCoach = () => {
        setIsManagerCoachOpen(false);
    };


    return (
        <>
            <section
                className="mini-coaching-guide"
                id="mini-coaching-guide"
            >

                <div className="mini-coaching-guide__container">

                    {/* =================================================
                        INTRO
                    ================================================= */}

                    <div className="mini-coaching-guide__intro">

                        {/* =============================================
                            INTRO COPY
                        ============================================= */}

                        <div className="mini-coaching-guide__intro-copy">

                            <span className="mini-coaching-guide__eyebrow">
                                Manager as a Coach
                            </span>


                            <h2 className="mini-coaching-guide__heading">
                                Practical resources for better
                                <br />
                                <span>leadership.</span>
                            </h2>


                            <div className="mini-coaching-guide__description-row">

                                <div className="mini-coaching-guide__description-content">

                                    <p className="mini-coaching-guide__description">
                                        Short, practical resources to help you  and your team think
                                        differently about people, leadership,
                                        teams and business.
                                    </p>


                                   

                                </div>

                            </div>

                        </div>


                        {/* =============================================
                            MANAGER AS A COACH BUTTON
                        ============================================= */}

                       <button
    type="button"
    className="mini-coaching-guide__manager-coach"
    onClick={handleOpenManagerCoach}
>
    <span className="mini-coaching-guide__manager-coach-icon">
        <FileText
            size={22}
            strokeWidth={1.8}
        />
    </span>

    <span className="mini-coaching-guide__manager-coach-content">

        <span className="mini-coaching-guide__manager-coach-label">
            MANAGER AS A COACH
        </span>

        <span className="mini-coaching-guide__manager-coach-title">
            Want to Coach Your Team?
        </span>

        <span className="mini-coaching-guide__manager-coach-cta">
           Click Here
            <ArrowRight
                className="mini-coaching-guide__manager-coach-arrow"
                size={17}
            />
        </span>

    </span>
</button>
                    </div>


                    {/* =================================================
                        CARDS
                    ================================================= */}

                    <div className="mini-coaching-guide__cards">

                        {coachingGuides.map((guide) => (

                            <article
                                className="mini-coaching-card"
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

                                <div className="mini-coaching-card__cover">

                                    <img
                                        src={guide.cover}
                                        alt={guide.title}
                                    />


                                    <div className="mini-coaching-card__overlay">

                                        <span>
                                            OPEN RESOURCE
                                        </span>

                                        <ArrowRight size={18} />

                                    </div>

                                </div>


                                {/* =====================================
                                    CONTENT
                                ===================================== */}

                                <div className="mini-coaching-card__content">

                                    <div className="mini-coaching-card__meta">

                                        <div className="mini-coaching-card__meta-left">

                                            <span className="mini-coaching-card__number">
                                                {guide.number}
                                            </span>


                                            <span className="mini-coaching-card__category">
                                                {guide.category}
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            className="mini-coaching-card__link"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleOpenGuide(guide);
                                            }}
                                        >
                                            <span>Explore</span>
                                            <ArrowRight size={17} />
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                PDF MODAL
            ===================================================== */}

            <CoachingGuideModal
                isOpen={Boolean(selectedGuide)}
                guide={selectedGuide}
                onClose={handleCloseGuide}
            />


            {/* =====================================================
                MANAGER AS A COACH MODAL
            ===================================================== */}

            <ManagerAsCoachModal
                isOpen={isManagerCoachOpen}
                onClose={handleCloseManagerCoach}
            />

        </>
    );
}


export default MiniCoachingGuide;
