import React from "react";
import MinimizedHeader from "../../Components/EventPageComp/Js/minimizedHeader";
import AboutFooter from "../../Components/EventPageComp/Js/aboutFooter";

export default function Advertise() {
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
            style={{ fontSize: "25px", fontWeight: "700" }}
          >
            Advertise with <br /> us
          </h1>
          <h1
            className="Section-Titles"
            style={{ fontSize: "22px", fontWeight: "300" }}
          >
            To advertise on Urban Update Magazine
          </h1>
          {/* prettier-ignore */}
          <p>
          r------------------------------------------------------------
          -------------,<br/>
          Send Email to: contacturbanupdate@gmail.com<br/>
          L-----------------------------------------------------------
          --------------<br/>
          </p>
          {/* prettier-ignore */}
          <div style={{ textAlign: "justify", lineHeight: "1.6" }}>
          <h1
            className="Section-Titles"
            style={{ fontSize: "25px", fontWeight: "700" }}
          >
            WHO <br /> READS
          </h1>
          <p style={{ whiteSpace: "pre-wrap" }} className="Section-Text">
          Policy Makers<br/>
          Responsible for policy decisions on urban infrastructure development, regulation and enforcement
          Mayors and Municipal Commissioners:
          Looking for solutions, services, strategies, innovations and best practices for various urban infrastructure issues and
          challenges<br/>
          Corporate Executives<br/>
          From various sectors, like Water, Waste, Environment, Transport, e-Governance, Real Estate, Safety and Security, Urban
          Infrastructure Development, responsible for strategic planning, networking and business development for their respective
          businesses in the field of urban infrastructure and built-environment
          Urban Stakeholders, Professionals and Industry Experts
          Experts in urban development, master planners , architects, engineers and finance professionals responsible for
          preparing policies , city development plans, local area plans, transport plans, environmental plans, etc. for cities
          International Agency Representatives
          Multilateral urban development and aid agencies, academic and research organisations , financial institutions, etc.<br/><br/><br/>

        
             </p>
          </div>
        </div>
        <AboutFooter />
      </div>
    </div>
  );
}
