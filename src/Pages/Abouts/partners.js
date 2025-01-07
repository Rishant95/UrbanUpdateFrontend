import React from "react";
import MinimizedHeader from "../../Components/EventPageComp/Js/minimizedHeader";
import "../../PagesCss/AboutCss/partners.css";

const partners = [
  {
    name: "AIILSG",
    logo: "/Partners/Aiilsg-logo.png",
    link: "https://www.aiilsg.org/",
  },
  {
    name: "European Union",
    logo: "/Partners/EuropeanUnionlogo.png",
    link: "https://european-union.europa.eu/index_en",
  },
  {
    name: "RCUES",
    logo: "/Partners/RCUESLogo.png",
    link: "https://www.partner3.com",
  },
  {
    name: "Swachh Bharat",
    logo: "/Partners/SwachhBharatLOGO.png",
    link: "https://www.partner4.com",
  },
  {
    name: "UCLGA spec",
    logo: "/Partners/UCLGAspec.png",
    link: "https://uclg-aspac.org/",
  },
  {
    name: "UN Habitat",
    logo: "/Partners/UNHabitatlogo.png",
    link: "https://unhabitat.org/",
  },
];

export default function Partners() {
  return (
    <div>
      <MinimizedHeader />
      <div className="partners-page-container">
        <h1 className="partners-title">Our Partners</h1>
        <div className="partners-scroll-container">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-item"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
              />
              <div className="partner-name">{partner.name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
