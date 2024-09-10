// FullscreenBook.jsx
import React from 'react';
import '../styles/FullScreenBook.css';

const FullScreenBook = ({ novel, onClose }) => {
  return (
    <div className="fullscreen-book">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <img src={novel.imageUrl} alt={novel.title} className="fullscreen-image" />
      <h1>{novel.title}</h1>
      <h3>By {novel.author}</h3>
      <p><strong>Genre:</strong> {novel.genre}</p>
      <p>{novel.summary}</p>
    </div>
  );
};

export default FullScreenBook;
