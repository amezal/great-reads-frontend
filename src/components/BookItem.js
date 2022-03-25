import React from 'react';
import { Paper, Text, Image, AspectRatio, Group, Card } from '@mantine/core';

const BookItem = ({ book }) => {
  console.log(book);
  return (
    <Paper m={8}>
      <Group direction='row' noWrap>
        <Image
          src={`https://covers.openlibrary.org/b/id/${book.cover}-S.jpg`}
          alt="Panda"
          width={40}
          height={52}
          p={6}
          radius='sm'
        />
        <Text>{book.title}</Text>
      </Group>
    </Paper>
  )
}

export default BookItem;