import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import BookCover from '../components/BookCover';
import { Container, Text, Group, Spoiler } from '@mantine/core';
import AddToListButton from '../components/AddToListButton';

function Book() {

  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const { id } = useParams();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [userRating, setUserRating] = useState(null);

  const getBook = async () => {
    let userId = '';
    if (isAuthenticated) {
      userId = user.sub;
    }
    const res = await axios.get(`http://localhost:5000/books/${id}?user=${userId}`);
    console.log(res.data);
    return res.data;
  }

  useEffect(async () => {

    const book = await getBook();
    setBook(book);

    if (isAuthenticated) {
      setUserRating(book.userRating || 0);
      setAccessToken(await getAccessTokenSilently());
    }
    setIsLoading(false);

  }, [isAuthenticated, user]);


  return (
    <>
      {!isLoading &&
        <>
          <Container style={{ display: 'flex', flexDirection: 'row' }}>

            <Group direction='column' spacing={0}>

              <BookCover book={book} size="L" />

              <Text mt={16} color="gray" weight={700} style={{ fontSize: '14px' }}>
                {userRating ? 'Your rating:' : 'Rate this book:'}
              </Text>

              <StarRating currentRating={userRating} accessToken={accessToken} />


              <AddToListButton book={book} accessToken={accessToken} setBook={setBook} />
            </Group>

            <Group spacing={0} direction='column' ml={16} mt="70px" mb="auto" style={{ borderLeft: '1px solid gray', paddingLeft: '16px', justifyContent: 'flex-start' }}>
              <Text color="gray" style={{ fontSize: '32px' }} >{book.title}</Text>

              <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>
                By {book.authors.map(author => author.name).join(', ')}
              </Text>

              <Group mt="md" spacing='xl'>
                <Text color="gray" size="xs" weight={700}>
                  {`Read: ${book.read}`}
                </Text>
                <Text color="gray" size="xs" weight={700}>
                  {`Want to read: ${book.want}`}
                </Text>
                <Text color="gray" size="xs" weight={700}>
                  {`Reading: ${book.reading}`}
                </Text>
              </Group>
              <Text color="gray" size="xs" weight={700}>
                {`Rating: ${book.rating || 0}`}
              </Text>

              <Spoiler mt="xl" maxheight={120} showLabel="Show more" hideLabel="Hide" style={{ fontSize: '12px' }}>
                <Text color="gray" weight={400} style={{ fontSize: '14px', lineHeight: '17px', textAlign: 'justify' }} >
                  {book.description}
                </Text>
              </Spoiler>
            </Group>
          </Container>
          <Reviews reviews={book.reviews} />
        </>}
    </ >
  )
}

export default Book
