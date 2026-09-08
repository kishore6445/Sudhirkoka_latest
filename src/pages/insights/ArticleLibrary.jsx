import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Lightbulb,
    UsersRound,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    useEffect,
} from "react";

import {
    articles,
} from "../../data/insightsData";

import "../../styles/article-library.css";


function ArticleLibrary() {

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

    }, []);


    const featuredArticle = articles[0];

    const latestArticles = articles.slice(1);


    return (

        <main className="article-library-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="article-library-hero">

                <div className="article-library-container">


                    {/* =================================================
                        BACK TO INSIGHTS
                    ================================================= */}

                    <Link
                        to="/#insights"
                        className="article-library-back"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to Insights
                        </span>

                    </Link>


                    {/* =================================================
                        HERO CONTENT
                    ================================================= */}

                    <div className="article-library-hero-main">


                        {/* =================================================
                            LEFT SIDE
                        ================================================= */}

                        <div className="article-library-heading">


                            {/* EYEBROW */}

                            <div className="article-library-eyebrow">

                                <i />

                                <span>
                                    ARTICLES
                                </span>

                            </div>


                            {/* MAIN HEADING */}

                            <h1>

                                Perspectives

                                <br />

                                <span>
                                    that matter.
                                </span>

                            </h1>


                            {/* SUPPORTING COPY */}

                            <p className="article-library-hero-description">

                                Thoughtful articles on leadership,
                                people, culture and the work we do —
                                for a more informed tomorrow.

                            </p>


                            {/* =================================================
                                VALUE POINTS
                            ================================================= */}

                            <div className="article-library-values">


                                {/* VALUE 01 */}

                                <div className="article-library-value">

                                    <div className="article-library-value-icon">

                                        <BookOpen
                                            size={22}
                                            strokeWidth={1.6}
                                        />

                                    </div>

                                    <span>
                                        DEEPER
                                        <br />
                                        PERSPECTIVES
                                    </span>

                                </div>


                                <div className="article-library-value-divider" />


                                {/* VALUE 02 */}

                                <div className="article-library-value">

                                    <div className="article-library-value-icon">

                                        <Lightbulb
                                            size={22}
                                            strokeWidth={1.6}
                                        />

                                    </div>

                                    <span>
                                        PRACTICAL
                                        <br />
                                        INSIGHTS
                                    </span>

                                </div>


                                <div className="article-library-value-divider" />


                                {/* VALUE 03 */}

                                <div className="article-library-value">

                                    <div className="article-library-value-icon">

                                        <UsersRound
                                            size={22}
                                            strokeWidth={1.6}
                                        />

                                    </div>

                                    <span>
                                        IDEAS FOR
                                        <br />
                                        REAL IMPACT
                                    </span>

                                </div>

                            </div>


                        </div>


                        {/* =================================================
                            RIGHT SIDE INTRO
                        ================================================= */}

                        <div className="article-library-intro">

                            {/* <p>
                                Perspectives designed to help you
                                pause, think differently and move
                                forward with greater clarity.
                            </p> */}

                        </div>


                    </div>


                    {/* =================================================
                        ARCHITECTURAL GRAPHIC
                    ================================================= */}

                    <div
                        className="article-library-graphic"
                        aria-hidden="true"
                    >


                        {/* OUTER CIRCLE */}

                        <span
                            className="
                                article-library-circle
                                article-library-circle--one
                            "
                        />


                        {/* MIDDLE CIRCLE */}

                        <span
                            className="
                                article-library-circle
                                article-library-circle--two
                            "
                        />


                        {/* INNER CIRCLE */}

                        <span
                            className="
                                article-library-circle
                                article-library-circle--three
                            "
                        />


                        {/* DIAGONAL LINE */}

                        <span
                            className="
                                article-library-graphic-line
                                article-library-graphic-line--one
                            "
                        />


                        {/* SECOND LINE */}

                        <span
                            className="
                                article-library-graphic-line
                                article-library-graphic-line--two
                            "
                        />


                        {/* CENTER POINT */}

                        <span
                            className="
                                article-library-graphic-dot
                            "
                        />


                        {/* GRAPHIC LABELS */}

                        <span
                            className="
                                article-library-graphic-label
                                article-library-graphic-label--people
                            "
                        >
                            PEOPLE
                        </span>


                        <span
                            className="
                                article-library-graphic-label
                                article-library-graphic-label--leadership
                            "
                        >
                            LEADERSHIP
                        </span>


                        <span
                            className="
                                article-library-graphic-label
                                article-library-graphic-label--culture
                            "
                        >
                            CULTURE
                        </span>


                        <span
                            className="
                                article-library-graphic-label
                                article-library-graphic-label--impact
                            "
                        >
                            IMPACT
                        </span>

                    </div>


                    {/* =================================================
                        BOTTOM HERO LINE
                    ================================================= */}

                    <div
                        className="article-library-hero-line"
                        aria-hidden="true"
                    />

                    <span
                        className="article-library-hero-dot"
                        aria-hidden="true"
                    />


                    {/* =================================================
                        SCROLL INDICATOR
                    ================================================= */}

                    <div
                        className="article-library-scroll"
                        aria-hidden="true"
                    >

                        <span>
                            SCROLL TO EXPLORE
                        </span>

                        <div className="article-library-scroll-circle">

                            {/* <ArrowRight
                                size={17}
                            /> */}

                        </div>

                    </div>


                </div>

            </section>


            {/* =================================================
                FEATURED ARTICLE
            ================================================= */}

            {featuredArticle && (

                <section className="article-library-featured">

                    <div className="article-library-container">


                        <div className="article-library-section-heading">

                            <span>
                                FEATURED ARTICLE
                            </span>

                            <h2>
                                Worth taking a closer look.
                            </h2>

                        </div>


                        <Link
                            to={`/insights/articles/${featuredArticle.category}/${featuredArticle.id}`}
                            className="article-featured-row"
                        >


                            {/* IMAGE */}

                            <div className="article-featured-image">

                                <img
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                />

                                <div className="article-featured-image-overlay" />

                            </div>


                            {/* CONTENT */}

                            <div className="article-featured-content">


                                <div className="article-row-meta">

                                    <span className="article-row-type">
                                        FEATURED ARTICLE
                                    </span>

                                    <span className="article-row-time">
                                        {featuredArticle.readTime}
                                    </span>

                                </div>


                                <h3>
                                    {featuredArticle.title}
                                </h3>


                                <p>
                                    {featuredArticle.excerpt}
                                </p>


                                <span className="article-featured-link">

                                    <span>
                                        Read featured article
                                    </span>

                                    <ArrowRight size={18} />

                                </span>

                            </div>


                            {/* ARROW */}

                            <div className="article-row-arrow">

                                <ArrowRight
                                    size={19}
                                />

                            </div>


                        </Link>

                    </div>

                </section>

            )}


            {/* =================================================
                ALL ARTICLES
            ================================================= */}

            {latestArticles.length > 0 && (

                <section className="article-library-all">

                    <div className="article-library-container">


                        <div className="article-library-all-heading">

                            <div>

                                <span>
                                    ALL ARTICLES
                                </span>

                                <h2>
                                    Thoughts worth exploring.
                                </h2>

                            </div>


                            <span className="article-library-count">

                                {articles.length} ARTICLES

                            </span>

                        </div>


                        <div className="article-list">


                            {latestArticles.map(
                                (article) => (

                                    <Link
                                        key={article.id}
                                        to={`/insights/articles/${article.category}/${article.id}`}
                                        className="article-list-row"
                                    >


                                        {/* IMAGE */}

                                        <div className="article-list-image">

                                            <img
                                                src={article.image}
                                                alt={article.title}
                                            />

                                            <div className="article-list-image-overlay" />

                                        </div>


                                        {/* CONTENT */}

                                        <div className="article-list-content">


                                            <div className="article-row-meta">

                                                <span className="article-row-type">
                                                    ARTICLE
                                                </span>

                                                <span className="article-row-time">
                                                    {article.readTime}
                                                </span>

                                            </div>


                                            <h3>
                                                {article.title}
                                            </h3>


                                            <p>
                                                {article.excerpt}
                                            </p>


                                        </div>


                                        {/* ARROW */}

                                        <div className="article-row-arrow">

                                            <ArrowRight
                                                size={18}
                                            />

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

            <section className="article-library-bottom">

                <div className="article-library-container">


                    <Link to="/#insights">

                        <ArrowLeft size={18} />

                        <span>
                            Back to Insights
                        </span>

                    </Link>


                    <Link to="/insights/quick-bites">

                        <span>
                            Explore Quick Bites
                        </span>

                        <ArrowRight size={18} />

                    </Link>


                </div>

            </section>


        </main>

    );

}


export default ArticleLibrary;