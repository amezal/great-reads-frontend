import React, { useState } from 'react';
import { MantineProvider, AppShell, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import MyNavbar from './Navbar';

const Layout = ({ children }) => {

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  })

  const theme = useMantineTheme();

  console.log(theme);

  const toggleColorScheme = (value) => (
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  )

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{
        fontFamily: 'Open Sans',
        colorScheme,
      }}>
        <AppShell
          fixed
          padding='xl'
          header={<MyNavbar />}
          styles={{
            main: { minHeight: '50vh', paddingTop: '12px', paddingBottom: '0' },
            root: { height: '100vh' }
          }}
          style={{
            backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
          }}
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default Layout