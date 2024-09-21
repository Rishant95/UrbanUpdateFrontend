import SiteFooter from "./Components/siteFooter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/homepage";
import EventsPage from "./Pages/events";
import CreateAccount from "./Pages/createAccount";
import OAuthRedirectHandler from "./Pages/OAuthRedirectHandler";
import Signin from "./Pages/signinAccount";
import DetailPage from "./Pages/DetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/signup" element={<CreateAccount />} />
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
