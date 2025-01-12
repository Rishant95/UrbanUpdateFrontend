/* eslint-disable jsx-a11y/alt-text */
import "../Css Files/Regulars.css";

export default function Regulars() {
  return (
    <div>
      <div className="Featured-Heading Section-Headings">
        <h1>Regulars</h1>
        <hr className="Section-Styled-hr" />

        <div className="Regulars-Container">
          <div className="Regulars-Items">
            <img src="/Logos/pinpoint.jpg" className="Regulars-image"></img>
            <h3 className="Regulars-Text">PinPoint</h3>
          </div>
          <div className="Regulars-Items">
            <img src="/Logos/birdseyeview.jpg" className="Regulars-image"></img>
            <h3 className="Regulars-Text">Bird's Eye View</h3>
          </div>

          <div className="Regulars-Items">
            <img src="/Logos/cityimage.jpg" className="Regulars-image"></img>
            <h3 className="Regulars-Text">City Image</h3>
          </div>
          <div className="Regulars-Items">
            <img src="/Logos/Numerographs.jpg" className="Regulars-image"></img>
            <h3 className="Regulars-Text">Numerographs</h3>
          </div>
          <div className="Regulars-Items">
            <img src="/Logos/Diary.jpg" className="Regulars-image"></img>
            <h3 className="Regulars-Text">AIILSG Dairy</h3>
          </div>
        </div>
        <hr className="Section-Styled-hr" />
      </div>
    </div>
  );
}
