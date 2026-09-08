import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { ContactProvider } from "./components/sections/Contact/ContactContext";
import ContactModal from "./components/sections/Contact/ContactModal";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <ContactProvider>

            <App />

            <ContactModal />

        </ContactProvider>

    </React.StrictMode>
);