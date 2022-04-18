import React from 'react';
import { Paper, Title } from '@mantine/core';

const List = ({ children, title }) => {

  return (
    <Paper
      direction='column'
      className="list"
      radius='lg'
      shadow='xl'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5],
        width: '30vw',
        minWidth: '320px',
      })}
    >
      <Title order={2} mx='lg' my='xs'
        style={{ position: 'sticky', fontWeight: '400' }}>
        {title}
      </Title>
      {children}
    </Paper >
  )
}

export default List;