import {
    ArrowLeft,
    ArrowRight,
    Play,
    PlayCircle,
    Lightbulb,
    Zap,
} from "lucide-react";

import { useEffect } from "react";
import { Link } from "react-router-dom";

// import YouTubeModal from "../../components/insights/YouTubeModal";

// =========================================================
// VIDEO DATA
// Keep commented for now.
// Uncomment when video cards are brought back.
// =========================================================

// import {
//     videoCategories,
//     videos,
// } from "../../data/insightsData";

import "../../styles/video-library.css";


// =========================================================
// CATEGORY CARD
// =========================================================
// Kept here for future use.
// Uncomment this entire section when category cards
// are required again.

/*
function CategoryCard({ category }) {

    const categoryVideos = videos.filter(
        (video) => video.category === category.id
    );

    return (
        <Link
            to={`/insights/videos/${category.id}`}
            className="video-library-category-card"
        >

            {/!* NUMBER RAIL *!/}

            <div className="video-library-category-top">

                <span className="video-library-category-number">
                    {category.number}
                </span>

            </div>


            {/!* CONTENT *!/}

            <div className="video-library-category-body">

                <h3>
                    {category.title}
                </h3>

                <p>
                    {category.description}
                </p>

            </div>


            {/!* FOOTER *!/}

            <div className="video-library-category-footer">

                <span>
                    {categoryVideos.length}{" "}
                    {categoryVideos.length === 1
                        ? "Video"
                        : "Videos"}
                </span>

                <span className="video-library-explore">
                    Explore
                    <ArrowRight size={17} />
                </span>

            </div>

        </Link>
    );
}
*/


// =========================================================
// VIDEO LIBRARY
// =========================================================

