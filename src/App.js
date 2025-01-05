import SiteFooter from "./Components/siteFooter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/homepage";
import EventsPage from "./Pages/events";
import CreateAccount from "./Pages/createAccount";
import OAuthRedirectHandler from "./Pages/OAuthRedirectHandler";
import Signin from "./Pages/signinAccount";
import DetailPage from "./Pages/DetailPage";
import TermOfUse from "./Pages/Abouts/termofuse";
import AccessibilityState from "./Pages/Abouts/accessibility";
import Advertise from "./Pages/Abouts/advertise";
import Careers from "./Pages/Abouts/carrers";
import PrivacyPolicy from "./Pages/Abouts/privacypolicy";
import AboutUs from "./Pages/Abouts/aboutuu";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/termofuse" element={<TermOfUse />} />
          <Route path="/accessibility" element={<AccessibilityState />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/detail/:collection/:id" element={<DetailPage />} />
          <Route exact path="/auth-redirect" component={OAuthRedirectHandler} />
        </Routes>
      </Router>
      <SiteFooter />
    </div>
  );
}

export default App;
