import { useEffect } from "react";
import { X } from "lucide-react";

import "./YouTubeModal.css";


/* =========================================================
   CONVERT YOUTUBE URL → EMBED URL
========================================================= */

function getYouTubeEmbedUrl(url) {

    if (!url) {
        return "";
    }

    try {

        const parsedUrl = new URL(url);

        let videoId = "";

        /* =============================================
           STANDARD YOUTUBE VIDEO

           youtube.com/watch?v=VIDEO_ID
        ============================================= */

        if (
            parsedUrl.hostname.includes("youtube.com") &&
            parsedUrl.pathname === "/watch"
        ) {

            videoId =
                parsedUrl.searchParams.get("v");

        }


        /* =============================================
           YOUTUBE SHORTS

           youtube.com/shorts/VIDEO_ID
        ============================================= */

        else if (
            parsedUrl.hostname.includes("youtube.com") &&
            parsedUrl.pathname.startsWith("/shorts/")
        ) {

            videoId =
                parsedUrl.pathname
                    .split("/shorts/")[1]
                    ?.split("/")[0];

        }


        /* =============================================
           SHORT YOUTUBE URL

           youtu.be/VIDEO_ID
        ============================================= */

        else if (
            parsedUrl.hostname === "youtu.be"
        ) {

            videoId =
                parsedUrl.pathname
                    .slice(1)
                    .split("/")[0];

        }


        /* =============================================
           EMBED URL

           youtube.com/embed/VIDEO_ID
        ============================================= */

        else if (
            parsedUrl.hostname.includes("youtube.com") &&
            parsedUrl.pathname.startsWith("/embed/")
        ) {

            videoId =
                parsedUrl.pathname
                    .split("/embed/")[1]
                    ?.split("/")[0];

        }


        /* =============================================
           INVALID URL
        ============================================= */

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
   YOUTUBE MODAL
========================================================= */

function YouTubeModal({
    isOpen,
    videoUrl,
    title = "Video",
    onClose,
}) {

    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };

    }, [isOpen]);


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [isOpen, onClose]);


    /* =====================================================
       DON'T RENDER
    ===================================================== */

    if (!isOpen) {
        return null;
    }


    const embedUrl =
        getYouTubeEmbedUrl(videoUrl);


    /* =====================================================
       INVALID URL
    ===================================================== */

    if (!embedUrl) {

        return (
            <div
                className="youtube-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Video player"
                onClick={onClose}
            >

                <div
                    className="youtube-modal__dialog youtube-modal__dialog--error"
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >

                    <button
                        type="button"
                        className="youtube-modal__close"
                        onClick={onClose}
                        aria-label="Close video"
                    >
                        <X size={24} />
                    </button>

                    <div className="youtube-modal__error">

                        <div className="youtube-modal__error-icon">
                            !
                        </div>

                        <h2>
                            Video unavailable
                        </h2>

                        <p>
                            This video could not be loaded.
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    /* =====================================================
       VIDEO MODAL
    ===================================================== */

    return (
        <div
            className="youtube-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={onClose}
        >

            <div
                className="youtube-modal__dialog"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =========================================
                    CLOSE BUTTON
                ========================================= */}

                <button
                    type="button"
                    className="youtube-modal__close"
                    onClick={onClose}
                    aria-label="Close video"
                >
                    <X size={24} />
                </button>


                {/* =========================================
                    VIDEO
                ========================================= */}

                <div className="youtube-modal__player">

                    <iframe
                        src={embedUrl}
                        title={title}
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

                </div>

            </div>

        </div>
    );
}


export default YouTubeModal;