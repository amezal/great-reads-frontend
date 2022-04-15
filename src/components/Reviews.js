import React from 'react';
import { Container, Text, Group, Spoiler } from '@mantine/core';

const Reviews = ({ reviews }) => {
  return (
    <Container mt={64}>
      <Text color="gray" style={{ fontSize: '32px' }} >{reviews.length} Reviews</Text>
    </Container>
  )
}

export default Reviews