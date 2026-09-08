
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// =========================================================
// LAYOUT
// =========================================================

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

// =========================================================
// HOMEPAGE SECTIONS
// =========================================================

import Hero from "./components/sections/Hero/Hero";
import Purpose from "./components/sections/Purpose/Purpose";
import Challenges from "./components/sections/Challenges/Challenges";
import Framework from "./components/sections/Framework/Framework";
import Services from "./components/sections/Services/Services";
import Conversation from "./components/sections/Conversation/Conversation";
import About from "./components/sections/About/About";
import CTA from "./components/sections/CTA/CTA";

// =========================================================
// INSIGHTS PAGES
// =========================================================

import InsightsPage from "./pages/insights/Insights";

import VideoLibrary from "./pages/insights/VideoLibrary";
import VideoCategory from "./pages/insights/VideoCategory";
import VideoDetail from "./pages/insights/VideoDetail";

import ArticleLibrary from "./pages/insights/ArticleLibrary";
import ArticleDetail from "./pages/insights/ArticleDetail";

import QuickBites from "./pages/insights/QuickBites";
import CarouselLibrary from "./pages/insights/CarouselLibrary";

import MiniCoachingGuide from "./pages/insights/MiniCoachingGuide";

// =========================================================
// SCROLL TO TOP
// =========================================================

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there is a hash, scroll to that section
        if (hash) {
            const id = hash.replace("#", "");

            // Small delay allows the new page/DOM to finish rendering
            const timer = setTimeout(() => {
                const element = document.getElementById(id);

                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 50);

            return () => clearTimeout(timer);
        }

        // Normal route change → go to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname, hash]);

    return null;
}

// =========================================================
// HOME PAGE
// /
// =========================================================

function HomePage() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />

                <Purpose />

                <InsightsPage />
                <MiniCoachingGuide />

                <Challenges />

                <Framework />

                <Services />

                <Conversation />

                <About />

                <CTA />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// INSIGHTS LANDING
// /insights
// =========================================================

function InsightsLandingPage() {
    return (
        <>
            <Navbar light />

            <main>
                <InsightsPage />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// VIDEO LIBRARY
// /insights/videos
// =========================================================

function VideosPage() {
    return (
        <>
            <Navbar light />

            <main>
                <VideoLibrary />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// VIDEO CATEGORY
// /insights/videos/:category
// =========================================================

function VideoCategoryPage() {
    return (
        <>
            <Navbar light />

            <main>
                <VideoCategory />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// VIDEO DETAIL
// /insights/videos/:category/:videoId
//
// Example:
// /insights/videos/leadership-voices/lv-01
// =========================================================

function VideoDetailPage() {
    return (
        <>
            <Navbar light />

            <main>
                <VideoDetail />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// ARTICLE LIBRARY
// /insights/articles
// =========================================================

function ArticlesPage() {
    return (
        <>
            <Navbar light />

            <main>
                <ArticleLibrary />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// ARTICLE DETAIL
// /insights/articles/:category/:articleId
//
// There is NO Article Category page.
//
// Flow:
//
// Article Library
//      ↓
// Article Detail
//
// Example:
// /insights/articles/leadership/article-01
// =========================================================

function ArticleDetailPage() {
    return (
        <>
            <Navbar light />

            <main>
                <ArticleDetail />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// QUICK BITES
// /insights/quick-bites
// =========================================================

function QuickBitesPage() {
    return (
        <>
            <Navbar light />

            <main>
                <QuickBites />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// CAROUSEL LIBRARY
// /insights/carousels
// =========================================================

function CarouselsPage() {
    return (
        <>
            <Navbar light />

            <main>
                <CarouselLibrary />
            </main>

            <Footer />
        </>
    );
}

// =========================================================
// APP
// =========================================================

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>

                {/* =================================================
                    HOME
                ================================================= */}

                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* =================================================
                    INSIGHTS
                ================================================= */}

                <Route
                    path="/insights"
                    element={<InsightsLandingPage />}
                />

                {/* =================================================
                    VIDEOS
                ================================================= */}

                <Route
                    path="/insights/videos"
                    element={<VideosPage />}
                />

                {/* =================================================
                    VIDEO CATEGORY
                ================================================= */}

                <Route
                    path="/insights/videos/:category"
                    element={<VideoCategoryPage />}
                />

                {/* =================================================
                    VIDEO DETAIL
                ================================================= */}

                <Route
                    path="/insights/videos/:category/:videoId"
                    element={<VideoDetailPage />}
                />

                {/* =================================================
                    ARTICLES
                ================================================= */}

                <Route
                    path="/insights/articles"
                    element={<ArticlesPage />}
                />

                {/* =================================================
                    ARTICLE DETAIL
                    No Article Category Page
                ================================================= */}

                <Route
                    path="/insights/articles/:category/:articleId"
                    element={<ArticleDetailPage />}
                />

                {/* =================================================
                    QUICK BITES
                ================================================= */}

                <Route
                    path="/insights/quick-bites"
                    element={<QuickBitesPage />}
                />

                {/* =================================================
                    CAROUSEL LIBRARY
                ================================================= */}

                <Route
                    path="/insights/carousels"
                    element={<CarouselsPage />}
                />

                {/* =================================================
                    NO FALLBACK TO HOME
                ================================================= */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;
