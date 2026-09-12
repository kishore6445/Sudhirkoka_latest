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

        /* =================================================
           ARTICLE 1
           THE CCTV MANAGER
        ================================================= */

        "the-cctv-manager": {

            sections: [

                {
                    heading:
                        "Some managers have a very interesting idea of management.",

                    paragraphs: [

                        "They think if they don't check everything, something will go wrong.",

                        "Did you send the email?",

                        "Did you call the client?",

                        "Did you finish that?",

                        "Did you check this?",

                        "And five minutes later…",

                        "Did you check whether you checked it?",

                    ],
                },


                {
                    heading:
                        "At that point, you're not managing the person. You're monitoring them.",

                    paragraphs: [

                        "And here's the funny part—eventually, employees stop thinking for themselves.",

                        "Because why take ownership when you know your manager is going to check everything anyway?",

                        "Good management isn't about knowing what everyone is doing every five minutes.",

                        "It's about making sure people know **what they're responsible for, what success looks like, and when they need to come to you.**",

                    ],
                },


                {
                    heading:
                        "Give people ownership.",

                    paragraphs: [

                        "Let them make decisions.",

                        "And yes, sometimes they'll make mistakes.",

                        "That's part of building capable people.",

                        "Because if your team needs your approval for every tiny decision, you haven't built independence.",

                        "**You've built a very expensive CCTV system.**",

                    ],
                },


                {
                    heading:
                        "The challenge",

                    paragraphs: [

                        "So here's the challenge: this week, find one decision you normally make for your team—and let them make it instead.",

                    ],
                },

            ],

            closing:
                "**Good managers don't create dependence. They create confidence.**",

        },


        /* =================================================
           ARTICLE 2
           A STITCH IN TIME SAVES NINE
        ================================================= */

        "a-stitch-in-time-saves-nine": {

            sections: [

                {
                    heading:
                        "A small problem becomes a management problem.",

                    paragraphs: [

                        "A customer complained about a delayed delivery.",

                        "“It’s just one customer,” someone said.",

                        "The team apologised. The issue was closed.",

                        "A few weeks later, another customer complained about the same thing.",

                        "This time, the explanation was different.",

                        "“Production was unusually busy.”",

                        "Again, the issue was closed.",

                        "Three months later, five customers were waiting for delayed orders. Sales was blaming production. Production was blaming procurement. Procurement said they were receiving information too late.",

                        "What started as one small complaint had become a management problem.",

                    ],
                },


                {
                    heading:
                        "The problems we learn to live with.",

                    paragraphs: [

                        "And this happens more often than we realise.",

                        "There is an old saying:",

                        "**“A stitch in time saves nine.”**",

                        "In business, that stitch could be a customer complaint.",

                        "A missed deadline.",

                        "One employee repeatedly coming late.",

                        "A salesperson forgetting to update the CRM.",

                        "An invoice that keeps getting delayed.",

                        "A quality issue that appears occasionally.",

                        "Individually, none of these looks serious enough to demand management attention.",

                        "So we work around them.",

                        "And that's where the problem begins.",

                        "Because organisations slowly become very good at **living with problems they should have solved.**",

                    ],
                },


                {
                    heading:
                        "Look for the pattern.",

                    paragraphs: [

                        "One manual workaround becomes a process.",

                        "One exception becomes normal.",

                        "One ignored behaviour becomes culture.",

                        "And one unhappy customer becomes ten.",

                        "Good management isn't only about solving big problems.",

                        "It is about recognising **small signals early.**",

                        "When the same issue appears twice, don't just fix it twice.",

                        "Ask:",

                        "**Why is this happening?**",

                        "**Is there a pattern?**",

                        "**What would prevent it from happening again?**",

                    ],
                },


                {
                    heading:
                        "Solve the problem while it is still small.",

                    paragraphs: [

                        "The cheapest time to solve most business problems is usually when they still look too small to worry about.",

                        "By the time something becomes a crisis, you're no longer paying only to solve the original problem.",

                        "You're paying for the consequences too.",

                        "So here's a question worth asking your team this week:",

                        "**What small problem are we currently tolerating that could become a big problem six months from now?**",

                    ],
                },

            ],

            closing:
                "Sometimes, one stitch really does save nine.",

        },


        /* =================================================
           ARTICLE 3
           TOO MANY COOKS SPOIL THE BROTH
        ================================================= */

        "too-many-cooks-spoil-the-broth": {

            sections: [

                {
                    heading:
                        "Six people knew about the task. But nobody owned it.",

                    paragraphs: [

                        "A client sent an important email.",

                        "Six managers were copied.",

                        "Everyone read it.",

                        "And nobody replied.",

                        "Why?",

                        "Each person assumed someone else would handle it.",

                        "Three days later, the client followed up:",

                        "**“Any update?”**",

                        "Suddenly, the internal messages started.",

                        "“I thought you were doing it.”",

                        "“No, I thought operations was handling it.”",

                        "“Wasn't this assigned to Raj?”",

                        "“I wasn't aware I owned this.”",

                        "Six people knew about the task.",

                        "But nobody **owned** the task.",

                    ],
                },


                {
                    heading:
                        "Too many owners usually means no owner.",

                    paragraphs: [

                        "There's an old saying:",

                        "**“Too many cooks spoil the broth.”**",

                        "In organisations, I would modify it slightly:",

                        "**Too many owners usually means no owner.**",

                        "As companies grow, we naturally add people to problems.",

                        "More departments.",

                        "More meetings.",

                        "More people in CC.",

                        "More stakeholders.",

                        "It feels safer.",

                        "Everyone is informed.",

                        "But being informed and being accountable are very different things.",

                    ],
                },


                {
                    heading:
                        "Collaboration and accountability are different.",

                    paragraphs: [

                        "Imagine five people standing around a leaking tap.",

                        "Everyone can see the water.",

                        "Everyone agrees it should be fixed.",

                        "But unless one person hears,",

                        "**“You own this. Get it fixed by 5 PM,”**",

                        "there is a surprisingly good chance everyone will walk away.",

                        "That's why good organisations make a distinction between **collaboration and accountability.**",

                        "Ten people can contribute.",

                        "Five people can advise.",

                        "Three departments can support.",

                        "But ultimately, one person should own the outcome.",

                    ],
                },


                {
                    heading:
                        "Put a name against the outcome.",

                    paragraphs: [

                        "And ownership must include three things:",

                        "**What needs to happen?**",

                        "**Who owns it?**",

                        "**By when?**",

                        "Remove any one of these and accountability becomes fuzzy.",

                        "This applies everywhere—from client delivery to recruitment, collections, marketing campaigns and strategic initiatives.",

                        "So after your next management meeting, look at the action items.",

                        "If you see:",

                        "“Marketing team to…”",

                        "“Operations to…”",

                        "“HR to…”",

                        "“Management to…”",

                        "Ask one more question:",

                        "**WHO?**",

                        "Put a person's name against the outcome.",

                    ],
                },

            ],

            closing:
                "Because collaboration may require a team. **Accountability requires a name.**",

        },

    };


    const content = articleContent[article.id];


    const sections = content?.sections || [

        {
            heading:
                "A perspective worth exploring.",

            paragraphs: [
                article.excerpt,
            ],
        },

    ];


    /* =====================================================
       FORMATTED TEXT
       Converts **text** into bold text.
    ===================================================== */

    const renderFormattedText = (text) => {

        const parts = text.split(
            /(\*\*.*?\*\*)/g
        );


        return parts.map(
            (part, index) => {

                if (
                    part.startsWith("**") &&
                    part.endsWith("**")
                ) {

                    return (
                        <strong key={index}>
                            {part.slice(2, -2)}
                        </strong>
                    );

                }


                return part;

            }
        );

    };


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
                        TITLE
                    ================================================= */}

                    <div className="article-detail-heading">

                        <h1>
                            {article.title}
                        </h1>

                        <p>
                            {article.excerpt}
                        </p>

                    </div>


                    {/* =================================================
                        META
                    ================================================= */}

                    <div className="article-detail-meta">

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

                    </div>

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
                                            (
                                                paragraph,
                                                paragraphIndex
                                            ) => (

                                                <p
                                                    key={paragraphIndex}
                                                >

                                                    {renderFormattedText(
                                                        paragraph
                                                    )}

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

                                    {content?.closing
                                        ? renderFormattedText(
                                            content.closing
                                        )
                                        : "What would change if this idea became part of the way you lead every day?"
                                    }

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

                        {/* Related articles are intentionally
                            kept hidden for now. */}

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

    );

}


export default ArticleDetail;