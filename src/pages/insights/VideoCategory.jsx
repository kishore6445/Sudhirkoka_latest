import {
    ArrowLeft,
    ArrowRight,
    Play,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import { useEffect } from "react";

import {
    videoCategories,
    videos,
} from "../../data/insightsData";

import "../../styles/video-category.css";


/* =========================================================
   CATEGORY VIDEO CARD
========================================================= */

function CategoryVideoCard({ video }) {

    return (
        <article className="vc-video-card">

            {/* VIDEO IMAGE */}

            <Link
                to={`/insights/videos/${video.category}/${video.id}`}
                className="vc-video-media"
            >

                <img
                    src={video.image}
                    alt={video.title}
                />

                <div className="vc-video-overlay" />

                <div className="vc-video-play">

                    <Play
                        size={19}
                        fill="currentColor"
                        strokeWidth={0}
                    />

                </div>

                <span className="vc-video-duration">
                    {video.duration}
                </span>

            </Link>


            {/* CONTENT */}

            <div className="vc-video-content">

                <span className="vc-video-category">
                    {video.categoryLabel}
                </span>


                <Link
                    to={`/insights/videos/${video.category}/${video.id}`}
                    className="vc-video-title-link"
                >

                    <h3>
                        {video.title}
                    </h3>

                </Link>


                <p>
                    {video.description}
                </p>


                <Link
                    to={`/insights/videos/${video.category}/${video.id}`}
                    className="vc-video-watch"
                >

                    <span>
                        Watch video
                    </span>

                    <ArrowRight size={17} />

                </Link>

            </div>

        </article>
    );
}


/* =========================================================
   FEATURED CATEGORY VIDEO
========================================================= */

function CategoryFeaturedVideo({ video }) {

    if (!video) {
        return null;
    }


    return (

        <article className="vc-featured">

            {/* FEATURED VIDEO */}

            <Link
                to={`/insights/videos/${video.category}/${video.id}`}
                className="vc-featured-media"
            >

                <img
                    src={video.image}
                    alt={video.title}
                />

                <div className="vc-featured-overlay" />

                <div className="vc-featured-play">

                    <Play
                        size={30}
                        fill="currentColor"
                        strokeWidth={0}
                    />

                </div>


                <span className="vc-featured-duration">
                    {video.duration}
                </span>

            </Link>


            {/* FEATURED INFORMATION */}

            <div className="vc-featured-content">

                <span className="vc-featured-label">
                    FEATURED FROM THIS CATEGORY
                </span>


                <h2>
                    {video.title}
                </h2>


                <p>
                    {video.description}
                </p>


                <Link
                    to={`/insights/videos/${video.category}/${video.id}`}
                    className="vc-featured-link"
                >

                    <span>
                        Watch featured video
                    </span>

                    <ArrowRight size={18} />

                </Link>

            </div>

        </article>
    );
}


/* =========================================================
   VIDEO CATEGORY PAGE
========================================================= */

function VideoCategory() {

    const {
        category,
    } = useParams();


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, [category]);


    /* =====================================================
       FIND CATEGORY
    ===================================================== */

    const currentCategory =
        videoCategories.find(
            (item) => item.id === category
        );


    /* =====================================================
       CATEGORY VIDEOS
    ===================================================== */

    const categoryVideos =
        videos.filter(
            (video) =>
                video.category === category
        );


    /* =====================================================
       FEATURED VIDEO
    ===================================================== */

    const featuredVideo =
        categoryVideos.find(
            (video) => video.featured
        ) || categoryVideos[0];


    /* =====================================================
       REMAINING VIDEOS
    ===================================================== */

    const remainingVideos =
        categoryVideos.filter(
            (video) =>
                video.id !== featuredVideo?.id
        );


    /* =====================================================
       INVALID CATEGORY
    ===================================================== */

    if (!currentCategory) {

        return (

            <main className="video-category-page">

                <section className="vc-not-found">

                    <span>
                        VIDEO LIBRARY
                    </span>

                    <h1>
                        Category not found.
                    </h1>

                    <p>
                        The video category you're looking for
                        doesn't exist.
                    </p>

                    <Link
                        to="/insights/videos"
                        className="vc-back-button"
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


    return (

        <main className="video-category-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="vc-hero">

                <div className="vc-hero-inner">


                    {/* =================================================
                        BACK TO LIBRARY
                    ================================================= */}

                    <Link
                        to="/insights/videos"
                        className="vc-back-link"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to Video Library
                        </span>

                    </Link>


                    {/* =================================================
                        CATEGORY NAVIGATION
                    ================================================= */}

                    <nav className="vc-category-nav">

                        {videoCategories.map(
                            (item) => (

                                <Link
                                    key={item.id}
                                    to={`/insights/videos/${item.id}`}
                                    className={`vc-category-nav-item ${
                                        item.id === category
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    {item.title}

                                </Link>

                            )
                        )}

                    </nav>


                    {/* =================================================
                        NEW HERO INTRO
                    ================================================= */}

                    <div className="vc-hero-intro">

                        <div className="vc-hero-eyebrow">

                            <span>
                                START HERE
                            </span>

                            <span className="vc-hero-eyebrow-line" />

                        </div>


                        <h1>
                            A conversation worth
                            <br />

                            <span>
                                watching.
                            </span>
                        </h1>


                        <p>
                            Thoughtful conversations, practical ideas
                            and leadership perspectives to help you
                            think differently about people and performance.
                        </p>

                    </div>


                    {/* =================================================
                        FEATURED VIDEO
                    ================================================= */}

                    {featuredVideo && (

                        <CategoryFeaturedVideo
                            video={featuredVideo}
                        />

                    )}

                </div>

            </section>


            {/* =================================================
                MORE VIDEOS
            ================================================= */}

            <section className="vc-videos-section">

                <div className="vc-container">


                    <div className="vc-videos-heading">

                        <div>

                            <span>
                                MORE FROM THIS CATEGORY
                            </span>

                            <h2>
                                Keep exploring.
                            </h2>

                        </div>


                        <span className="vc-count">

                            {categoryVideos.length}{" "}

                            {categoryVideos.length === 1
                                ? "VIDEO"
                                : "VIDEOS"}

                        </span>

                    </div>


                    {remainingVideos.length > 0 ? (

                        <div className="vc-video-grid">

                            {remainingVideos.map(
                                (video) => (

                                    <CategoryVideoCard
                                        key={video.id}
                                        video={video}
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        <div className="vc-empty">

                            <span>
                                MORE COMING SOON
                            </span>

                            <h3>
                                More videos are on the way.
                            </h3>

                            <p>
                                We're preparing more conversations
                                for this category.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* =================================================
                BOTTOM NAVIGATION
            ================================================= */}

            <section className="vc-bottom-navigation">

                <div className="vc-container">

                    <Link
                        to="/insights/videos"
                        className="vc-bottom-link"
                    >

                        <ArrowLeft size={18} />

                        <div>

                            <span>
                                BACK TO
                            </span>

                            <strong>
                                Video Library
                            </strong>

                        </div>

                    </Link>


                    <Link
                        to="/#insights"
                        className="vc-bottom-link right"
                    >

                        <div>

                            <span>
                                EXPLORE MORE
                            </span>

                            <strong>
                                Insights
                            </strong>

                        </div>

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </section>

        </main>
    );
}


export default VideoCategory;