import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchUser() {
  const [data, setData] = useState(null);

  const q = useSearchParams()[0].get('q');
  const page = useSearchParams()[0].get('page');
  const navigate = useNavigate();

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/search/users?q=${q}&page=${page}`);
    console.log(res.data);
    setData(res.data);
  }, [q, page])


  return (
    <div>
      {
        (data && data.length !== 0) ?
          <>
            {data.map(user => (
              <div key={user._id}>
                <h3>{user.name}</h3>
                <img src={user.picture} alt="" />
              </div>
            ))}
          </>
          :
          <>
            <h2>No users found</h2>
          </>
      }
    </div>
  )

}

export default SearchUser;