import { useState, useEffect } from "react";

const useFetch = (Uri) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Correct usage of setLoading

      try {
        const res = await fetch(Uri);
        const json = await res.json();
        console.log(json);
        setData(json);
        setLoading(false); // Correct usage of setLoading
      } catch (error) {
        setError(error);
        setLoading(false); // Correct usage of setLoading
      }
    };

    fetchData();
  }, [Uri]);

  return { loading, error, data };
};

export default useFetch;
