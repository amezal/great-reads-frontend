import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Container, Text, Group, Spoiler, Textarea, Avatar, Button } from '@mantine/core';

const Reviews = ({ reviews, userRating }) => {

  const { isAuthenticated, user, accessToken } = useAuth0();
  const { id } = useParams();
  const [value, setValue] = useState('');

  const submit = async () => {

    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const userId = user.sub;

      await axios.post(`${serverUrl}/books/${id}/reviews?user=${userId}`,
        {
          rating: userRating,
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
    <Container mt={64}>
      <Text color="gray" style={{ fontSize: '24px' }} >{reviews.length} Reviews</Text>
      {
        user &&
        <Group align="flex-start" position="left" noWrap>
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
              <Button onClick={submit} variant="gradient">Submit</Button>
            </Group>
          </Group>
        </Group>

      }
    </Container>
  )
}

export default Reviews