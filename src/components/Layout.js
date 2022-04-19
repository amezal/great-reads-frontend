import React, { useState } from 'react';
import { MantineProvider, Global, AppShell, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import MyNavbar from './Navbar';

const Layout = ({ children }) => {

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  })

  const theme = useMantineTheme();

  const toggleColorScheme = (value) => (
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  )

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{
        fontFamily: 'Inter',
        colorScheme,
      }}>
        <AppShell
          fixed
          header={<MyNavbar />}
          styles={{
            main: { minHeight: '50vh', paddingTop: '64px' },
            root: { minHeight: '100vh', padding: '0', backgroundColor: 'red' }
          }}
          style={{
            backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
          }}
        >
          <Global
            styles={(theme) => ({
              fontFamily: 'Inter, Open Sans',
            })}
          />
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default Layout