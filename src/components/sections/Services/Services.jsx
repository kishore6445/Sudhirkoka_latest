import React from "react";
import { ArrowRight } from "lucide-react";
import { servicesData } from "./servicesData";
import "./services.css";

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">

        {/* ================= HEADER ================= */}

        <div className="services-header">

          <div className="services-kicker">
            {/* <span className="services-number">05</span>
            <span>/</span> */}
            <span>LEADERSHIP SOLUTIONS</span>
          </div>

          <div className="services-header-line" />

          <div className="services-heading-row">

            <div className="services-heading-wrap">
              <h2 className="services-heading">
                Helping Leaders and Organisations
                <br />
                <span>Achieve Sustainable Growth</span>
              </h2>

              <p className="services-intro">
                Practical, people-centred solutions that help leaders
                strengthen teams, improve organisational effectiveness,
                and create lasting business impact.
              </p>
            </div>

            <div className="services-heading-accent">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </div>

        {/* ================= SERVICES GRID ================= */}

        <div className="services-grid">

          {servicesData.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="service-card"
                key={service.id}
              >

                {/* Icon */}

                <div className="service-icon">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Number */}

                {/* <span className="service-number">
                  0{service.id}
                </span> */}

                {/* Content */}

                <div className="service-content">

                  <h3 className="service-title">
                    {service.title}
                  </h3>

                  <p className="service-description">
                    {service.description}
                  </p>

                </div>

                {/* Link */}

                {/* 
                <button className="service-link">
                  <span>Learn More</span>

                  <ArrowRight
                    size={19}
                    strokeWidth={1.8}
                  />
                </button> 
                */}

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Services;
