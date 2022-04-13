import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Text, Image, Group, UnstyledButton } from '@mantine/core';

const BookItem = ({ book }) => {

  const navigate = useNavigate();

  return (
    <Paper m={8} height={52}>
      <Group direction='row' noWrap>
        <UnstyledButton onClick={() => navigate(`/books/${book._id}`)}>
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover}-S.jpg`}
            alt="Panda"
            width={40}
            height={52}
            radius='sm'
            style={{ padding: '6px' }}
          />
        </UnstyledButton>
        <Text>{book.title}</Text>
      </Group>
    </Paper>
  )
}

export default BookItem;