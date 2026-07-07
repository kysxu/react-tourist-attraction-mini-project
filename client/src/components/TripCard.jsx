import React, { useState } from "react";

function TripCard({ trip, onTagClick }) {
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(trip.photos[0]);

  const handleCopyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(trip.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  // Truncate description to maximum 100 characters.
  const getTruncatedDescription = (desc) => {
    if (!desc) return "";
    if (desc.length <= 100) return desc;
    return desc.slice(0, 100) + "...";
  };

  return (
    <article className="trip-card">
      {/* Left side: Big Main Image */}
      <div className="trip-image-container">
        <img
          src={activeImage}
          alt={trip.title}
          className="trip-main-image"
          loading="lazy"
        />
      </div>

      {/* Right side: Information and Previews */}
      <div className="trip-content">
        <div className="trip-info">
          {/* Title as a link opening in a new tab */}
          <a
            href={trip.url}
            target="_blank"
            rel="noopener noreferrer"
            className="trip-title-link"
          >
            <h2 className="trip-title">{trip.title}</h2>
          </a>

          {/* Description truncated to max 100 characters */}
          <p className="trip-description">
            {getTruncatedDescription(trip.description)}
          </p>

          {/* Read More link */}
          {trip.description && trip.description.length > 100 && (
            <a
              href={trip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              อ่านต่อ
            </a>
          )}

          {/* Category Tags */}
          <div className="trip-categories">
            <span>หมวดหมู่: </span>
            {trip.tags.map((tag, idx) => (
              <span
                key={idx}
                className="category-tag"
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Previews and Copy button */}
        <div className="trip-footer">
          {/* Remaining 3 preview images (or all 4 so user can click any to view) */}
          <div className="trip-previews">
            {trip.photos.slice(1, 4).map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`${trip.title} preview ${idx + 1}`}
                className="trip-preview-image"
                onClick={() => setActiveImage(photo)}
                onMouseEnter={() => setActiveImage(photo)}
                onMouseLeave={() => setActiveImage(trip.photos[0])}
              />
            ))}
          </div>

          {/* Blue Copy Link Button */}
          <div className="copy-btn-container">
            <button
              className="copy-button"
              onClick={handleCopyLink}
              title="คัดลอกลิงก์สถานที่ท่องเที่ยว"
              aria-label="Copy link to clipboard"
            >
              <svg viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
            {copied && <span className="copy-tooltip">คัดลอกแล้ว!</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TripCard;
