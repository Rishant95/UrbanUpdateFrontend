import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function OAuthRedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("access_token");

    if (accessToken) {
      // Store token in localStorage or use it for further authenticated requests
      localStorage.setItem("token", accessToken);
      // Redirect to the desired page after login
      window.location.href = "/dashboard"; // or another page
    }
  }, [location]);

  return <div>Loading...</div>;
}
