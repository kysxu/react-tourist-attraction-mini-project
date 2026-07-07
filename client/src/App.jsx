import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import TripList from "./components/TripList";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch trips from the API based on keywords
  const fetchTrips = async (keywords) => {
    setLoading(true);
    try {
      // API endpoint of backend server
      const response = await fetch(
        `http://localhost:4001/trips?keywords=${encodeURIComponent(keywords)}`
      );
      if (!response.ok) {
        throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์");
      }
      const result = await response.json();
      setTrips(result.data || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search when searchText changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTrips(searchText.trim());
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  // Handle clicking on category tags
  const handleTagClick = (tag) => {
    // Split current search text by spaces, trim each term and filter out empty strings
    const currentTerms = searchText
      .split(" ")
      .map((term) => term.trim())
      .filter(Boolean);

    // Add tag only if it does not already exist in the search terms
    if (!currentTerms.includes(tag)) {
      const updatedTerms = [...currentTerms, tag];
      setSearchText(updatedTerms.join(" "));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">เที่ยวไหนดี</h1>
        <p className="app-subtitle">ค้นหาสถานที่ท่องเที่ยวยอดฮิตและกิจกรรมห้ามพลาด</p>
      </header>

      <main>
        {/* Controlled Search input */}
        <SearchInput value={searchText} onChange={setSearchText} />

        {/* List of Trips */}
        <TripList trips={trips} loading={loading} onTagClick={handleTagClick} />
      </main>
    </div>
  );
}

export default App;
