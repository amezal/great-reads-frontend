import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Group, Avatar, Text } from '@mantine/core';
import List from '../components/List';
import Lists from '../components/Lists';
import BookItem from '../components/BookItem';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



function User() {

  const [data, setData] = useState(null);
  const { id } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(async () => {

    if (user) {
      if (user.sub.includes(id)) {
        navigate('/');
        return;
      }
    }

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/users/${id}`);
    //console.log(res.data);
    setData(res.data);
  }, [])

  const lists = {
    read: 'Read',
    want: 'Want to read',
    reading: 'Reading',
  }
  //console.log(data);

  return (
    <Paper
      mt={12}
      sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3] })}
    >

      {data &&
        <>
          <Group mb={12} ml={24}>
            <Avatar src={data.picture} alt={data.name} size={40} radius='md' />
            <Text weight={400}>{data.name}’s lists</Text>
          </Group>
          <Lists>
            {Object.keys(lists).map((list) => (
              <List key={list} title={lists[list]}>
                {data.books[list].map(book => (
                  <BookItem book={book} key={book._id} />
                ))}
              </List>
            ))}
          </Lists>
        </>
      }

    </Paper>
  )
}

export default User;
