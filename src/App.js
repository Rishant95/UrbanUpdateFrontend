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
import ContactUs from "./Pages/Abouts/contactus";
import Team from "./Pages/Abouts/team";
import Partners from "./Pages/Abouts/partners";
import CategoryPage from "./Pages/categoryPage";
import SearchResults from "./Pages/searchpage";
import UUMagazine from "./Components/MagazineComp/Js Files/UUMagazine";

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
          <Route path="/urbanupdate" element={<UUMagazine />} />
          <Route path="/about-urban-update" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/category/:collection" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/detail/:collection/:id" element={<DetailPage />} />
          <Route exact path="/auth-redirect" component={OAuthRedirectHandler} />
        </Routes>
      </Router>
      <SiteFooter />
    </div>
  );
}

export default App;
