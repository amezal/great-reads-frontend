import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function User() {

  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/users/${id}`);
    console.log(res.data);
    setData(res.data);
  }, [])

  return (
    <div>
      HolA
    </div>
  )
}

export default User;
