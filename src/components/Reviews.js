import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Container, Text, Group, Popover, Textarea, Avatar, Button } from '@mantine/core';
import { FaStar } from 'react-icons/fa';

const Reviews = ({ book, setBook }) => {

  const { isAuthenticated, user, accessToken } = useAuth0();
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {

    const userReview = book.reviews.find(review => user.sub.includes(review._id));
    // console.log(userReview);
    if (userReview) {
      setValue(book.reviews.find(review => user.sub.includes(review._id)).content)
    }

  }, [book])

  const submit = async () => {

    if (!book.userRating) {
      setOpened(true);
      return;
    }

    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const userId = user.sub.split('|')[1];

      const newReviews = [...book.reviews].filter(review => review._id !== userId);
      newReviews.unshift({
        _id: userId,
        name: user.name,
        picture: user.picture,
        rating: book.userRating,
        content: value
      })
      setBook({ ...book, reviews: newReviews })
      //console.log(book.userRating);

      await axios.post(`${serverUrl}/books/${id}/reviews?user=${user.sub}`,
        {
          rating: book.userRating,
          content: value,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
    }
  }

  const cancel = () => {
    setValue('');
  }

  return (
    <Container mt={64} mb={80}>
      <Text color="gray" style={{ fontSize: '24px' }} >{book.reviews.length} Reviews</Text>
      {
        user &&
        <Group align="flex-start" position="left" noWrap mt={24}>
          <Avatar src={user.picture} size={40} alt="logo" radius={12} />
          <Group style={{ width: '90%' }} direction="column" align="flex-end">
            <Textarea
              style={{ width: '100%' }}
              placeholder="Write a review..."
              minRows={8}
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <Group position="right">
              <Button onClick={cancel} variant="subtle">Cancel</Button>
              <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                target={
                  <Button onClick={submit} variant="gradient">Submit</Button>
                }
                width={260}
                position="bottom"
              >
                <div style={{ display: 'flex' }}>
                  <FaStar size={30} color="#ffc105" />
                  <Text ml={12} size="sm" color="gray">You need to rate this book before reviewing!</Text>
                </div>
              </Popover>
            </Group>
          </Group>
        </Group>

      }
      {
        book.reviews.length !== 0 &&
        <Group spacing={32} mt={32} direction="column">
          {
            book.reviews.map(review => (
              <Group key={review._id} align="flex-start" noWrap>
                <Link to={`/users/${review._id}`}>
                  <Avatar src={review.picture} size={40} alt="logo" radius={12} />
                </Link>
                <Group style={{ width: '90%' }} direction="column" align="flex-start" spacing={8}>
                  <Group direction="row" spacing={2} >
                    <Link to={`/users/${review._id}`}>
                      <Text color="gray" weight={700} mr={8}>
                        {review.name}
                      </Text>
                    </Link>
                    {
                      [...Array(5)].map((star, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={review.rating > i ? "#ffc105" : "#949598"}
                        />
                      ))
                    }
                  </Group>
                  <Text color="gray" weight={400} style={{ width: '100%', fontSize: "14px", whiteSpace: 'pre-line', lineHeight: '17px' }}>
                    {review.content}
                  </Text>
                </Group>
              </Group>
            ))
          }
        </Group>
      }
    </Container>
  )
}

export default Reviews