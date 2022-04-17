import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Text, Pagination, Group, Paper } from '@mantine/core';
import BookCover from './BookCover';
import axios from 'axios';

const AuthorBooks = ({ author }) => {

  const [activePage, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const { id: authorId } = useParams();

  useEffect(() => {
    getBooks(activePage);
  }, [])

  const getBooks = async (page) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const { data: newBooks } = await axios.get(`${url}/authors/${authorId}/books?page=${page}`);
    setBooks(newBooks.entries);
  }

  const changePage = async (page) => {
    setPage(page);
    getBooks(page);
  }

  const shortenTitle = (str) => {
    console.log(str.length)
    if (str.length >= 40) {
      return str.slice(0, 40) + '...';
    } else {
      return str;
    }
  }

  return (
    <Container mt={64} mb={80} >
      <Text color="gray" style={{ fontSize: '24px' }} >{author.works} books by {author.name}:</Text>
      <Pagination page={activePage} onChange={changePage} total={Math.ceil(author.works / 15)}
        style={{ justifyContent: 'center' }} my="xl" />
      {
        books.length !== 0 &&
        <Group direction="row" align="center" position="apart">
          {
            books.map(book => (
              <Link key={book.key.split('/')[2]} to={`/books/${book.key.split('/')[2]}`}
                style={{ textDecoration: 'none' }}
              >
                <Paper radius={12} p={12}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px', height: '240px' }}
                  sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[5], })}
                >
                  <BookCover book={book} size="M" />
                  <Text mt="1rem" size="sm" align="center" color="gray" weight={600}>{shortenTitle(book.title)}</Text>
                </Paper>
              </Link>
            ))
          }
        </Group>
      }
    </Container>
  )
}

export default AuthorBooks;