import React from "react";
import TripCard from "./TripCard";

function TripList({ trips, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>กำลังค้นหาข้อมูลสถานที่ท่องเที่ยว...</p>
      </div>
    );
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="empty-container">
        <h3>ไม่พบสถานที่ท่องเที่ยวที่ค้นหา</h3>
        <p>ลองใช้คำค้นหาอื่น เช่น ทะเล, ภูเขา, น้ำตก หรือ คาเฟ่</p>
      </div>
    );
  }

  return (
    <section className="trip-list">
      {trips.map((trip) => (
        <TripCard key={trip.eid} trip={trip} onTagClick={onTagClick} />
      ))}
    </section>
  );
}

export default TripList;
