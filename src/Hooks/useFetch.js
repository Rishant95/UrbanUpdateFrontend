import { useState, useEffect } from "react";

const API_BASE_URL = "https://admin.manofox.online";

// Custom hook for fetching data
const useFetch = (categoryName) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Construct the API URL based on the category name
        const categoryFilter = categoryName
          ? `?filters[categories][CategoryName][$eq]=${categoryName}&populate[0]=categories&populate[1]=Image`
          : "?populate[0]=categories&populate[1]=Image"; // Default if no category is provided

        const res = await fetch(
          `${API_BASE_URL}/api/news-articles${categoryFilter}`
        );

        // Check for a successful response
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };

    fetchData();
  }, [categoryName]);

  return { loading, error, data };
};

// Utility function to get the image URL
const getImageUrl = (data) => {
  if (data.ThumbailUrl) {
    return `${API_BASE_URL}${data.ThumbailUrl}`;
  }
  if (data.Image?.[0]?.formats?.large?.url) {
    return `${API_BASE_URL}${data.Image[0].formats.large.url}`;
  }
  if (data.Image?.[0]?.url) {
    return `${API_BASE_URL}${data.Image[0].url}`;
  }
  return "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL
};

// Exporting the custom hook and utility function
export { useFetch, getImageUrl };