function VideoLibrary() {

    /*
    // =====================================================
    // VIDEO MODAL
    // Keep commented for now.
    // Uncomment when video cards are brought back.
    // =====================================================

    const [selectedVideo, setSelectedVideo] = useState(null);
    */


    // =====================================================
    // SCROLL TO TOP
    // =====================================================

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, []);


    return (

        <main className="video-library-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="video-library-hero">

                {/* Decorative circles */}

                <div className="video-library-hero-decoration video-library-hero-decoration-one" />

                <div className="video-library-hero-decoration video-library-hero-decoration-two" />


                <div className="video-library-hero-container">


                    {/* =================================================
                        BACK
                    ================================================= */}

                    <Link
                        to="/#insights"
                        className="video-library-back"
                    >

                        <ArrowLeft size={18} />

                        <span>
                            Back to Insights
                        </span>

                    </Link>


                    {/* =================================================
                        HERO MAIN
                    ================================================= */}

                    <div className="video-library-hero-main">


                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <div className="video-library-hero-heading">


                            {/* EYEBROW */}

                            <div className="video-library-eyebrow">

                                <i />

                                <span>
                                    VIDEO LIBRARY
                                </span>

                            </div>


                            {/* HEADING */}

                            <h1>

                                Watch Think

                                <br />

                                <span>
                                    Grow.
                                </span>

                            </h1>


                            {/* DESCRIPTION */}

                            <p className="video-library-hero-description">

                                Conversations, practical frameworks and
                                leadership ideas to help you think differently,
                                see things clearly and move forward.

                            </p>


                            {/* =================================================
                                VALUE POINTS
                            ================================================= */}

                            <div className="video-library-values">


                                {/* VALUE 01 */}

                                <div className="video-library-value">

                                    <div className="video-library-value-icon">

                                        <Play
                                            size={17}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />

                                    </div>

                                    <div>

                                        <strong>
                                            CONVERSATIONS
                                        </strong>

                                        <span>
                                            Hear ideas from experience
                                        </span>

                                    </div>

                                </div>


                                {/* DIVIDER */}

                                <div className="video-library-value-divider" />


                                {/* VALUE 02 */}

                                <div className="video-library-value">

                                    <div className="video-library-value-icon">

                                        <Zap
                                            size={18}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />

                                    </div>

                                    <div>

                                        <strong>
                                            PRACTICAL IDEAS
                                        </strong>

                                        <span>
                                            Built for real situations
                                        </span>

                                    </div>

                                </div>


                                {/* DIVIDER */}

                                <div className="video-library-value-divider" />


                                {/* VALUE 03 */}

                                <div className="video-library-value">

                                    <div className="video-library-value-icon">

                                        <Lightbulb
                                            size={18}
                                            strokeWidth={1.8}
                                        />

                                    </div>

                                    <div>

                                        <strong>
                                            DEEPER PERSPECTIVE
                                        </strong>

                                        <span>
                                            Think beyond the obvious
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT ARCHITECTURAL GRAPHIC
                        ================================================= */}

                        <div className="video-library-graphic">

                            <span className="video-library-circle video-library-circle--one" />

                            <span className="video-library-circle video-library-circle--two" />

                            <span className="video-library-circle video-library-circle--three" />


                            {/* Vertical line */}

                            <span className="video-library-graphic-line video-library-graphic-line--vertical" />


                            {/* Horizontal line */}

                            <span className="video-library-graphic-line video-library-graphic-line--horizontal" />


                            {/* Center */}

                            <div className="video-library-graphic-center">

                                <Play
                                    size={21}
                                    fill="currentColor"
                                    strokeWidth={0}
                                />

                            </div>


                            {/* Labels */}

                            <span className="video-library-graphic-label video-library-graphic-label--perspective">
                                PERSPECTIVE
                            </span>

                            <span className="video-library-graphic-label video-library-graphic-label--people">
                                PEOPLE
                            </span>

                            <span className="video-library-graphic-label video-library-graphic-label--action">
                                ACTION
                            </span>

                            <span className="video-library-graphic-label video-library-graphic-label--leadership">
                                LEADERSHIP
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        HERO BOTTOM LINE
                    ================================================= */}

                    <div className="video-library-hero-line" />

                    <div className="video-library-hero-dot" />


                    {/* =================================================
                        SCROLL INDICATOR
                    ================================================= */}

                    <div className="video-library-scroll">

                        <span>
                            SCROLL TO EXPLORE
                        </span>

                        <i />

                    </div>

                </div>

            </section>


            {/* =========================================================
                EXPLORE BY CATEGORY
            ========================================================= */}

            <section className="video-library-categories">

                <div className="video-library-container">


                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="video-library-section-heading">

                        <div>

                            <span className="video-library-section-eyebrow">
                                EXPLORE BY CATEGORY
                            </span>

                            <h2>
                                Browse videos by what
                                <br />
                                interests you.
                            </h2>

                        </div>

                    </div>


                    {/* =================================================
                        VIDEOS COMING SOON
                    ================================================= */}

                    <div className="video-library-coming-soon">

                        <div className="video-library-coming-soon-icon">
                            <PlayCircle size={28} />
                        </div>

                        <h3>
                            Videos will be updated.
                        </h3>

                        <p>
                            Stay tuned for conversations, practical ideas
                            and leadership perspectives.
                        </p>

                    </div>


                    {/* =================================================
                        CATEGORY GRID — COMMENTED FOR NOW
                        
                        Uncomment this section later when you want
                        the category cards back.
                    ================================================= */}

                    {/*
                    <div className="video-library-category-grid">

                        {videoCategories.map((category) => (

                            <CategoryCard
                                key={category.id}
                                category={category}
                            />

                        ))}

                    </div>
                    */}

                </div>

            </section>


            {/* =================================================
                YOUTUBE MODAL
                Commented for now because there are no video
                cards displayed.
                
                Uncomment later together with:
                - useState import
                - selectedVideo state
                - YouTubeModal import
                - video card click handlers
            ================================================= */}

            {/*
            <YouTubeModal
                isOpen={Boolean(selectedVideo)}
                videoUrl={selectedVideo?.youtubeUrl}
                title={selectedVideo?.title}
                onClose={() => setSelectedVideo(null)}
            />
            */}

        </main>
    );
}


export default VideoLibrary;