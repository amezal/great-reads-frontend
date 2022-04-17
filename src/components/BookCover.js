import React from 'react';
import { Image, Paper, Text } from '@mantine/core';

const BookCover = ({ book, size }) => {

  const cover = book.cover;

  const sizes = {
    L: { width: 240, height: 380, radius: 24 },
    S: { width: 40, height: 52, radius: 6 },
    M: { width: 100, height: 130, radius: 12 },
  }

  return (
    <>
      {cover === "-1" ?
        <Paper
          direction='column'
          radius={sizes[size].radius}
          shadow='xl'
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[5],
            minHeight: sizes[size].height, minWidth: sizes[size].width,
            height: sizes[size].height, width: sizes[size].width,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
          })}
        >
          <Text style={{ fontSize: sizes[size].width / 12, textAlign: 'center' }} weight={500}>{book.title}</Text>
          {/* <Text style={{ fontSize: sizes[size].width / 16, fontStyle: 'italic' }}>By {book.author || book.authors[0].name}</Text> */}

        </Paper>
        :
        <Image
          src={`https://covers.openlibrary.org/b/id/${cover}-${size}.jpg`}
          width={sizes[size].width}
          height={sizes[size].height}
          radius={sizes[size].radius}
          withPlaceholder={true}
        />
      }
    </>
  )
}

export default BookCover;