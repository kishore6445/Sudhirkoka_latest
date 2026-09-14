import {
    UsersRound,
    Flag,
    BarChart3,
    Target,
    Play,
} from "lucide-react";

import { heroData } from "../../../data/heroData";

import SectionLabel from "../../common/SectionLabel/SectionLabel";

import "./Hero.css";


function Hero() {

    const {
        eyebrow,
        description,
        image,
    } = heroData;


    const pillars = [
        {
            icon: UsersRound,
            title: "STRONG PEOPLE",
            description: "Build the Right Teams",
        },

        {
            icon: Flag,
            title: "STRONG LEADERS",
            description: "Create Ownership",
        },

        {
            icon: BarChart3,
            title: "STRONG SYSTEMS",
            description: "Drive Performance",
        },

        {
            icon: Target,
            title: "STRONG BUSINESSES",
            description: "Sustain Growth",
        },
    ];


    /* =========================================================
       INTRO PDF
    ========================================================= */

    const introPdfUrl = "/Winspiring Minds PPT (1).pdf";


    /* =========================================================
       OPEN INTRO PDF
    ========================================================= */

    const handleOpenIntroPdf = () => {

        window.open(
            introPdfUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


    return (

        <section
            className="hero"
            id="home"
        >

            <div className="hero__container">


                {/* =================================================
                    MAIN HERO
                ================================================= */}

                <div className="hero__main">


                    {/* =================================================
                        LEFT CONTENT
                    ================================================= */}

                    <div className="hero__content">

                        {/* Eyebrow */}

                        <SectionLabel variant="gold">

                            {eyebrow}

                        </SectionLabel>


                        {/* Heading */}

                        <h1 className="hero__title">

                            <span>

                                STRONG{" "}

                                <span className="hero__gold">
                                    PEOPLE,
                                </span>

                            </span>


                            <span>

                                STRONG{" "}

                                <span className="hero__gold">
                                    LEADERS
                                </span>

                                {"\u00A0&"}

                            </span>


                            <span>

                                STRONG{" "}

                                <span className="hero__gold">
                                    BUSINESSES.
                                </span>

                            </span>

                        </h1>


                        {/* Description */}

                        <p className="hero__description">

                            {description}

                        </p>


                        {/* =================================================
                            INTRO PDF
                        ================================================= */}

                        <div className="hero__actions">

                            <button
                                className="hero__video-button"
                                type="button"
                                onClick={handleOpenIntroPdf}
                                aria-label="View Winspiring Minds introduction"
                            >

                                {/* PDF Thumbnail */}

                                <span className="hero__video-thumbnail">

                                    <span className="hero__thumbnail-wave" />

                                    <span className="hero__play-icon">

                                        <Play
                                            size={17}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />

                                    </span>

                                </span>


                                {/* PDF Information */}

                                <span className="hero__video-content">

                                    <span className="hero__video-label">
                                        VIEW OUR INTRODUCTION
                                    </span>

                                    <span className="hero__video-description">
                                        Discover how we approach people,
                                        leadership & growth
                                    </span>

                                </span>

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT VISUAL
                    ================================================= */}

                    <div className="hero__visual">

                        <div className="hero__city-glow" />

                        <div className="hero__growth-bars">

                            <span />
                            <span />
                            <span />
                            <span />

                        </div>


                        <div className="hero__person">

                            <div className="hero__person-glow" />

                            <img
                                src={image}
                                alt="Sudhir"
                                className="hero__image"
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    FOUR PILLARS
                ================================================= */}

                <div className="hero__pillars">

                    {pillars.map((pillar) => {

                        const Icon = pillar.icon;

                        return (

                            <div
                                className="hero__pillar"
                                key={pillar.title}
                            >

                                <div className="hero__pillar-icon">

                                    <Icon
                                        size={32}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                <h3>
                                    {pillar.title}
                                </h3>


                                <p>
                                    {pillar.description}
                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );
}


export default Hero;