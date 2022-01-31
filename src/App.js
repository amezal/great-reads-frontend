import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import User from './pages/User';
import Author from './pages/Author';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/authors/:id" element={<Author />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
