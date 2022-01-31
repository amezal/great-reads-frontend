import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Book() {

  const [book, setBook] = useState({})//({ title: 'lele', excerpts: [{ text: 'lala' }] });
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/books/${id}`);
    console.log(res.data);
    return res.data;

  }

  useEffect(async () => {
    setBook(await getData());
    setIsLoading(false);

  }, []);

  return (
    <>
      {!isLoading &&
        <main>
          <h1>{book.title}</h1>
          {book.covers &&
            <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`} alt="" />
          }
          <p>{book.description}</p>
          <h2>Authors:</h2>
          <ul>
            {book.authors.map(author => (
              <li key={author.name}>{author.name}</li>
            ))}
          </ul>

        </main>}
    </>
  )
}

export default Book
