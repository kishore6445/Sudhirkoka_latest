import { useEffect, useState } from "react";
import {
    ArrowRight,
    X,
    Check,
} from "lucide-react";

import "./share-story-modal.css";


const initialFormData = {
    identification: "",

    name: "",
    designation: "",
    industry: "",
    yearsExperience: "",
    email: "",

    experienceTypes: [],

    story: "",
    storyOneLine: "",

    permission: "",

    declaration: false,

    videoWillingness: "",

    video: null,
};


const experienceOptions = [
    "Leadership",
    "Manager / Boss",
    "Teamwork",
    "Workplace Conflict",
    "Career Growth / Promotion",
    "Failure / Setback",
    "Difficult Employee / Colleague",
    "Recognition / Appreciation",
    "Organizational Culture",
    "Customer Experience",
    "Workplace Politics",
    "Change / Transformation",
    "Communication",
    "Feedback / Coaching",
    "Ethics / Integrity",
    "Learning from a Mistake",
];


/* =========================================================
   BACKEND INTEGRATION CONFIG
   These are the only backend-facing constants for this form.
========================================================= */

// Form identifier sent to the backend. Do not change casually — it is used
// in storage paths and stored on every submission row.
const FORM_KEY = "share-your-story";

// Client-side video limits. Kept as constants so they are easy to change.
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // ~50 MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

// Human-readable labels for stored radio values (used in the notification email).
const PERMISSION_LABELS = {
    name: "Yes, with my name",
    anonymous: "Yes, but anonymously",
    approval: "Yes, but only after I approve the final version",
    internal: "No — sharing only for internal learning/research",
};

const VIDEO_WILLINGNESS_LABELS = {
    yes: "Yes",
    maybe: "Maybe, please contact me",
    no: "No",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Build a clean, readable label -> value map from the form state. Only
 * meaningful values are included so the notification email stays tidy.
 */
function buildFields(data) {
    const fields = {};

    fields["Identification"] =
        data.identification === "identified"
            ? "Happy to be identified"
            : data.identification === "anonymous"
                ? "Prefers to remain anonymous"
                : "Not specified";

    if (data.identification === "identified") {
        if (data.name.trim()) fields["Name"] = data.name.trim();
        if (data.designation.trim()) fields["Designation / Role"] = data.designation.trim();
        if (data.industry.trim()) fields["Industry"] = data.industry.trim();
        if (String(data.yearsExperience).trim())
            fields["Years of Corporate Experience"] = String(data.yearsExperience).trim();
        if (data.email.trim()) fields["Email"] = data.email.trim();
    }

    if (data.experienceTypes.length) {
        fields["Experience Types"] = data.experienceTypes.join(", ");
    }
    if (data.otherExperience && data.otherExperience.trim()) {
        fields["Other Experience"] = data.otherExperience.trim();
    }

    fields["Story"] = data.story.trim();

    if (data.storyOneLine.trim()) {
        fields["Story in One Line"] = data.storyOneLine.trim();
    }

    if (data.permission) {
        fields["Sharing Permission"] = PERMISSION_LABELS[data.permission] || data.permission;
    }

    fields["Declaration Confirmed"] = data.declaration ? "Yes" : "No";

    if (data.videoWillingness) {
        fields["Willing to Record Video"] =
            VIDEO_WILLINGNESS_LABELS[data.videoWillingness] || data.videoWillingness;
    }

    return fields;
}

/** Request a signed upload URL for a video (metadata only — no bytes sent). */
async function requestUploadUrl(file) {
    const response = await fetch("/api/forms/create-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            formKey: FORM_KEY,
            category: "video",
            contentType: file.type,
            sizeBytes: file.size,
        }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
        throw new Error(data.error || "Could not prepare the video upload.");
    }

    return data; // { path, token, signedUrl }
}

/** Translate any thrown error into a friendly, non-technical message. */
function friendlyError(error) {
    const message = typeof error?.message === "string" ? error.message : "";

    // Surface our own validation messages (they are already user-friendly).
    if (
        /video|file|email|required|consent|story|size|format/i.test(message) &&
        message.length < 160
    ) {
        return message;
    }

    return "Something went wrong while submitting your story. Please try again in a moment.";
}


