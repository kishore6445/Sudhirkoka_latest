import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

import InsightTabs from "../../components/insights/InsightTabs";
import StoryPanel from "../../components/insights/StoryPanel";
import ShareStoryModal from "../../components/insights/ShareStoryModal";
import YouTubeModal from "../../components/insights/YouTubeModal";
import SocialLinksCard from "../../components/insights/SocialLinksCard";
import "../../styles/insights.css";

import featuredVideo from "../../assets/images/insights/featured-video.jpg";
import smallvideo1 from "../../assets/images/insights/video-2.jpg";
import smallvideo2 from "../../assets/images/insights/video-3.jpg";


/* =========================================================
   INSIGHTS VIDEOS
========================================================= */

const videos = [
    {
        id: 1,

        image: featuredVideo,

        // category: "LEADERSHIP",

        title:
            "Introduction to Winspiring Minds",

        description:
            <p>Welcome to Winspiring Minds — where insights inspire better leadership and stronger performance. In this introduction, we begin a journey focused on leadership development, people development, business insights and transformative learning.
Together, we will build the skills you need to lead with impact.</p>
,

        // duration: "06:24",

        featured: true,

        youtubeUrl:
            "https://www.youtube.com/watch?v=vsx-UJ4TzWQ",
    },

    {
        id: 2,

        image: smallvideo1,

        // category: "ORGANISATION",

        title:
            "Introduction to Frameworks",

        description:
            "In this series, we explore practical leadership frameworks, business frameworks.",

        // duration: "05:31",

        youtubeUrl:
            "https://www.youtube.com/watch?v=7toK3gr0cLE&list=PLdWpKTCL4Fma47hiNFED20YSKMri_U696&index=3",
    },

    {
        id: 3,

        image: smallvideo2,

        // category: "TEAMS",

        title:
            "Introduction to Skills",

        description:
            "What sets great professionals apart? The skills they build and apply",

        // duration: "07:15",

        youtubeUrl:
            "https://www.youtube.com/watch?v=7toK3gr0cLE",
    },
];


/* =========================================================
   PLAY BUTTON
========================================================= */

function PlayButton({ large = false }) {

    return (
        <div
            className={`video-play-button ${
                large ? "large" : ""
            }`}
        >
            <Play
                size={large ? 27 : 18}
                fill="currentColor"
                strokeWidth={0}
            />
        </div>
    );
}


/* =========================================================
   VIDEO CARD
========================================================= */

function VideoCard({
    video,
    featured = false,
    onVideoClick,
}) {

    return (

        <article
            className={`insight-video-card ${
                featured
                    ? "featured-video-card"
                    : "small-video-card"
            }`}

            onClick={() => onVideoClick(video)}

            role="button"

            tabIndex={0}

            onKeyDown={(event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();

                    onVideoClick(video);
                }

            }}
        >

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="insight-video-image-wrapper">

                <img
                    src={video.image}
                    alt={video.title}
                    className="insight-video-image"
                />


                {/* Play */}

                <PlayButton
                    large={featured}
                />


                {/* Duration */}

                <span className="video-duration">
                    {video.duration}
                </span>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="insight-video-content">

                <span className="video-category">
                    {video.category}
                </span>


                <h3>
                    {video.title}
                </h3>


                <p>
                    {video.description}
                </p>


                {/* =================================================
                    WATCH LINK

                    This still takes the user to the Videos
                    library instead of opening the modal.
                ================================================= */}

               <button
    type="button"
    className="watch-link"
    onClick={(event) => {
        event.stopPropagation();
        onVideoClick(video);
    }}
>
    <span>
        Watch
    </span>

    <ArrowRight size={18} />
</button>

            </div>

        </article>
    );
}


/* =========================================================
   INSIGHTS
========================================================= */

function Insights() {

    /* =====================================================
       SHARE STORY MODAL
    ===================================================== */

    const [
        isShareStoryOpen,
        setIsShareStoryOpen
    ] = useState(false);


    /* =====================================================
       YOUTUBE VIDEO MODAL
    ===================================================== */

    const [
        selectedVideo,
        setSelectedVideo
    ] = useState(null);


    /* =====================================================
       SHARE STORY HANDLERS
    ===================================================== */

    const handleOpenShareStory = () => {

        setIsShareStoryOpen(true);

    };


    const handleCloseShareStory = () => {

        setIsShareStoryOpen(false);

    };


    /* =====================================================
       VIDEO HANDLER
    ===================================================== */

    const handleVideoClick = (video) => {

        setSelectedVideo(video);

    };


    const handleCloseVideo = () => {

        setSelectedVideo(null);

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="insights-section"
            id="insights"
        >

            <div className="insights-container">


                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="insights-header">

                    <div className="insights-header-main">


                        {/* Eyebrow */}

                        <div className="section-eyebrow">

                            {/* <span>
                                02
                            </span> */}

                            <i />

                            <span>
                                INSIGHTS
                            </span>
                            
                        </div>
{/* <div className="insights-header-line" /> */}

                        {/* Heading */}

                        <h2 className="insights-heading">

                            Excellence is not learned once.

                            <br />

                            It is{" "}

                            <span>
                                developed every day.
                            </span>

                        </h2>


                        {/* Description */}

                        <p className="insights-description">

                            Practical WorkPlace & leadership ideas,
                            articles, videos and reflections drawn
                            from decades of working with organisations.

                        </p>

                    </div>


                    {/* =================================================
                        BROWSE ALL

                        Currently disabled.
                    ================================================= */}

                    {/*

                    <div className="insights-header-action">

                        <Link to="/insights/videos">

                            <span>
                                Browse All Insights
                            </span>

                            <ArrowRight size={20} />

                        </Link>

                    </div>

                    */}

                </div>


                {/* =================================================
                    INSIGHTS NAVIGATION
                ================================================= */}

                <InsightTabs />


                {/* =================================================
                    FEATURED CONTENT
                ================================================= */}

                <div className="insights-content">


                    {/* =================================================
                        LEFT — VIDEOS
                    ================================================= */}

                    <div className="insights-video-area">


                        {/* =============================================
                            FEATURED VIDEO
                        ============================================= */}

                        <VideoCard
                            video={videos[0]}
                            featured={true}
                            onVideoClick={handleVideoClick}
                        />


                        {/* =============================================
                            SMALL VIDEOS
                        ============================================= */}

                        <div className="small-videos-grid">


                            {/* Small Video 01 */}

                            <VideoCard
                                video={videos[1]}
                                onVideoClick={handleVideoClick}
                            />


                            {/* Small Video 02 */}

                            <VideoCard
                                video={videos[2]}
                                onVideoClick={handleVideoClick}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT — OUR STORY
                    ================================================= */}

                   {/* =================================================
    RIGHT — OUR STORY + SOCIAL
================================================= */}

<div className="insights-side-column">

    <StoryPanel
        onShareStory={
            handleOpenShareStory
        }
    />

    <SocialLinksCard />

</div>

                </div>

            </div>


            {/* =========================================================
                SHARE STORY MODAL
            ========================================================= */}

            <ShareStoryModal
                isOpen={isShareStoryOpen}
                onClose={handleCloseShareStory}
            />


            {/* =========================================================
                YOUTUBE VIDEO MODAL
            ========================================================= */}

            <YouTubeModal
                isOpen={Boolean(selectedVideo)}

                videoUrl={
                    selectedVideo?.youtubeUrl
                }

                title={
                    selectedVideo?.title
                }

                onClose={
                    handleCloseVideo
                }
            />

        </section>
    );
}


export default Insights;