import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from './BookCover';
import { Paper, Text, Image, Group, UnstyledButton, Menu } from '@mantine/core';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';

const BookItem = ({ book, deleteBook, list }) => {

  const navigate = useNavigate();

  return (
    <Paper m={8} height={52}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],
      })}
    >
      <Group direction='row' noWrap>
        <UnstyledButton onClick={() => navigate(`/books/${book._id}`)} style={{ padding: '6px', position: 'relative' }}>
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
        {
          deleteBook &&
          <Menu
            style={{ marginLeft: 'auto', marginRight: '1rem' }}
            control={
              <UnstyledButton style={{ display: 'flex', justifyContent: 'center' }}>
                <FaEllipsisV size={16} color="gray" radius="lg" />
              </UnstyledButton>
            }>

            <Menu.Item onClick={() => { deleteBook(book._id, list) }} icon={<FaTrash />}>
              Delete
            </Menu.Item>

          </Menu>
        }
      </Group>
    </Paper >
  )
}

export default BookItem;