import React from 'react';
import { Paper, ScrollArea } from '@mantine/core';

const List = ({ children }) => {

  return (
    <Paper direction='column'
      className="list"
      radius='lg'
      shadow='xl'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[5],
      })}
    >
      <ScrollArea
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </ScrollArea>
    </Paper >
  )
}

export default List;