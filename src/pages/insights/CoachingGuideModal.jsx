import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    X,
    ExternalLink,
    ZoomIn,
    ZoomOut,
    Maximize2,
} from "lucide-react";

import {
    Document,
    Page,
    pdfjs,
} from "react-pdf";

import "../../styles/coaching-guide-modal.css";


// ============================================================
// PDF.JS WORKER
// ============================================================

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


function CoachingGuideModal({
    isOpen,
    guide,
    onClose,
}) {

    // ========================================================
    // STATE
    // ========================================================

    const [numPages, setNumPages] = useState(0);

    const [pageDimensions, setPageDimensions] = useState({
        width: 595,
        height: 842,
    });

    const [scale, setScale] = useState(1);

    const [fitScale, setFitScale] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);


    // ========================================================
    // REFS
    // ========================================================

    const viewerRef = useRef(null);

    const resizeObserverRef = useRef(null);


    // ========================================================
    // RESET WHEN GUIDE CHANGES
    // ========================================================

    useEffect(() => {

        if (!isOpen || !guide) {
            return;
        }

        setNumPages(0);

        setCurrentPage(1);

        setScale(1);

        setFitScale(1);

        setIsLoading(true);

        setError(null);

    }, [isOpen, guide]);


    // ========================================================
    // ESCAPE KEY
    // ========================================================

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [isOpen, onClose]);


    // ========================================================
    // BODY SCROLL LOCK
    // ========================================================

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {

            document.body.style.overflow =
                originalOverflow;

        };

    }, [isOpen]);


    // ========================================================
    // CALCULATE FIT SCALE
    // ========================================================

    const calculateFitScale = useCallback(() => {

        if (!viewerRef.current) {
            return;
        }

        const viewer =
            viewerRef.current;

        const viewerWidth =
            viewer.clientWidth;

        const viewerHeight =
            viewer.clientHeight;


        if (
            viewerWidth <= 0 ||
            viewerHeight <= 0 ||
            pageDimensions.width <= 0 ||
            pageDimensions.height <= 0
        ) {
            return;
        }


        // Small safety margins around the page
        const horizontalPadding = 48;

        const verticalPadding = 32;


        const availableWidth =
            Math.max(
                viewerWidth - horizontalPadding,
                100
            );


        const availableHeight =
            Math.max(
                viewerHeight - verticalPadding,
                100
            );


        // Scale required to fit width
        const widthScale =
            availableWidth /
            pageDimensions.width;


        // Scale required to fit height
        const heightScale =
            availableHeight /
            pageDimensions.height;


        // We need BOTH dimensions to fit,
        // so use the smaller scale.
        const calculatedScale =
            Math.min(
                widthScale,
                heightScale
            );


        setFitScale(calculatedScale);

        setScale(calculatedScale);

    }, [pageDimensions]);


    // ========================================================
    // RESIZE OBSERVER
    // ========================================================

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        if (!viewerRef.current) {
            return;
        }


        const observer =
            new ResizeObserver(() => {

                calculateFitScale();

            });


        observer.observe(
            viewerRef.current
        );


        resizeObserverRef.current =
            observer;


        return () => {

            observer.disconnect();

            resizeObserverRef.current =
                null;

        };

    }, [
        isOpen,
        calculateFitScale,
    ]);


    // ========================================================
    // DOCUMENT LOAD
    // ========================================================

    const handleDocumentLoadSuccess =
        async (pdf) => {

            setNumPages(
                pdf.numPages
            );

            setCurrentPage(1);

            setIsLoading(false);

            setError(null);


            try {

                const firstPage =
                    await pdf.getPage(1);


                const viewport =
                    firstPage.getViewport({
                        scale: 1,
                    });


                setPageDimensions({
                    width:
                        viewport.width,

                    height:
                        viewport.height,
                });

            } catch (pageError) {

                console.error(
                    "Unable to read PDF page dimensions:",
                    pageError
                );

            }

        };


    // ========================================================
    // DOCUMENT ERROR
    // ========================================================

    const handleDocumentLoadError =
        (documentError) => {

            console.error(
                "PDF loading error:",
                documentError
            );

            setIsLoading(false);

            setError(
                "Unable to load this PDF."
            );

        };


    // ========================================================
    // PAGE LOAD
    // ========================================================

    const handlePageLoadSuccess =
        (page) => {

            if (
                page.pageNumber === 1 &&
                pageDimensions.width === 595
            ) {

                const viewport =
                    page.getViewport({
                        scale: 1,
                    });

                setPageDimensions({
                    width:
                        viewport.width,

                    height:
                        viewport.height,
                });

            }

        };


    // ========================================================
    // ZOOM OUT
    // ========================================================

    const handleZoomOut = () => {

        setScale((currentScale) => {

            const nextScale =
                currentScale * 0.85;

            return Math.max(
                fitScale * 0.5,
                nextScale
            );

        });

    };


    // ========================================================
    // ZOOM IN
    // ========================================================

    const handleZoomIn = () => {

        setScale((currentScale) => {

            const nextScale =
                currentScale * 1.15;

            return Math.min(
                3,
                nextScale
            );

        });

    };


    // ========================================================
    // FIT PAGE
    // ========================================================

    const handleFitPage = () => {

        calculateFitScale();

    };


    // ========================================================
    // SCROLL TRACKING
    // ========================================================

    const handleViewerScroll = () => {

        if (!viewerRef.current) {
            return;
        }


        const viewer =
            viewerRef.current;


        const pages =
            viewer.querySelectorAll(
                ".coaching-guide-modal__page-wrapper"
            );


        let closestPage = 1;

        let closestDistance =
            Number.POSITIVE_INFINITY;


        pages.forEach(
            (pageElement, index) => {

                const rect =
                    pageElement.getBoundingClientRect();


                const viewerRect =
                    viewer.getBoundingClientRect();


                const distance =
                    Math.abs(
                        rect.top -
                        viewerRect.top -
                        20
                    );


                if (
                    distance <
                    closestDistance
                ) {

                    closestDistance =
                        distance;

                    closestPage =
                        index + 1;

                }

            }
        );


        setCurrentPage(
            closestPage
        );

    };


    // ========================================================
    // DON'T RENDER
    // ========================================================

    if (!isOpen || !guide) {
        return null;
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div
            className="coaching-guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label={guide.title}
        >

            {/* ==================================================
                BACKDROP
            ================================================== */}

            <div
                className="coaching-guide-modal__backdrop"
                onClick={onClose}
            />


            {/* ==================================================
                MODAL PANEL
            ================================================== */}

            <div className="coaching-guide-modal__panel">


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="coaching-guide-modal__header">

                    <div className="coaching-guide-modal__heading">

                        <span className="coaching-guide-modal__category">
                            {guide.category}
                        </span>

                        <h2>
                            {guide.title}
                        </h2>

                    </div>


                    <div className="coaching-guide-modal__actions">

                        {/* OPEN IN NEW TAB */}

                        <a
                            href={guide.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="coaching-guide-modal__external"
                            aria-label="Open PDF in new tab"
                        >
                            <ExternalLink
                                size={17}
                            />
                        </a>


                        {/* CLOSE */}

                        <button
                            type="button"
                            className="coaching-guide-modal__close"
                            onClick={onClose}
                            aria-label="Close guide"
                        >
                            <X
                                size={22}
                            />
                        </button>

                    </div>

                </div>


                {/* ==================================================
                    TOOLBAR
                ================================================== */}

                <div className="coaching-guide-modal__toolbar">

                    <div className="coaching-guide-modal__toolbar-left">

                        <span className="coaching-guide-modal__page-count">
                            {currentPage}
                            <span>/</span>
                            {numPages || "—"}
                        </span>

                    </div>


                    <div className="coaching-guide-modal__zoom-controls">

                        <button
                            type="button"
                            onClick={handleZoomOut}
                            disabled={
                                scale <=
                                fitScale * 0.5
                            }
                            aria-label="Zoom out"
                        >
                            <ZoomOut
                                size={17}
                            />
                        </button>


                        <span className="coaching-guide-modal__zoom-value">
                            {Math.round(
                                scale * 100
                            )}
                            %
                        </span>


                        <button
                            type="button"
                            onClick={handleZoomIn}
                            disabled={
                                scale >= 3
                            }
                            aria-label="Zoom in"
                        >
                            <ZoomIn
                                size={17}
                            />
                        </button>


                        <button
                            type="button"
                            onClick={handleFitPage}
                            className="coaching-guide-modal__fit"
                            aria-label="Fit PDF page"
                        >
                            <Maximize2
                                size={16}
                            />

                            <span>
                                Fit
                            </span>
                        </button>

                    </div>

                </div>


                {/* ==================================================
                    PDF VIEWER
                ================================================== */}

                <div
                    ref={viewerRef}
                    className="coaching-guide-modal__viewer"
                    onScroll={handleViewerScroll}
                >

                    {/* LOADING */}

                    {isLoading && (
                        <div className="coaching-guide-modal__loading">

                            <div className="coaching-guide-modal__spinner" />

                            <span>
                                Loading guide...
                            </span>

                        </div>
                    )}


                    {/* ERROR */}

                    {error && (
                        <div className="coaching-guide-modal__error">

                            <strong>
                                Something went wrong
                            </strong>

                            <span>
                                {error}
                            </span>

                            <a
                                href={guide.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open PDF directly
                            </a>

                        </div>
                    )}


                    {/* PDF */}

                    {!error && (
                        <Document
                            file={guide.pdf}
                            onLoadSuccess={
                                handleDocumentLoadSuccess
                            }
                            onLoadError={
                                handleDocumentLoadError
                            }
                            loading={null}
                            error={null}
                        >

                            <div className="coaching-guide-modal__pages">

                                {Array.from(
                                    new Array(numPages),
                                    (_, index) => {

                                        const pageNumber =
                                            index + 1;

                                        return (
                                            <div
                                                key={pageNumber}
                                                className="coaching-guide-modal__page-wrapper"
                                            >

                                                <Page
                                                    pageNumber={
                                                        pageNumber
                                                    }

                                                    width={
                                                        pageDimensions.width *
                                                        scale
                                                    }

                                                    renderTextLayer={
                                                        true
                                                    }

                                                    renderAnnotationLayer={
                                                        true
                                                    }

                                                    onLoadSuccess={
                                                        handlePageLoadSuccess
                                                    }
                                                />

                                            </div>
                                        );

                                    }
                                )}

                            </div>

                        </Document>
                    )}

                </div>

            </div>

        </div>
    );
}

export default CoachingGuideModal;