import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

import ourstory from "../../assets/images/insights/your-story-2.png";

// import "./StoryPanel.css";


function StoryPanel({ onShareStory }) {

    const [isStoryOpen, setIsStoryOpen] = useState(false);


    /* =========================================================
       OPEN FULL STORY
    ========================================================= */

    const handleOpenStory = () => {
        setIsStoryOpen(true);
    };


    /* =========================================================
       CLOSE FULL STORY
    ========================================================= */

    const handleCloseStory = () => {
        setIsStoryOpen(false);
    };


    return (
        <>

            {/* =====================================================
                STORY CARD
            ===================================================== */}

            <aside className="insight-story-panel">

                <div className="story-panel-top">

                    {/* EYEBROW */}

                    <span className="story-eyebrow">
                        YOUR STORY
                    </span>


                    {/* HEADING */}

                    <h2>
                      Every Career Has Lessons Worth Sharing
                    </h2>


                    {/* =================================================
                        STORY IMAGE
                    ================================================= */}

                    <div className="story-image">

                        <img
                            src={ourstory}
                            alt="A professional reflecting on their journey"
                        />

                    </div>


                    {/* =================================================
                        STORY INTRO
                    ================================================= */}

                    <div className="story-copy">

                        <p className="story-main-text">
                            Behind every successful professional is a
                            collection of stories that rarely make it to
                            the resume.
                        </p>

                    </div>


                    {/* =================================================
                        READ STORY
                    ================================================= */}

                    <button
                        type="button"
                        className="read-story-button"
                        onClick={handleOpenStory}
                    >

                        <span>
                            Read the Story
                        </span>

                        <ArrowRight size={19} />

                    </button>

                </div>


                {/* =====================================================
                    SHARE YOUR STORY
                ===================================================== */}

                <button
                    className="share-story-button"
                    type="button"
                    onClick={onShareStory}
                >

                    <span>
                        Share Your Story
                    </span>

                    <ArrowRight size={21} />

                </button>


                {/* DECORATION */}

                <div className="story-decoration" />

            </aside>


            {/* =========================================================
                FULL STORY MODAL
            ========================================================= */}

            {isStoryOpen && (

                <div
                    className="story-modal-backdrop"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget
                        ) {
                            handleCloseStory();
                        }
                    }}
                >

                    <div
                        className="story-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="story-modal-title"
                    >

                        {/* MODAL HEADER */}

                        <div className="story-modal-header">

                            <div>

                                <span className="story-modal-eyebrow">
                                    YOUR STORY
                                </span>

                                <h2 id="story-modal-title">
                                    Your Story Could Be Someone's
                                    Turning Point.
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="story-modal-close"
                                onClick={handleCloseStory}
                                aria-label="Close story"
                            >

                                <X size={21} />

                            </button>

                        </div>


                        {/* MODAL CONTENT */}

                        <div className="story-modal-content">

                            <p>
                                Behind every successful professional is
                                a collection of stories that rarely make
                                it to the resume.
                            </p>

                            <p>
                                A difficult boss.
                                <br />
                                A career mistake.
                                <br />
                                A tough conversation.
                                <br />
                                A complex situation.
                                <br />
                                A failure that taught an unforgettable
                                lesson.
                                <br />
                                A leader who changed your life.
                                <br />
                                A decision that changed your career.
                                <br />
                                Or simply a moment when you thought,
                                "I wish someone had told me this earlier."
                            </p>

                            <p>
                                These experiences are more than memories.
                            </p>

                            <p>
                                They are lessons. They are wisdom. And
                                they can help someone else navigate their
                                journey better.
                            </p>

                            <p>
                                So, I invite you to share one experience
                                or story from your corporate journey —
                                something others can learn from. It
                                doesn't have to be a success story.
                                Sometimes, our biggest failures carry
                                our most valuable lessons.
                            </p>

                            <p>
                                Your experience may take just a few
                                minutes to share.
                            </p>

                            <p>
                                But for someone reading it, it could save
                                years of struggle, help them make a better
                                decision, or give them the courage to
                                handle a difficult situation.
                            </p>

                            <p className="story-modal-final">
                                Don't keep your lessons to yourself.
                                You can share in the form of Video or an
                                article. We will post them and share them.
                            </p>

                            <div className="story-modal-closing">

                                <strong>
                                    Share your story.
                                </strong>

                                <span>
                                    Let your experience become someone
                                    else's learning.
                                </span>

                            </div>

                        </div>


                        {/* MODAL CTA */}

                        <div className="story-modal-footer">

                            <button
                                type="button"
                                className="story-modal-share"
                                onClick={() => {
                                    handleCloseStory();
                                    onShareStory();
                                }}
                            >

                                <span>
                                    Share Your Story
                                </span>

                                <ArrowRight size={20} />

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}


export default StoryPanel;