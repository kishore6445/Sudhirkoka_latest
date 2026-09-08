export const enquiryData = {
  modal: {
    badge: "REACH OUT",

    title: "Let’s Solve Your People & Leadership Challenges",

    description:
      "Tell us what you are trying to solve. We’ll explore the challenge with you and identify how Winspiring Minds can help.",

    intro: [
      "Sometimes you need advice.",
      "Sometimes you are facing a challenge.",
      "Sometimes you have an experience worth sharing.",
      "And sometimes, you simply want to talk to someone who can offer a different perspective.",
    ],

    confidentiality:
      "Whether you are an individual or an organization, we would love to hear from you. We will keep the conversation confidential.",
  },

  sections: {
    about: {
      number: "01",
      title: "Organization Details",
    },

    lookingFor: {
      number: "02",
      title: "What Are You Looking For?",
      question: "How can Winspiring Minds help you?",
    },

    challenge: {
      number: "03",
      title: "Tell Us About Your Challenge",
      
    },

    outcome: {
      number: "04",
      title: "What Outcome Are You Looking For?",
      
    },

    engagement: {
      number: "05",
      title: "What Type of Engagement Are You Considering?",
    },

    additional: {
      number: "06",
      title: "Anything Else We Should Know?",
      // question:
      //   "Is there anything else you would like us to understand about your organization, people or challenge?",
    },

    source: {
      number: "07",
      title: "How Did You Hear About Winspiring Minds?",
      // optional: true,
    },
  },

  fields: {
    organizationName: {
      label: "Organization Name",
      placeholder: "Enter your organization name",
      required: true,
    },

    industry: {
      label: "Industry / Sector",
      placeholder: "e.g. Technology, Healthcare, Manufacturing",
      required: true,
    },

    organizationSize: {
      label: "Organization Size",
      options: [
        "Up to 50 employees",
        "51–250",
        "251–1,000",
        "1,001–5,000",
        "5,000+",
      ],
    },

    name: {
      label: "Your Name",
      placeholder: "Enter your full name",
      required: true,
    },

    designation: {
      label: "Designation / Role",
      placeholder: "Your role",
      required: true,
    },

    email: {
      label: "Business Email",
      placeholder: "you@company.com",
      required: true,
    },

    phone: {
      label: "Phone / WhatsApp",
      placeholder: "+91",
      required: false,
    },

    lookingFor: {
      options: [
        "Leadership Development",
        "Executive Coaching",
        "Manager Development",
        "Team Effectiveness",
        "Culture & Organizational Development",
        "HR / L&D Support",
        "Other",
      ],
    },

    challenge: {
      placeholder:
        "Tell us about the situation, challenge or opportunity you are currently facing...",
      required: true,
    },

    outcome: {
      placeholder:
        "What would you like to see change after the intervention?",
      required: true,
    },

    urgency: {
      options: [
        "Exploring for the future",
        "Within the next 3 months",
        "Within the next 1–2 months",
        "Immediate requirement",
      ],
    },

    engagement: {
      options: [
        "Leadership / Executive Coaching",
        "Workshop / Learning Program",
        "Team Development",
        "Leadership Development Program",
        "Organizational / Culture Intervention",
        "Consulting / Advisory",
        "Not sure yet — open to discussion",
      ],
    },

    additional: {
      placeholder:
        "Anything else you would like us to understand about your organization, people or challenge...",
      required: false,
    },

    source: {
      options: [
        "LinkedIn",
        "Google / Search",
        "Referral",
        "Existing Connection",
        "Event / Webinar",
        "Other",
      ],
    },

    consent: {
      label:
        "I agree to be contacted by Winspiring Minds regarding my enquiry.",
    },
  },

  success: {
    title: "Thank You.",

    description:
      "Your enquiry has been received. We’ll review what you’ve shared and get back to you as soon as possible.",

    note:
      "While we will try to revert at the earliest, it may take us 7 to 10 working days to reach out to you.",

    button: "Close",
  },
};