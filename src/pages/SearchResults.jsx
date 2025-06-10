import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/search/?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No results found.</p>;

  return (
    <div>
      <h2>Results for: {searchQuery}</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.product_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
