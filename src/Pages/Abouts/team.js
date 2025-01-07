import React from "react";
import MinimizedHeader from "../../Components/EventPageComp/Js/minimizedHeader";
import "../../PagesCss/AboutCss/team.css";

const teamMembers = [
  {
    name: "Ranjit S Chavan",
    role: "President-AIILSG",
    image: "/TeamImages/1.RanjitSChavanPresidentAIILSG.jpg",
  },
  {
    name: "Dr Jairaj Phatak, IAS (Retd.)",
    role: "Editor-In-Chief, Director General AIILSG",
    image:
      "/TeamImages/2.DrJairajPhatak,IASRetdEditor-In-Chief,DirectorGeneralAIILSG.jpg",
  },
  {
    name: "Ravi Ranjan Guru",
    role: "Executive Editor",
    image: "/TeamImages/3.RaviRanjanGuruExecutiveEditor.jpg",
  },
  {
    name: "Ashok Wankhade",
    role: "Managing Editor",
    image: "/TeamImages/4.AshokWankhadeManagingEditor.jpg",
  },
  {
    name: "Abhishek Pandey",
    role: "Editor",
    image: "/TeamImages/5.AbhishekPandeyEditor.jpg",
  },
  {
    name: "Vijay Kumar",
    role: "Editorial Advisor",
    image: "/TeamImages/6.VijayKumarEditorialAdvisor.jpg",
  },
  {
    name: "Jyoti Verma",
    role: "Consulting Editor",
    image: "/TeamImages/7.JyotiVermaConsultingEditor.jpg",
  },
  {
    name: "Ayesha Saeed ",
    role: "Senior Reporter",
    image: "/TeamImages/8.AyeshaSaeedSeniorReporter.jpg",
  },
  {
    name: "Shashank Garg",
    role: "Reporter",
    image: "/TeamImages/9.ShashankGargReporter.jpg",
  },
  {
    name: "Meenakshi Rajput",
    role: "Art Director",
    image: "/TeamImages/10.MeenakshiRajputArtDirector.jpg",
  },
];

export default function Team() {
  return (
    <div>
      <MinimizedHeader />
      <div className="team-page-container">
        <h1 className="team-title">Meet Our Team</h1>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img
                src={member.image}
                alt={member.name}
                className="team-image"
              />
              <div className="team-card-content">
                <h2 className="team-name">{member.name}</h2>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
