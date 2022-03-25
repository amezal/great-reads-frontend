import React from 'react';
import { Group, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks'


const Lists = ({ children }) => {

  const { width, height } = useViewportSize();

  return (
    <Group position='apart' noWrap grow className="lists"
    >
      {children}
    </Group>
  )
}

export default Lists;