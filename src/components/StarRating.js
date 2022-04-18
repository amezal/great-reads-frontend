import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './StarRating.css';

function StarRating({ currentRating, accessToken, setBook }) {
  // const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(null);
  const { id } = useParams();
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  // useEffect(() => {
  //   setRating(currentRating);
  // }, [isAuthenticated])

  const ratingHandler = (newRating) => {
    setBook(book => ({
      ...book,
      userRating: newRating
    }));
    updateRating(newRating);
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
    else {
      loginWithPopup();
    }
  }

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => ratingHandler(ratingValue)}
            />
            <FaStar
              className="star"
              size="35"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              color={ratingValue <= (hover || currentRating) ? "#ffc105" : "#949598"}
            ></FaStar>
          </label>
        )
      })}
    </div>
  )
}

export default StarRating;