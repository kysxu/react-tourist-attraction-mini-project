import React from "react";

function SearchInput({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <label htmlFor="search-input" className="search-label">
        ค้นหาที่เที่ยว
      </label>
      <div className="search-input-container">
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน... (เช่น เกาะ, ทะเล, คาเฟ่)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchInput;
