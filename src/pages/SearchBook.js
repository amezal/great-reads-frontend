import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import BookCover from '../components/BookCover';
import { Group, Text, Paper, Container } from '@mantine/core';
import axios from 'axios';

function SearchBook() {
  const [data, setData] = useState(null);

  const q = useSearchParams()[0].get('q');
  const page = useSearchParams()[0].get('page');
  const navigate = useNavigate();

  useEffect(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await axios.get(`${serverUrl}/search/books?q=${q}&page=${page}`);
    //console.log(res.data);
    setData(res.data);
  }, [q, page])

  return (
    <Container mt={24} size="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
      {
        data &&
        data.docs.map(book => (
          <Link key={book.key} to={`/books/${book.key}`} style={{ textDecoration: 'none' }}>
            <Paper radius={12} p={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}
              sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5], })}
            >
              <BookCover book={book} size="M" />
              <Group direction="column" align="flex-start" spacing={0} ml={24}>
                <Text color="gray" size="xl" >
                  {book.title}
                </Text>
                <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>
                  {book.author_name ? book.author_name[0] : 'Anonymous'}
                </Text>
              </Group>
            </Paper>
          </Link>
        ))
      }
    </Container >
  )
}

export default SearchBook