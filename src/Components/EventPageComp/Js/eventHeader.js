import "../Css/eventHeader.css";

export default function EventHeader() {
  return (
    <div>
      <div className="Event-Header">
        <h1 id="Event-Title">EVENTS</h1>
        <div className="tabs-row">
          <a href="#tab1" className="tab-link">
            Upcoming Events
          </a>
          <a href="#tab2" className="tab-link">
            E-Dialogues
          </a>
          <a href="#tab3" className="tab-link">
            Mayor's Dialogue
          </a>
          <a href="#tab4" className="tab-link">
            SAC Summit
          </a>
          <a href="#tab5" className="tab-link">
            Urban Dialogues
          </a>
        </div>
        <hr style={{ marginTop: "10px", width: "90%" }}></hr>
      </div>
    </div>
  );
}
