import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import BookCover from '../components/BookCover';
import { Container, Text, Group, Spoiler, MediaQuery, Space, Avatar } from '@mantine/core';

function Author() {
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const { id } = useParams();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const getAuthor = async () => {
    const res = await axios.get(`http://localhost:5000/authors/${id}`);
    console.log(res.data);
    return res.data;

  }

  useEffect(async () => {

    const author = await getAuthor();
    setAuthor((oldAuthor) => {
      return { ...oldAuthor, ...author }
    });

    if (isAuthenticated) {
      setAccessToken(await getAccessTokenSilently());
    }

    setIsLoading(false);



  }, []);


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
                      <Text color="gray" style={{ fontSize: '32px', textAlign: 'center' }} >{author.name}</Text>

                      <Text color="gray" size="xs" style={{ fontStyle: 'italic', textAlign: 'center' }}>
                        {author.works} publications
                      </Text>
                    </div>
                  </MediaQuery>

                  <Avatar mt={24} radius="lg" size={300} src={`https://covers.openlibrary.org/a/id/${author.photo}-M.jpg`} />
                </Group>
              </MediaQuery>

              <MediaQuery query="(min-width: 768px)" styles={{ borderLeft: '1px solid gray', paddingLeft: '16px', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '16px', marginTop: '70px', marginBottom: 'auto' }}>
                <Group spacing={0} direction='column' mt="lg" position='center'>
                  <MediaQuery query="(max-width: 768px)" styles={{ display: 'none' }}>
                    <div>
                      <Text color="gray" style={{ fontSize: '32px', textAlign: 'center' }} >{author.name}</Text>

                      <Text color="gray" size="xs" style={{ fontStyle: 'italic', textAlign: 'flex-start' }}>
                        {author.works} publications
                      </Text>
                    </div>
                  </MediaQuery>

                  <Spoiler mt="xl" maxheight={120} showLabel="Show more" hideLabel="Hide" style={{ fontSize: '12px', maxWidth: '90vw' }}>
                    <Text color="gray" weight={400} style={{ fontSize: '14px', lineHeight: '17px', textAlign: 'justify', maxWidth: '90vw' }} >
                      {author.bio}
                    </Text>
                  </Spoiler>
                </Group>
              </MediaQuery>

            </Container>
          </MediaQuery>
          {/* <Reviews book={book} setBook={setBook} /> */}
        </>}
    </ >
  )
}

export default Author
