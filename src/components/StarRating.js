import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css';

function StarRating({ updateRating, currentRating }) {
  const [rating, setRating] = useState(currentRating || null);
  const [hover, setHover] = useState(null);

  const ratingHandler = (newRating) => {
    setRating(newRating);
    updateRating(newRating);
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
              color={ratingValue <= (hover || rating) ? "ffc105" : "#e4e5e9"}
            ></FaStar>
          </label>
        )
      })}
    </div>
  )
}

export default StarRating