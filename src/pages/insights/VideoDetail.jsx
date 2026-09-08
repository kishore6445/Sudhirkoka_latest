// src/pages/insights/VideoDetail.jsx

import {
    ArrowLeft,
    ArrowRight,
    Play,
    Clock3,
    CalendarDays,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    videoCategories,
    videos,
} from "../../data/insightsData";

import "../../styles/video-detail.css";


/* =========================================================
   YOUTUBE URL → EMBED URL
========================================================= */

function getYouTubeEmbedUrl(url) {

    if (!url) {
        return "";
    }

    try {

        const parsedUrl = new URL(url);

        let videoId = "";


        /* =============================================
           STANDARD YOUTUBE URL

           https://www.youtube.com/watch?v=VIDEO_ID
        ============================================= */

        if (
            parsedUrl.hostname.includes("youtube.com") &&
            parsedUrl.searchParams.get("v")
        ) {

            videoId =
                parsedUrl.searchParams.get("v");

        }


        /* =============================================
           SHORT YOUTUBE URL

           https://youtu.be/VIDEO_ID
        ============================================= */

        else if (
            parsedUrl.hostname === "youtu.be"
        ) {

            videoId =
                parsedUrl.pathname.slice(1);

        }


        /* =============================================
           EMBED URL

           https://www.youtube.com/embed/VIDEO_ID
        ============================================= */

        else if (
            parsedUrl.pathname.startsWith("/embed/")
        ) {

            videoId =
                parsedUrl.pathname
                    .split("/embed/")[1]
                    ?.split("/")[0];

        }


        if (!videoId) {
            return "";
        }


        return (
            `https://www.youtube.com/embed/${videoId}` +
            `?autoplay=1&rel=0`
        );

    } catch {

        return "";

    }
}


/* =========================================================
   VIDEO DETAIL
========================================================= */

