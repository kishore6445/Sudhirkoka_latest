import {
    Play,
    FileText,
    Zap,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import "../../styles/insights.css";


const tabs = [
    {
        id: "videos",
        label: "Videos",
        path: "/insights/videos",
        icon: Play,
    },
    {
        id: "articles",
        label: "Articles",
        path: "/insights/articles",
        icon: FileText,
    },
    // {
    //     id: "reflections",
    //     label: "Reflections",
    //     path: "/insights/reflections",
    //     icon: Sparkles,
    // },
    {
        id: "quick-bites",
        label: "Quick Bites",
        path: "/insights/quick-bites",
        icon: Zap,
    },
];


function InsightTabs() {

    const location = useLocation();

    return (
        <div className="insight-tabs-wrapper">

            <nav
                className="insight-tabs"
                aria-label="Insights categories"
            >

                {tabs.map((tab) => {

                    const Icon = tab.icon;

                    const isActive =
                        location.pathname === tab.path ||
                        location.pathname.startsWith(`${tab.path}/`);

                    return (
                        <Link
                            key={tab.id}
                            to={tab.path}
                            className={`insight-tab ${
                                isActive
                                    ? "insight-tab--active"
                                    : ""
                            }`}
                            aria-label={tab.label}
                            aria-current={
                                isActive ? "page" : undefined
                            }
                        >

                            <Icon
                                className="insight-tab-icon"
                                size={19}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

                            <span className="insight-tab-label">
                                {tab.label}
                            </span>

                        </Link>
                    );

                })}

            </nav>

        </div>
    );
}


export default InsightTabs;
