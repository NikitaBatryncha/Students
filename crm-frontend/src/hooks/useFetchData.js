
import { useEffect, useState } from "react";
import getUser from "./getUser";

export default function useFetchData () {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await getUser();
      setData(response)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return {data, loading, error};
}
