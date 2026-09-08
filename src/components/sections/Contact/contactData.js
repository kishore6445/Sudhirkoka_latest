export const contactData = {
    modal: {
        badge: "LET'S START THE CONVERSATION",

        title:
            "Have Something on Your Mind? Let’s Talk. We are Listening.",

        description:
            "Sometimes you need advice.\n\nSometimes you are facing a challenge.\n\nSometimes you have an experience worth sharing.\n\nAnd sometimes, you simply want to talk to someone who can offer a different perspective.",

        reassurance:
            "Whether you are an individual or an organization, we would love to hear from you. We will keep the conversation confidential.",
    },


    sections: {
        aboutYou: {
            number: "01",
            title: "About You",
            // note: "Optional",
            question: "I am reaching out as:",
        },

        whatWouldYouLikeToDo: {
            number: "02",
            title: "What Would You Like to Do?",
            question: "I would like to:",
        },

        message: {
            number: "03",
            title: "Tell Us What's on Your Mind",
            question:
                "Please share your question, challenge, experience, idea or message.",
            note:
                "There is no need to structure it perfectly. Just tell us in your own words.",
        },

        assistance: {
            number: "04",
            title: "How do you want us to assist?",
            question: "How can we best help you?",
        },

        response: {
            number: "05",
            title: "How Would You Prefer Us to Respond?",
        },

        anonymous: {
            number: "06",
            title: "Would You Like to Remain Anonymous?",
        },
    },


    identityOptions: [
        "An Individual",
        "An Employee",
        "A Manager / Leader",
        "An HR / L&D Professional",
        "An Organization",
        "A Business Owner / Entrepreneur",
        "Other",
    ],


    actionOptions: [
        "I have a question",
        "I need advice",
        "I am facing a workplace challenge",
        "I would like to share an experience",
        "I am interested in leadership / coaching support",
        "I would like to discuss an organizational requirement",
        "I have an idea or suggestion",
        "Something else",
    ],


    assistanceOptions: [
        "A perspective or advice",
        "Leadership coaching",
        "Manager / people development",
        "Team or organizational support",
        "Learning & development",
        "A conversation about my situation",
        "Not sure — I would like to discuss it",
    ],


    responseOptions: [
        "Email",
        "Phone call",
        "WhatsApp",
        "Video / Virtual conversation",
    ],


    anonymousOptions: [
        "Yes, I would like to remain anonymous",
        "No, you may identify me",
    ],


    fields: {
        name: {
            label: "Name",
            placeholder: "Enter your name",
            required: true,
        },

        email: {
            label: "Email",
            placeholder: "Enter your email address",
            required: true,
        },

        phone: {
            label: "Phone / WhatsApp",
            placeholder: "Enter your phone number",
            required: false,
        },

        organization: {
            label: "Organization / Company",
            placeholder: "Company or organization",
            required: false,
        },

        designation: {
            label: "Designation",
            placeholder: "Your role",
            required: false,
        },
    },


    notice:
        "While we will try to revert at the earliest, it may take us 7 to 10 working days to reach out to you.",


    submitButton: {
        text: "Start the Conversation",
        loadingText: "Sending...",
    },


    success: {
        title: "Thank You!",

        description:
            "Your message has been received. We appreciate you taking the time to reach out and will get back to you as soon as we can.",

        button: "Close",
    },
};