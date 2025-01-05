import React from "react";
import MinimizedHeader from "../../Components/EventPageComp/Js/minimizedHeader";
import AboutFooter from "../../Components/EventPageComp/Js/aboutFooter";

export default function Careers() {
  return (
    <div>
      <MinimizedHeader />
      <div style={{ padding: "2% 17%" }}>
        {" "}
        <p className="Section-Dates">Tuesday, December 31, 2024</p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
          }}
        >
          <img
            src="UULogoResized.jpg"
            alt="Logo"
            style={{ height: "50%", width: "50%" }}
          />
          <h1 style={{ fontSize: "15px" }}>_( httP-S: //u rbanuP-date. in)_</h1>

          <h1
            className="Section-Titles"
            style={{ fontSize: "22px", fontWeight: "300" }}
          >
            Career at Urban Update
          </h1>
          {/* prettier-ignore */}
          <div style={{ textAlign: "justify", lineHeight: "1.6" }}>

          <p style={{ whiteSpace: "pre-wrap" }} className="Section-Text">
          Become a part of Urban Update to give a right shape to your career.
          Work within the cooperative environment with the highly experienced
          team to earn rewards and awards in order to achieve your goals.<br/>
          Urban Update is looking for talented media and marketing professionals to join
          editorial team. Experienced and amateur journalists can send in their CVs to joi
          team of vibrant media persons and take on a number of challenging new initiatives
          both print and digital media.<br/>
          ABOUT URBAN UPDATE (HTTPS:/IURBANUPDATE.IN/ABOUT-URBAN-UPDATEL)<br/>
             </p>
          </div>
          <AboutFooter />
        </div>
      </div>
    </div>
  );
}
