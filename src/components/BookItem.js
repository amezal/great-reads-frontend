import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from './BookCover';
import { Paper, Text, Image, Group, UnstyledButton } from '@mantine/core';

const BookItem = ({ book }) => {

  const navigate = useNavigate();

  return (
    <Paper m={8} height={52}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],
      })}
    >
      <Group direction='row' noWrap>
        <UnstyledButton onClick={() => navigate(`/books/${book._id}`)} style={{ padding: '6px' }}>
          {/* <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover}-S.jpg`}
            alt={book.title}
            width={40}
            height={52}
            radius='sm'
            style={{ padding: '6px' }}
          /> */}
          <BookCover book={book} size="S" />
        </UnstyledButton>
        <Text>{book.title}</Text>
      </Group>
    </Paper>
  )
}

export default BookItem;