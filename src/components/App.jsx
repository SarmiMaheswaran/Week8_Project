import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import BookCard from './BookCard';
import FullscreenBook from './FullScreenBook';
import SearchBar from './SearchBar';

const App = () => {
  const [novels, setNovels] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load novels from localStorage when the app starts
  useEffect(() => {
    const storedNovels = JSON.parse(localStorage.getItem('novels'));
    if (storedNovels && storedNovels.length > 0) {
      setNovels(storedNovels);
    }
  }, []);

  // Save novels to localStorage whenever the novels state changes
  useEffect(() => {
    if (novels.length > 0) {
      localStorage.setItem('novels', JSON.stringify(novels));
    }
  }, [novels]);

  const handleAddBook = (book) => {
    const updatedNovels = [...novels, book];
    setNovels(updatedNovels);
    setShowUpload(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(searchTerm) ||
    novel.author.toLowerCase().includes(searchTerm) ||
    novel.genre.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <header>
        <h1>Book Waves 🌊</h1>
      </header>
      <SearchBar onSearch={handleSearch} />
      {!showUpload ? (
        <>
          <button
            className="toggle-upload-button"
            onClick={() => setShowUpload(true)}
          >
            Add New Book
          </button>
          <div className="book-list">
            {filteredNovels.map((novel, index) => (
              <BookCard
                key={index}
                novel={novel}
                onClick={() => setSelectedNovel(novel)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="upload-form">
          <h2>Upload a New Book</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newBook = {
                title: formData.get('title'),
                author: formData.get('author'),
                genre: formData.get('genre'),
                summary: formData.get('summary'),
                imageUrl: formData.get('imageUrl'),
              };
              handleAddBook(newBook);
            }}
          >
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="author" placeholder="Author" required />
            <input type="text" name="genre" placeholder="Genre" required />
            <textarea name="summary" placeholder="Summary" required />
            <input type="text" name="imageUrl" placeholder="Image URL" required />
            <button type="submit" className="submit-button">Add Book</button>
            <button
              type="button"
              className="toggle-upload-button"
              onClick={() => setShowUpload(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {selectedNovel && (
        <FullscreenBook
          novel={selectedNovel}
          onClose={() => setSelectedNovel(null)}
        />
      )}
    </div>
  );
};

export default App;
