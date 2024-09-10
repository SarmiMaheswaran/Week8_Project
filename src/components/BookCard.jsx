// BookCard.jsx
import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ novel, onClick }) => {
  return (
    <div className="book-card" onClick={onClick}>
      <img src={novel.imageUrl} alt={novel.title} className="book-image" />
      <div className="book-details">
        <h3>{novel.title}</h3>
        <p>By {novel.author}</p>
        <p><strong>Genre:</strong> {novel.genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
