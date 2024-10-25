import { useState, useEffect } from "react";

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
          ? `?filters[categories][CategoryName][$eq]=${categoryName}&populate[0]=categories&populate[1]=Media`
          : "?populate[0]=categories&populate[1]=Image"; // Default if no category is provided

        const res = await fetch(
          `https://admin.manofox.online/api/news-articles${categoryFilter}`
        );
        const json = await res.json();
        console.log(json);
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return { loading, error, data };
};

export default useFetch;
