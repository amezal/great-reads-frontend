import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import StarRating from '../components/StarRating';

function Book() {

  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const { id } = useParams();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [userRating, setUserRating] = useState(null);

  const getBook = async () => {
    let userId = '';
    if (isAuthenticated) {
      userId = user.sub;
    }
    const res = await axios.get(`http://localhost:5000/books/${id}?user=${userId}`);
    console.log(res.data);
    return res.data;
  }

  useEffect(async () => {
    const book = await getBook();
    setBook(book);
    setUserRating(book.userRating);
    if (isAuthenticated) {
      setAccessToken(await getAccessTokenSilently());
    }
    setIsLoading(false);

  }, [isAuthenticated]);

  const addToList = async (list) => {
    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const res = await axios.post(`${serverUrl}/users/current/${list}?book=${id}`,
        {
          cover: book.covers[0],
          title: book.title,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });

      const updatedStats = res.data;
      setBook({ ...book, ...updatedStats });
    }
  }

  const updateRating = async (rating) => {
    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      await axios.post(`${serverUrl}/books/${id}/ratings?user=${user.sub}&rating=${rating}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
    }
  }

  return (
    <>
      {!isLoading &&
        <main>
          <h1>{book.title}</h1>
          {book.covers &&
            <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`} alt="" />
          }
          <button onClick={() => addToList('reading')}>{`Reading: ${book.reading}`}</button>
          <button onClick={() => addToList('read')}>{`Read: ${book.read}`}</button>
          <button onClick={() => addToList('want')}>{`Want to read: ${book.want}`}</button>
          <StarRating
            currentRating={userRating}
            updateRating={updateRating} />
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
