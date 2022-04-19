import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { Group, Text, Paper, Container, Avatar, Image } from '@mantine/core';
import axios from 'axios';

const SearchAuthor = () => {
  const [data, setData] = useState(null);

  const q = useSearchParams()[0].get('q');
  const page = useSearchParams()[0].get('page');

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/search/authors?q=${q}&page=${page}`);
    //console.log(res.data);
    setData(res.data);
  }, [q, page])

  return (
    <Container mt={12} size="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
      {(data && data.length !== 0) ?
        <>
          {data.map(author => (
            <Link key={author.key} to={`/authors/${author.key}`} style={{ textDecoration: 'none' }}>
              <Paper radius={12} p={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}
                sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5], })}
              >
                <div>
                  <Avatar src={null} size={52} alt="logo" radius={12} style={{ position: 'absolute' }} />
                  <Image src={author.picture} alt={author.name} width={52} height={52} radius={12} />
                </div>
                <Group direction="column" align="flex-start" spacing={0} ml={24}>
                  <Text color="gray" size="xl" >
                    {author.name}
                  </Text>
                  <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>{author.works} publications</Text>

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

export default SearchAuthor