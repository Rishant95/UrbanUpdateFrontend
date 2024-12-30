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
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/e463281665a0e8442ed100325ff769d7.png"
              className="Regulars-image"
            ></img>
            <h3 className="Regulars-Text">PinPoint</h3>
          </div>
          <div className="Regulars-Items">
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/457fbeb266c3e0684a9a7a48a0bd7398.png"
              className="Regulars-image"
            ></img>
            <h3 className="Regulars-Text">Bird's Eye View</h3>
          </div>

          <div className="Regulars-Items">
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/457fbeb266c3e0684a9a7a48a0bd7398.png"
              className="Regulars-image"
            ></img>
            <h3 className="Regulars-Text">City Image</h3>
          </div>
          <div className="Regulars-Items">
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/f6fc1e870fb223ac323e893056f19e16.png"
              className="Regulars-image"
            ></img>
            <h3 className="Regulars-Text">Numerographs</h3>
          </div>
          <div className="Regulars-Items">
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/7fa07035e3dd54b93e825b9dc59d7075.png"
              className="Regulars-image"
            ></img>
            <h3 className="Regulars-Text">AIILSG Dairy</h3>
          </div>
        </div>
        <hr className="Section-Styled-hr" />
      </div>
    </div>
  );
}
