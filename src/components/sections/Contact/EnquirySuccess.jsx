import { CheckCircle2, ArrowRight } from "lucide-react";

import { enquiryData } from "./enquiryData";

export default function EnquirySuccess({
  onClose,
}) {
  return (
    <div className="enquiry-success">

      <div className="enquiry-success__icon">
        <CheckCircle2 size={58} strokeWidth={1.7} />
      </div>

      <span className="enquiry-success__badge">
        CONVERSATION STARTED
      </span>

      <h2 className="enquiry-success__title">
        {enquiryData.success.title}
      </h2>

      <p className="enquiry-success__description">
        {enquiryData.success.description}
      </p>

      <div className="enquiry-success__note">
        {enquiryData.success.note}
      </div>

      <button
        type="button"
        className="enquiry-success__button"
        onClick={onClose}
      >
        <span>
          {enquiryData.success.button}
        </span>

        <ArrowRight size={18} />
      </button>

    </div>
  );
}