const ShareStoryModal = ({
    isOpen,
    onClose,
}) => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // "idle" | "uploading" | "submitting"
    const [uploadStatus, setUploadStatus] = useState("idle");

    const [uploadProgress, setUploadProgress] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState(
        initialFormData
    );


    /* =========================================================
       LOCK BODY SCROLL
    ========================================================= */

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        document.body.style.overflow = "hidden";


        const handleEscape = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };


        window.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            document.body.style.overflow = "";

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [isOpen, onClose]);


    /* =========================================================
       RESET WHEN MODAL CLOSES
    ========================================================= */

    useEffect(() => {

        if (!isOpen) {

            setIsSubmitted(false);

            setIsSubmitting(false);

            setUploadStatus("idle");

            setUploadProgress(0);

            setErrorMessage("");

            setFormData(initialFormData);

        }

    }, [isOpen]);


    /* =========================================================
       DON'T RENDER WHEN CLOSED
    ========================================================= */

    if (!isOpen) {
        return null;
    }


    /* =========================================================
       INPUT CHANGE
    ========================================================= */

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;


        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };


    /* =========================================================
       EXPERIENCE TYPE CHANGE
    ========================================================= */

    const handleExperienceTypeChange = (experience) => {

        setFormData((previous) => {

            const exists =
                previous.experienceTypes.includes(
                    experience
                );


            return {
                ...previous,

                experienceTypes: exists
                    ? previous.experienceTypes.filter(
                        (item) => item !== experience
                    )
                    : [
                        ...previous.experienceTypes,
                        experience,
                    ],
            };

        });

    };


    /* =========================================================
       VIDEO CHANGE
    ========================================================= */

    const handleVideoChange = (event) => {

        const file =
            event.target.files?.[0] || null;


        setErrorMessage("");


        setFormData((previous) => ({
            ...previous,
            video: file,
        }));

    };


    /* =========================================================
       DIRECT-TO-STORAGE VIDEO UPLOAD (with progress)
       The bytes go straight from the browser to Supabase Storage
       using the signed URL — never through the serverless API.
    ========================================================= */

    const uploadVideo = (signedUrl, file) =>
        new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.open("PUT", signedUrl);

            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    setUploadProgress(
                        Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        )
                    );
                }
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve();
                } else {
                    reject(new Error("The video upload failed. Please try again."));
                }
            };

            xhr.onerror = () =>
                reject(new Error("Network error during upload. Please try again."));

            xhr.send(file);

        });


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = async (event) => {

        event.preventDefault();


        // Prevent accidental duplicate submissions.
        if (isSubmitting) {
            return;
        }

        setErrorMessage("");


        /* ---------- Client-side validation ---------- */

        if (!formData.story.trim()) {
            setErrorMessage("Please tell us your story before submitting.");
            return;
        }

        if (!formData.permission) {
            setErrorMessage("Please let us know how we may share your experience.");
            return;
        }

        if (!formData.declaration) {
            setErrorMessage("Please confirm the declaration to submit your story.");
            return;
        }


        // Email is only used (as reply-to) when the person identifies themselves.
        let replyTo;

        if (
            formData.identification === "identified" &&
            formData.email.trim()
        ) {
            const email = formData.email.trim();

            if (!EMAIL_PATTERN.test(email)) {
                setErrorMessage("Please enter a valid email address.");
                return;
            }

            replyTo = email;
        }


        // Validate the optional video before doing any network work.
        const video = formData.video;

        if (video) {
            if (!ACCEPTED_VIDEO_TYPES.includes(video.type)) {
                setErrorMessage(
                    "Please upload a video in MP4, WebM or MOV format."
                );
                return;
            }

            if (video.size > MAX_VIDEO_BYTES) {
                setErrorMessage(
                    "Your video is too large. Please upload a video under 50 MB."
                );
                return;
            }
        }


        /* ---------- Submission flow ---------- */

        setIsSubmitting(true);
        setUploadProgress(0);

        try {

            let filePath;

            // 1. If a video was selected, upload it directly to Supabase.
            if (video) {
                setUploadStatus("uploading");

                const upload = await requestUploadUrl(video);

                await uploadVideo(upload.signedUrl, video);

                filePath = upload.path;
            }

            // 2. Submit the form fields (+ stored file path) to the backend.
            setUploadStatus("submitting");

            const response = await fetch("/api/forms/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formKey: FORM_KEY,
                    fields: buildFields(formData),
                    ...(replyTo ? { replyTo } : {}),
                    ...(filePath ? { filePath } : {}),
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error ||
                    "We couldn't submit your story. Please try again."
                );
            }

            // 3. Existing success state.
            setIsSubmitted(true);

        } catch (error) {

            setErrorMessage(friendlyError(error));

        } finally {

            setIsSubmitting(false);
            setUploadStatus("idle");
            setUploadProgress(0);

        }

    };


    /* =========================================================
       CLOSE
    ========================================================= */

    const handleClose = () => {

        setIsSubmitted(false);

        setFormData(initialFormData);

        onClose();

    };


    /* =========================================================
       RENDER
    ========================================================= */

    return (

        <div
            className="share-story-overlay"

            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    handleClose();
                }

            }}
        >

            <div className="share-story-modal">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="share-story-modal-header">

                    <div>

                        <span className="share-story-modal-eyebrow">

                            {isSubmitted
                                ? "STORY SUBMITTED"
                                : "SHARE YOUR STORY"}

                        </span>


                        {!isSubmitted && (

                            <>

                                <h2>
                                    Share Your Corporate
                                    <br />
                                    <span>
                                        Experience — Help Others Learn
                                    </span>
                                </h2>


                                <p>
                                    Share your story. You can choose
                                    to identify yourself or remain
                                    anonymous.
                                </p>

                            </>

                        )}

                    </div>


                    <button
                        type="button"
                        className="share-story-close"
                        onClick={handleClose}
                        aria-label="Close form"
                    >

                        <X size={24} />

                    </button>

                </div>


                {/* =================================================
                    SUCCESS MESSAGE
                ================================================= */}

                {isSubmitted ? (

                    <div className="share-story-success">

                        <div className="share-story-success-icon">

                            <Check
                                size={30}
                                strokeWidth={2.5}
                            />

                        </div>


                        <span className="share-story-success-eyebrow">
                            THANK YOU
                        </span>


                        <h2>
                            Your story
                            <br />
                            <span>
                                has been received.
                            </span>
                        </h2>


                        <p>
                            Thank you for taking the time to
                            share your experience with our
                            community.
                        </p>


                        <p>
                            Our team will review your submission
                            and get in touch if we'd like to
                            feature your story.
                        </p>


                        <button
                            type="button"
                            className="share-story-success-button"
                            onClick={handleClose}
                        >

                            <span>
                                Done
                            </span>

                            <ArrowRight size={20} />

                        </button>

                    </div>

                ) : (

                    /* =================================================
                       FORM
                    ================================================= */

                    <form
                        className="share-story-form"
                        onSubmit={handleSubmit}
                    >


                        {/* =================================================
                            01 — ABOUT YOU
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    01
                                </span>

                                <div>
                                    <h3>
                                        About You
                                    </h3>

                                    {/* <span className="share-story-section-note">
                                        Optional
                                    </span> */}
                                </div>

                            </div>


                            <div className="share-story-question">

                                <p className="share-story-question-text">
                                    Would you like to share your details?
                                </p>


                                <div className="share-story-radio-group">

                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="identification"
                                            value="identified"
                                            checked={
                                                formData.identification ===
                                                "identified"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Yes, I am happy to be identified
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="identification"
                                            value="anonymous"
                                            checked={
                                                formData.identification ===
                                                "anonymous"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            No, I would like to remain anonymous
                                        </span>

                                    </label>

                                </div>

                            </div>


                            {/* IDENTIFIED DETAILS */}

                            {formData.identification === "identified" && (

                                <div className="share-story-details-grid">

                                    <div className="share-story-field">

                                        <label htmlFor="story-name">
                                            NAME
                                        </label>

                                        <input
                                            id="story-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                        />

                                    </div>


                                    <div className="share-story-field">

                                        <label htmlFor="story-designation">
                                            DESIGNATION / ROLE
                                        </label>

                                        <input
                                            id="story-designation"
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            placeholder="Your role"
                                        />

                                    </div>


                                    <div className="share-story-field">

                                        <label htmlFor="story-industry">
                                            INDUSTRY
                                        </label>

                                        <input
                                            id="story-industry"
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            placeholder="Your industry"
                                        />

                                    </div>


                                    <div className="share-story-field">

                                        <label htmlFor="story-years">
                                            YEARS OF CORPORATE EXPERIENCE
                                        </label>

                                        <input
                                            id="story-years"
                                            type="number"
                                            name="yearsExperience"
                                            value={formData.yearsExperience}
                                            onChange={handleChange}
                                            placeholder="e.g. 12"
                                            min="0"
                                        />

                                    </div>


                                    <div className="share-story-field share-story-field--full">

                                        <label htmlFor="story-email">
                                            EMAIL
                                        </label>

                                        <input
                                            id="story-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                        />

                                    </div>

                                </div>

                            )}

                        </section>


                        {/* =================================================
                            02 — YOUR EXPERIENCE
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    02
                                </span>

                                <div>

                                    <h3>
                                        Your Experience
                                    </h3>

                                    {/* <span className="share-story-section-note">
                                        Optional
                                    </span> */}

                                </div>

                            </div>


                            <p className="share-story-section-description">
                                What type of experience would you like
                                to share? <strong>Select one or more.</strong>
                            </p>


                            <div className="share-story-checkbox-grid">

                                {experienceOptions.map(
                                    (experience) => (

                                        <label
                                            className="share-story-checkbox-option"
                                            key={experience}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.experienceTypes.includes(
                                                        experience
                                                    )
                                                }
                                                onChange={() =>
                                                    handleExperienceTypeChange(
                                                        experience
                                                    )
                                                }
                                            />

                                            <span className="share-story-checkbox">
                                            </span>

                                            <span>
                                                {experience}
                                            </span>

                                        </label>

                                    )
                                )}


                                {/* SOMETHING ELSE */}

                                <div className="share-story-checkbox-other">

                                    <label className="share-story-checkbox-option">

                                        <input
                                            type="checkbox"
                                            checked={
                                                formData.experienceTypes.includes(
                                                    "Something Else"
                                                )
                                            }
                                            onChange={() =>
                                                handleExperienceTypeChange(
                                                    "Something Else"
                                                )
                                            }
                                        />

                                        <span className="share-story-checkbox">
                                        </span>

                                        <span>
                                            Something Else
                                        </span>

                                    </label>


                                    {formData.experienceTypes.includes(
                                        "Something Else"
                                    ) && (

                                        <input
                                            type="text"
                                            name="otherExperience"
                                            placeholder="Please specify"
                                            value={
                                                formData.otherExperience ||
                                                ""
                                            }
                                            onChange={handleChange}
                                        />

                                    )}

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            03 — TELL US YOUR STORY
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    03
                                </span>

                                <div>

                                    <h3>
                                        Tell Us Your Story
                                    </h3>

                                    <span className="share-story-section-note">
                                        We may edit it to make it reader friendly
                                    </span>

                                </div>

                            </div>


                            <div className="share-story-field">

                                <textarea
                                    id="story-message"
                                    name="story"
                                    value={formData.story}
                                    onChange={handleChange}
                                    placeholder="Tell us about the experience, situation, lesson or moment you would like to share..."
                                    rows="9"
                                    required
                                />

                            </div>

                        </section>


                        {/* =================================================
                            04 — STORY IN ONE LINE
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    04
                                </span>

                                <div>

                                    <h3>
                                        Your Story in One Line
                                    </h3>

                                </div>

                            </div>


                            <div className="share-story-field">

                                <input
                                    type="text"
                                    id="story-one-line"
                                    name="storyOneLine"
                                    value={formData.storyOneLine}
                                    onChange={handleChange}
                                    placeholder="Summarise your story in one memorable line..."
                                />

                            </div>

                        </section>


                        {/* =================================================
                            05 — PERMISSION & PRIVACY
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    05
                                </span>

                                <div>

                                    <h3>
                                        Permission &amp; Privacy
                                    </h3>

                                </div>

                            </div>


                            <div className="share-story-question">

                                <p className="share-story-question-text">
                                    Can Winspiring Minds share your
                                    experience with others for learning
                                    purposes?
                                </p>


                                <div className="share-story-radio-group">

                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="permission"
                                            value="name"
                                            checked={
                                                formData.permission ===
                                                "name"
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Yes, with my name
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="permission"
                                            value="anonymous"
                                            checked={
                                                formData.permission ===
                                                "anonymous"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Yes, but anonymously
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="permission"
                                            value="approval"
                                            checked={
                                                formData.permission ===
                                                "approval"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Yes, but only after I approve
                                            the final version
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="permission"
                                            value="internal"
                                            checked={
                                                formData.permission ===
                                                "internal"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            No, I am sharing this only for
                                            internal learning/research
                                        </span>

                                    </label>

                                </div>

                            </div>


                            {/* DECLARATION */}

                            <div className="share-story-declaration">

                                <label className="share-story-declaration-option">

                                    <input
                                        type="checkbox"
                                        name="declaration"
                                        checked={
                                            formData.declaration
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                    <span className="share-story-checkbox">
                                    </span>

                                    <span>
                                        I confirm that the experience
                                        shared by me is based on my own
                                        experience and that I have not
                                        intentionally included confidential
                                        or sensitive information belonging
                                        to my organization, clients or
                                        colleagues.
                                    </span>

                                </label>

                            </div>

                        </section>


                        {/* =================================================
                            06 — OPTIONAL VIDEO
                        ================================================= */}

                        <section className="share-story-section">

                            <div className="share-story-section-heading">

                                <span className="share-story-section-number">
                                    06
                                </span>

                                <div>

                                    <h3>
                                        Upload a Short Video (Optional)
                                    </h3>

                                </div>

                            </div>


                            <div className="share-story-question">

                                <p className="share-story-question-text">
                                    Would you be willing to speak about
                                    this experience in a short
                                    video/interview?
                                </p>


                                <div className="share-story-radio-group">

                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="videoWillingness"
                                            value="yes"
                                            checked={
                                                formData.videoWillingness ===
                                                "yes"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Yes
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="videoWillingness"
                                            value="maybe"
                                            checked={
                                                formData.videoWillingness ===
                                                "maybe"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            Maybe, please contact me
                                        </span>

                                    </label>


                                    <label className="share-story-option">

                                        <input
                                            type="radio"
                                            name="videoWillingness"
                                            value="no"
                                            checked={
                                                formData.videoWillingness ===
                                                "no"
                                            }
                                            onChange={handleChange}
                                        />

                                        <span className="share-story-radio">
                                        </span>

                                        <span>
                                            No
                                        </span>

                                    </label>

                                </div>

                            </div>


                            {/* VIDEO UPLOAD */}

                            <div className="share-story-field">

                                <label htmlFor="story-video">
                                    PLEASE UPLOAD THE VIDEO
                                </label>


                                <div
                                    className={`share-story-video-upload ${
                                        formData.video
                                            ? "has-file"
                                            : ""
                                    }`}
                                >

                                    <input
                                        id="story-video"
                                        type="file"
                                        name="video"
                                        accept="video/mp4,video/webm,video/quicktime"
                                        onChange={handleVideoChange}
                                    />


                                    <span className="share-story-video-placeholder">

                                        {formData.video
                                            ? formData.video.name
                                            : "Choose a video to upload..."}

                                    </span>

                                </div>


                                <p className="share-story-video-help">
                                    MP4, WebM or MOV. Please upload
                                    a video that clearly tells your
                                    story or experience.
                                </p>

                            </div>

                        </section>


                        {/* =================================================
                            CLOSING MESSAGE
                        ================================================= */}

                        <div className="share-story-closing-message">

                            <strong>
                                One experience can become someone
                                else's learning.
                            </strong>

                            <span>
                                Thank You!
                            </span>

                        </div>


                        {/* =================================================
                            FORM FOOTER
                        ================================================= */}

                        <div className="share-story-form-footer">

                            <p>
                                Selected stories may be featured
                                on our website.
                            </p>


                            {errorMessage && (
                                <p
                                    className="share-story-error"
                                    role="alert"
                                >
                                    {errorMessage}
                                </p>
                            )}


                            {isSubmitting && uploadStatus === "uploading" && (
                                <div
                                    className="share-story-progress"
                                    aria-live="polite"
                                >
                                    <div className="share-story-progress-track">
                                        <div
                                            className="share-story-progress-bar"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        />
                                    </div>

                                    <span className="share-story-progress-label">
                                        {`Uploading video… ${uploadProgress}%`}
                                    </span>
                                </div>
                            )}


                            <button
                                type="submit"
                                className="share-story-submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                            >

                                <span>
                                    {uploadStatus === "uploading"
                                        ? "Uploading video…"
                                        : uploadStatus === "submitting"
                                            ? "Submitting…"
                                            : "Submit Your Story"}
                                </span>

                                <ArrowRight size={20} />

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
};


export default ShareStoryModal;
