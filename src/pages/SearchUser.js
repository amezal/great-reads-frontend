import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Group, Text, Paper, Container, Avatar } from '@mantine/core';
import axios from 'axios';

function SearchUser() {
  const [data, setData] = useState(null);

  const q = useSearchParams()[0].get('q');
  const page = useSearchParams()[0].get('page');
  const navigate = useNavigate();

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/search/users?q=${q}&page=${page}`);
    //console.log(res.data);
    setData(res.data);
  }, [q, page])


  return (
    <Container mt={24} size="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
      {(data && data.length !== 0) ?
        <>
          {data.map(user => (
            <Link key={user._id} to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
              <Paper radius={12} p={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}
                sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5], })}
              >
                {/* <BookCover book={book} size="M" /> */}
                <Avatar src={user.picture} size={52} alt="logo" radius={12} />
                <Group direction="column" align="flex-start" spacing={0} ml={24}>
                  <Text color="gray" size="xl" >
                    {user.name}
                  </Text>
                  <Group direction="row">
                    <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>Read: {user.books.read.length}</Text>
                    <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>Want to read: {user.books.want.length}</Text>
                    <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>Reading: {user.books.reading.length}</Text>
                  </Group>
                </Group>
              </Paper>
            </Link>
          ))}
        </> :
        <h1></h1>
      }
    </Container>
  )

}

export default SearchUser;