import React from 'react';
import { Group, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks'


const Lists = ({ children }) => {

  const { width, height } = useViewportSize();

  return (
    <ScrollArea type='hover'
      mx={16}
      my={12}
      style={{
        width: '95vw', height: '75vh', position: 'relative'
      }}>
      <Group position='apart' noWrap grow className="lists"
        style={{
          width: '100%', height: '100%',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </Group>
    </ScrollArea>
    // <div
    //   style={{
    //     overflowX: 'scroll', width: '90vw', height: '70vh',
    //     display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    //   }}
    // >
    //   {children}
    // </div>
  )
}

export default Lists;