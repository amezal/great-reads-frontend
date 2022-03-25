import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import SearchBar from '../components/SearchBar';
import { Header, UnstyledButton, Image, Menu, Avatar, useMantineColorScheme } from '@mantine/core';
import { FaCog, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';


function Navbar() {

  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <Header></Header>
  // }

  return (
    <Header height={65} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between', padding: '0 24px' }}>
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery> */}
        <UnstyledButton onClick={() => navigate('/')}>
          <Image src="https://picsum.photos/56/56" alt="logo" radius="lg" />
        </UnstyledButton>
        <SearchBar />
        {
          isAuthenticated ?
            <Menu
              control={
                <UnstyledButton style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar src={user.picture} size={56} alt="logo" radius="lg" />
                </UnstyledButton>
              }
            >
              <Menu.Label>Application</Menu.Label>


              <Menu.Item onClick={() => toggleColorScheme()} icon={dark ? <FaSun /> : <FaMoon />}>
                {dark ? 'Light mode' : 'Dark mode'}
              </Menu.Item>

              <Menu.Item icon={<FaCog />}>
                Settings
              </Menu.Item>

              <Menu.Item
                onClick={() => logout({ returnTo: window.location.origin })}
                icon={<FaSignOutAlt />}
              >
                Logout
              </Menu.Item>
            </Menu>
            :
            <>
              <LoginButton />
            </>
        }
      </div>
    </Header>
  )
}

export default Navbar

