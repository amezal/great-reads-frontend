import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import User from './pages/User';
import Author from './pages/Author';
import SearchBook from './pages/SearchBook';
import SearchUser from './pages/SearchUser';
import SearchAuthor from './pages/SearchAuthor';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import './App.css';


function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/search/books" element={<SearchBook />} />
          <Route path="/search/users" element={<SearchUser />} />
          <Route path="/search/authors" element={<SearchAuthor />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App;
