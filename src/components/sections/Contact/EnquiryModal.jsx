import { useEffect, useState } from "react";
import { X } from "lucide-react";

import EnquiryForm from "./EnquiryForm";
import EnquirySuccess from "./EnquirySuccess";

import "./Enquiry.css";

export default function EnquiryModal({
  isOpen,
  onClose,
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      setSubmitted(false);
    }, 250);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="enquiry-modal"
      onClick={handleClose}
    >
      <div
        className="enquiry-modal__dialog"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="enquiry-modal__close"
          onClick={handleClose}
          aria-label="Close enquiry form"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <EnquirySuccess
            onClose={handleClose}
          />
        ) : (
          <EnquiryForm
            onSuccess={() =>
              setSubmitted(true)
            }
          />
        )}

      </div>
    </div>
  );
}
