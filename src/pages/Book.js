import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import BookCover from '../components/BookCover';
import { Container, Text, Group, Spoiler, MediaQuery, Space } from '@mantine/core';
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
          <MediaQuery query="(max-width: 768px)" styles={{ flexDirection: 'column', alignItems: 'center' }}>
            <Container style={{ display: 'flex' }}>
              <MediaQuery query="(max-width: 768px)" styles={{ alignItems: 'center' }}>
                <Group direction='column' spacing={0} mt={24}>
                  <MediaQuery query="(min-width: 768px)" styles={{ display: 'none' }}>
                    <div>
                      <Text color="gray" style={{ fontSize: '32px', textAlign: 'center' }} >{book.title}</Text>

                      <Text color="gray" size="xs" style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        By {book.authors.map(author => author.name).join(', ')}
                      </Text>
                    </div>
                  </MediaQuery>

                  <BookCover book={book} size="L" />

                  <Text mt={16} color="gray" weight={700} style={{ fontSize: '14px' }}>
                    {userRating ? 'Your rating:' : 'Rate this book:'}
                  </Text>

                  <StarRating currentRating={userRating} accessToken={accessToken} />
                  <Space h="md" />
                  <AddToListButton book={book} accessToken={accessToken} setBook={setBook} />
                </Group>
              </MediaQuery>

              <MediaQuery query="(min-width: 768px)" styles={{ borderLeft: '1px solid gray', paddingLeft: '16px', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '16px', marginTop: '70px', marginBottom: 'auto' }}>
                <Group spacing={0} direction='column' mt="lg" position='center'>
                  <MediaQuery query="(max-width: 768px)" styles={{ display: 'none' }}>
                    <div>
                      <Text color="gray" style={{ fontSize: '32px' }} >{book.title}</Text>

                      <Text color="gray" size="xs" style={{ fontStyle: 'italic' }}>
                        By {book.authors.map(author => author.name).join(', ')}
                      </Text>
                    </div>
                  </MediaQuery>

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

                  <Spoiler mt="xl" maxheight={120} showLabel="Show more" hideLabel="Hide" style={{ fontSize: '12px', maxWidth: '90vw' }}>
                    <Text color="gray" weight={400} style={{ fontSize: '14px', lineHeight: '17px', textAlign: 'justify', maxWidth: '90vw' }} >
                      {book.description}
                    </Text>
                  </Spoiler>
                </Group>
              </MediaQuery>

            </Container>
          </MediaQuery>
          <Reviews reviews={book.reviews} userRating={book.userRating} />
        </>}
    </ >
  )
}

export default Book
