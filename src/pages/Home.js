import React, { useEffect, useState } from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import DraggableLists from '../components/DraggableLists';


function Home() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


  const [data, setData] = useState(null);

  useEffect(async () => {

    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(`${serverUrl}/users/current`, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      console.log(res.data);

      setData(res.data);
    }

  }, [isAuthenticated])


  return (
    <div>

      {(isAuthenticated && data) &&
        <div>
          <img src={user.picture} alt="" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <DraggableLists userBooks={data.books}> </DraggableLists>
        </div>
      }

    </div>
  )
}

export default Home
