import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


function Home() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState(null);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // console.log(user);

  const callApi = async () => {
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = await getAccessTokenSilently()
    const res = await axios.get(`${serverUrl}/protected`, {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    setData(res.data);
  }

  return (
    <div>

      <LoginButton />
      <LogoutButton />
      <h1>HOMEPAGE WELCOME</h1>
      <Link to="books/OL25065503W">Books</Link>
      <p>{window.location.origin}</p>


      {(isAuthenticated && !isLoading) &&
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <img src={user.picture} alt="" />
        </div>
      }

      <button onClick={callApi}>Call Api</button>

      {data &&
        <h3>{data}</h3>
      }

    </div>
  )
}

export default Home