function VideoDetail() {

    const {
        category,
        videoId,
    } = useParams();


    /* =====================================================
       VIDEO PLAY STATE
    ===================================================== */

    const [
        isPlaying,
        setIsPlaying
    ] = useState(false);


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, [category, videoId]);


    /* =====================================================
       RESET VIDEO WHEN ROUTE CHANGES
    ===================================================== */

    useEffect(() => {

        setIsPlaying(false);

    }, [category, videoId]);


    /* =====================================================
       FIND CURRENT VIDEO
    ===================================================== */

    const video = videos.find(
        (item) =>
            item.id === videoId &&
            item.category === category
    );


    /* =====================================================
       FIND CURRENT CATEGORY
    ===================================================== */

    const currentCategory =
        videoCategories.find(
            (item) => item.id === category
        );


    /* =====================================================
       INVALID VIDEO
    ===================================================== */

    if (!video || !currentCategory) {

        return (

            <main className="video-detail-page">

                <section className="video-detail-not-found">

                    <span className="video-detail-not-found-label">
                        VIDEO LIBRARY
                    </span>


                    <h1>
                        Video not found.
                    </h1>


                    <p>
                        The video you're looking for
                        could not be found.
                    </p>


                    <Link
                        to="/insights/videos"
                        className="video-detail-back-button"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to Video Library
                        </span>

                    </Link>

                </section>

            </main>

        );
    }


    /* =====================================================
       RELATED VIDEOS
    ===================================================== */

    const relatedVideos = videos
        .filter(
            (item) =>
                item.category === category &&
                item.id !== video.id
        )
        .slice(0, 3);


    /* =====================================================
       YOUTUBE EMBED URL
    ===================================================== */

    const youtubeEmbedUrl =
        getYouTubeEmbedUrl(
            video.youtubeUrl
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main className="video-detail-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="video-detail-hero">

                <div className="video-detail-container">


                    {/* =================================================
                        BACK TO CATEGORY
                    ================================================= */}

                    <Link
                        to={`/insights/videos/${category}`}
                        className="video-detail-back"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to {currentCategory.title}
                        </span>

                    </Link>


                    {/* =================================================
                        BREADCRUMB
                    ================================================= */}

                    <div className="video-detail-breadcrumb">

                        <Link to="/insights/videos">
                            Videos
                        </Link>

                        <span>
                            /
                        </span>

                        <Link
                            to={`/insights/videos/${category}`}
                        >
                            {currentCategory.title}
                        </Link>

                        <span>
                            /
                        </span>

                        <span>
                            {video.categoryLabel}
                        </span>

                    </div>


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div className="video-detail-heading">

                        <span className="video-detail-category">
                            {video.categoryLabel}
                        </span>

                        <h1>
                            {video.title}
                        </h1>

                    </div>


                    {/* =================================================
                        VIDEO PLAYER
                    ================================================= */}

                    <div className="video-detail-player">

                        {!isPlaying ? (

                            <>
                                {/* =====================================
                                    THUMBNAIL
                                ===================================== */}

                                <img
                                    src={video.image}
                                    alt={video.title}
                                />


                                {/* =====================================
                                    OVERLAY
                                ===================================== */}

                                <div className="video-detail-player-overlay" />


                                {/* =====================================
                                    PLAY BUTTON
                                ===================================== */}

                                <button
                                    type="button"
                                    className="video-detail-play"
                                    aria-label={`Play ${video.title}`}
                                    onClick={() => {

                                        if (
                                            youtubeEmbedUrl
                                        ) {
                                            setIsPlaying(true);
                                        }

                                    }}
                                >

                                    <Play
                                        size={30}
                                        fill="currentColor"
                                        strokeWidth={0}
                                    />

                                </button>


                                {/* =====================================
                                    DURATION
                                ===================================== */}

                                <span className="video-detail-player-duration">
                                    {video.duration}
                                </span>

                            </>

                        ) : (

                            /* =========================================
                               YOUTUBE PLAYER

                               Replaces thumbnail inside same card.
                            ========================================= */

                            youtubeEmbedUrl ? (

                                <iframe
                                    className="video-detail-youtube"
                                    src={youtubeEmbedUrl}
                                    title={video.title}
                                    allow="
                                        accelerometer;
                                        autoplay;
                                        clipboard-write;
                                        encrypted-media;
                                        gyroscope;
                                        picture-in-picture;
                                        web-share
                                    "
                                    allowFullScreen
                                />

                            ) : (

                                /* =====================================
                                   INVALID / MISSING YOUTUBE URL
                                ===================================== */

                                <div className="video-detail-player-error">

                                    <div className="video-detail-player-error-icon">
                                        !
                                    </div>

                                    <h3>
                                        Video unavailable
                                    </h3>

                                    <p>
                                        The YouTube video link
                                        has not been added yet.
                                    </p>

                                </div>

                            )

                        )}

                    </div>

                </div>

            </section>


            {/* =================================================
                VIDEO INFORMATION
            ================================================= */}

            <section className="video-detail-information">

                <div className="video-detail-container">

                    <div className="video-detail-info-grid">


                        {/* =================================================
                            MAIN INFORMATION
                        ================================================= */}

                        <article className="video-detail-main">

                            <span className="video-detail-eyebrow">
                                ABOUT THIS VIDEO
                            </span>

                            <h2>
                                {video.title}
                            </h2>

                            <p className="video-detail-description">
                                {video.description}
                            </p>


                            {/* =================================================
                                META
                            ================================================= */}

                            <div className="video-detail-meta">


                                {/* DURATION */}

                                <div className="video-detail-meta-item">

                                    <Clock3 size={17} />

                                    <div>

                                        <span>
                                            DURATION
                                        </span>

                                        <strong>
                                            {video.duration}
                                        </strong>

                                    </div>

                                </div>


                                {/* PUBLISHED */}

                                {video.publishedDate && (

                                    <div className="video-detail-meta-item">

                                        <CalendarDays size={17} />

                                        <div>

                                            <span>
                                                PUBLISHED
                                            </span>

                                            <strong>
                                                {video.publishedDate}
                                            </strong>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </article>


                        {/* =================================================
                            CATEGORY SIDEBAR
                        ================================================= */}

                        <aside className="video-detail-sidebar">

                            <span>
                                EXPLORE THIS CATEGORY
                            </span>

                            <h3>
                                {currentCategory.title}
                            </h3>

                            <p>
                                {currentCategory.description}
                            </p>

                            <Link
                                to={`/insights/videos/${category}`}
                                className="video-detail-category-link"
                            >

                                <span>
                                    View all videos
                                </span>

                                <ArrowRight size={17} />

                            </Link>

                        </aside>

                    </div>

                </div>

            </section>


            {/* =================================================
                RELATED VIDEOS
            ================================================= */}

            {relatedVideos.length > 0 && (

                <section className="video-detail-related">

                    <div className="video-detail-container">


                        {/* =================================================
                            RELATED HEADER
                        ================================================= */}

                        <div className="video-detail-related-heading">

                            <div>

                                <span>
                                    MORE FROM {video.categoryLabel}
                                </span>

                                <h2>
                                    Keep watching.
                                </h2>

                            </div>


                            <Link
                                to={`/insights/videos/${category}`}
                                className="video-detail-view-category"
                            >

                                <span>
                                    View category
                                </span>

                                <ArrowRight size={17} />

                            </Link>

                        </div>


                        {/* =================================================
                            RELATED GRID
                        ================================================= */}

                        <div className="video-detail-related-grid">

                            {relatedVideos.map(
                                (relatedVideo) => (

                                    <Link
                                        key={relatedVideo.id}
                                        to={
                                            `/insights/videos/` +
                                            `${category}/` +
                                            `${relatedVideo.id}`
                                        }
                                        className="video-detail-related-card"
                                    >

                                        <div className="video-detail-related-image">

                                            <img
                                                src={relatedVideo.image}
                                                alt={relatedVideo.title}
                                            />

                                            <div className="video-detail-related-overlay" />

                                            <span className="video-detail-related-play">

                                                <Play
                                                    size={15}
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                />

                                            </span>

                                            <small>
                                                {relatedVideo.duration}
                                            </small>

                                        </div>


                                        <div className="video-detail-related-content">

                                            <span>
                                                {relatedVideo.categoryLabel}
                                            </span>

                                            <h3>
                                                {relatedVideo.title}
                                            </h3>

                                        </div>

                                    </Link>

                                )
                            )}

                        </div>

                    </div>

                </section>

            )}


            {/* =================================================
                BOTTOM NAVIGATION
            ================================================= */}

            <section className="video-detail-bottom">

                <div className="video-detail-container">

                    <Link
                        to={`/insights/videos/${category}`}
                    >

                        <ArrowLeft size={18} />

                        <div>

                            <span>
                                BACK TO
                            </span>

                            <strong>
                                {currentCategory.title}
                            </strong>

                        </div>

                    </Link>


                    <Link
                        to="/insights/videos"
                    >

                        <div>

                            <span>
                                EXPLORE
                            </span>

                            <strong>
                                Video Library
                            </strong>

                        </div>

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </section>

        </main>
    );
}


export default VideoDetail;