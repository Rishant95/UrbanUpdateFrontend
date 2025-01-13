import { useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Ensure this includes the protocol

// Custom hook to fetch articles from the API
const useFetch = (categoryName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/news-articles?populate[0]=categories&populate[1]=Image&filters[categories][CategoryName][$eq]=${categoryName}&populate[3]=author&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=10`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Ensure that result is in the format you're expecting
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return { data, loading, error };
};

// Utility function to get image URL from data
const getImageUrl = (data) => {
  if (data.Image?.[0]?.formats?.medium?.url) {
    return `${API_BASE_URL}${data.Image[0].formats.medium.url}`;
  }
  if (data.Image?.[0]?.url) {
    return `${API_BASE_URL}${data.Image[0].url}`;
  }
  return "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL
};
const getAuthorImageUrl = (data) => {
  // Check if the author has a profile photo URL and return it
  if (data?.author?.ProfilePhoto?.formats?.thumbnail?.url) {
    return `${API_BASE_URL}${data.author.ProfilePhoto.formats.thumbnail.url}`;
  }
  // If no large format, fall back to a smaller format
  if (data?.author?.ProfilePhoto?.url) {
    return `${API_BASE_URL}${data.author.ProfilePhoto.url}`;
  }
  // Return a fallback image URL if no profile photo is found
  return "https://yourapi.com/path-to-placeholder-image.jpg";
};
const getMoreDetail = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/news-articles?filters[id][$eq]=${id}&populate[0]=author&populate[1]=author.ProfilePhoto&populate[2]=Image`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the result directly
  } catch (error) {
    return { error };
  }
};

export { useFetch, getImageUrl, getMoreDetail, getAuthorImageUrl };
//
