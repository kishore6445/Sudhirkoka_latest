
import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import { useEffect } from "react";

import {
    articles,
    articleCategories,
} from "../../data/insightsData";

import ArticleCard from "../../components/insights/ArticleCard";

import "../../styles/article-detail.css";


function ArticleDetail() {

    const {
        category,
        articleId,
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

    }, [articleId]);


    /* =====================================================
       FIND ARTICLE
    ===================================================== */

    const article = articles.find(
        (item) =>
            item.id === articleId &&
            item.category === category
    );


    /* =====================================================
       FIND CATEGORY
       Used only for display text.
       The category page itself no longer exists.
    ===================================================== */

    const currentCategory =
        articleCategories.find(
            (item) => item.id === category
        );


    /* =====================================================
       ARTICLE NOT FOUND
    ===================================================== */

    if (!article) {

        return (

            <main className="article-detail-page">

                <section className="article-detail-not-found">

                    <span>
                        ARTICLE
                    </span>

                    <h1>
                        Article not found.
                    </h1>

                    <p>
                        The article you're looking for
                        doesn't exist or may have been moved.
                    </p>

                    <Link
                        to="/insights/articles"
                        className="article-detail-back-button"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to Articles
                        </span>

                    </Link>

                </section>

            </main>
        );
    }


    /* =====================================================
       RELATED ARTICLES
    ===================================================== */

    const relatedArticles = articles
        .filter(
            (item) =>
                item.category === category &&
                item.id !== article.id
        )
        .slice(0, 3);


    /* =====================================================
       ARTICLE CONTENT
    ===================================================== */

    const articleContent = {

        "building-trust-at-work": [
            {
                heading: "Trust is built through behaviour.",
                paragraphs: [
                    "Trust at work is rarely created through a single conversation or a statement from leadership. It develops through the small behaviours people experience consistently.",
                    "When people know what to expect from their leaders, they become more comfortable contributing ideas, asking questions and taking responsibility."
                ],
            },

            {
                heading: "Create the conditions for contribution.",
                paragraphs: [
                    "People contribute more when they believe their voice will be heard and respected. Leaders create this environment by making space for different perspectives and responding with curiosity rather than judgement.",
                    "The goal isn't to make every conversation comfortable. It is to make honest contribution possible."
                ],
            },

            {
                heading: "Consistency matters.",
                paragraphs: [
                    "Trust grows when words and actions remain aligned over time. Clear expectations, reliable communication and visible accountability all reinforce that alignment.",
                    "The strongest cultures are not built by occasional gestures. They are built through everyday leadership behaviour."
                ],
            },
        ],


        "culture-of-ownership": [
            {
                heading: "Ownership changes how people think.",
                paragraphs: [
                    "A culture of ownership begins when people understand that their contribution matters. Ownership is more than assigning responsibility; it is creating the conditions for people to take responsibility willingly.",
                    "When people feel trusted to make decisions, they begin to think beyond their individual tasks and consider the wider outcome."
                ],
            },

            {
                heading: "Give people room to act.",
                paragraphs: [
                    "Leaders can encourage ownership by creating clarity around outcomes while giving people enough freedom to determine how those outcomes are achieved.",
                    "Too much control can unintentionally teach people to wait for instructions. Appropriate freedom encourages judgement and initiative."
                ],
            },

            {
                heading: "Accountability completes ownership.",
                paragraphs: [
                    "Ownership does not mean working without accountability. The two belong together.",
                    "When expectations are clear and people understand that their decisions matter, accountability becomes part of the culture rather than something imposed from outside."
                ],
            },
        ],


        "why-people-matter": [
            {
                heading: "People are at the centre of every organisation.",
                paragraphs: [
                    "Every strategy, system and business outcome ultimately depends on people. Organisations grow when people have the clarity, capability and confidence to contribute meaningfully.",
                    "Looking only at processes can sometimes hide the human factors behind organisational performance."
                ],
            },

            {
                heading: "Growth is a human process.",
                paragraphs: [
                    "Sustainable growth requires more than improving numbers. It requires developing the people who create those numbers.",
                    "Leaders who invest in capability, relationships and trust create stronger foundations for long-term performance."
                ],
            },

            {
                heading: "Keep people at the centre.",
                paragraphs: [
                    "When organisations treat people as an important part of the system rather than simply a resource within it, different conversations become possible.",
                    "That shift can influence how leaders make decisions, develop teams and think about sustainable growth."
                ],
            },
        ],

    };


    const sections =
        articleContent[article.id] || [
            {
                heading: "A perspective worth exploring.",
                paragraphs: [
                    article.excerpt,
                    "Leadership, people and organisational growth are shaped by the choices we make every day. The ideas in this article are intended to create space for reflection and practical action."
                ],
            },
        ];


    return (

        <main className="article-detail-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="article-detail-hero">

                <div className="article-detail-container">


                    {/* BACK TO ARTICLE LIBRARY */}

                    <Link
                        to="/insights/articles"
                        className="article-detail-back"
                    >

                        <ArrowLeft size={17} />

                        <span>
                            Back to Articles
                        </span>

                    </Link>


                    {/* =================================================
                        CATEGORY

                        Category page has been removed.
                        Category information is still used internally
                        for article identification and related articles.
                    ================================================= */}


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    {/* <div className="article-detail-heading">

                        <h1>
                            {article.title}
                        </h1>

                        <p>
                            {article.excerpt}
                        </p>

                    </div> */}


                    {/* =================================================
                        META
                    ================================================= */}

                    {/* <div className="article-detail-meta">

                        <div className="article-detail-meta-item">

                            <span>
                                BY
                            </span>

                            <strong>
                                Sudhir
                            </strong>

                        </div>

                        <div className="article-detail-meta-divider" />

                        <div className="article-detail-meta-item">

                            <span>
                                {article.readTime}
                            </span>

                        </div>

                        <div className="article-detail-meta-divider" />

                        <div className="article-detail-meta-item">

                            <span>
                                ARTICLE
                            </span>

                        </div>

                    </div> */}

                </div>

            </section>


            {/* =================================================
                HERO IMAGE
            ================================================= */}

            <section className="article-detail-image-section">

                <div className="article-detail-container">

                    <div className="article-detail-image">

                        <img
                            src={article.image}
                            alt={article.title}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                ARTICLE BODY
            ================================================= */}

            <section className="article-detail-body">

                <div className="article-detail-container">

                    <div className="article-detail-layout">


                        {/* =================================================
                            LEFT SIDEBAR
                        ================================================= */}

                        <aside className="article-detail-sidebar">

                            <div>

                                <span>
                                    IN THIS ARTICLE
                                </span>

                                <div className="article-detail-sidebar-line" />

                            </div>


                            <div className="article-detail-sidebar-category">

                                {currentCategory?.title}

                            </div>

                        </aside>


                        {/* =================================================
                            MAIN CONTENT
                        ================================================= */}

                        <article className="article-detail-content">

                            {/* INTRO */}

                            <p className="article-detail-lead">
                                {article.excerpt}
                            </p>


                            {/* ARTICLE SECTIONS */}

                            {sections.map(
                                (section, index) => (

                                    <section
                                        key={index}
                                        className="article-detail-section"
                                    >

                                        <h2>
                                            {section.heading}
                                        </h2>


                                        {section.paragraphs.map(
                                            (paragraph, paragraphIndex) => (

                                                <p
                                                    key={paragraphIndex}
                                                >
                                                    {paragraph}
                                                </p>

                                            )
                                        )}

                                    </section>

                                )
                            )}


                            {/* =================================================
                                CLOSING
                            ================================================= */}

                            <div className="article-detail-closing">

                                <span>
                                    A THOUGHT TO TAKE WITH YOU
                                </span>

                                <p>
                                    What would change if this idea
                                    became part of the way you lead
                                    every day?
                                </p>

                            </div>

                        </article>

                    </div>

                </div>

            </section>


            {/* =================================================
                AUTHOR
            ================================================= */}

            <section className="article-detail-author">

                <div className="article-detail-container">

                    <div className="article-detail-author-card">

                        <div className="article-detail-author-mark">
                            S
                        </div>


                        <div>

                            <span>
                                ABOUT THE AUTHOR
                            </span>

                            <h2>
                                Sudhir
                            </h2>

                            <p>
                                Leadership, people and organisational
                                growth are at the heart of these
                                perspectives and conversations.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                RELATED ARTICLES
            ================================================= */}

            {relatedArticles.length > 0 && (

                <section className="article-detail-related">

                    <div className="article-detail-container">


                        {/* <div className="article-detail-related-heading">

                            <div>

                                <span>
                                    KEEP EXPLORING
                                </span>

                                <h2>
                                    More from{" "}
                                    {currentCategory?.title}.
                                </h2>

                            </div>

                        </div>


                        <div className="article-detail-related-grid">

                            {relatedArticles.map(
                                (relatedArticle) => (

                                    <ArticleCard
                                        key={relatedArticle.id}
                                        article={relatedArticle}
                                    />

                                )
                            )}

                        </div> */}

                    </div>

                </section>

            )}


            {/* =================================================
                FOOTER NAVIGATION
            ================================================= */}

            <section className="article-detail-navigation">

                <div className="article-detail-container">


                    {/* BACK TO ARTICLE LIBRARY */}

                    <Link
                        to="/insights/articles"
                        className="article-detail-back"
                    >

                        <ArrowLeft size={18} />

                        <span>
                            Back to Articles
                        </span>

                    </Link>


                    {/* EXPLORE INSIGHTS */}

                    <Link
                        to="/#insights"
                        
                    >

                        <span>
                            Explore Insights
                        </span>

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </section>

        </main>
    );k
}


export default ArticleDetail;

