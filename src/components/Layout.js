import { useState } from 'react';
import { MantineProvider, AppShell, useMantineTheme } from '@mantine/core';
import MyNavbar from './Navbar';

const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <MantineProvider theme={{
      fontFamily: 'Open Sans',
      colorScheme: 'dark',
    }}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        // navbar={
        //   <Navbar
        //     p="md"
        //     hiddenBreakpoint="sm"
        //     hidden={!opened}
        //     width={{ sm: 200, lg: 400 }}
        //   >
        //     <Text>Hola</Text>
        //     <Text>Hola2</Text>
        //   </Navbar>
        // }
        padding='xl'
        header={<MyNavbar />}
      >
        {children}
      </AppShell>
    </MantineProvider>
  )
}

export default Layout