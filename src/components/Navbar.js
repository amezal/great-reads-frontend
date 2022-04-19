import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import SearchBar from '../components/SearchBar';
import { Header, UnstyledButton, Image, Menu, Avatar, useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { FaCog, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../logo.png';

function Navbar() {

  const { isAuthenticated, logout, user } = useAuth0();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const navigate = useNavigate();

  return (
    <Header height={65} py="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between', padding: '0 12px' }}>
        <UnstyledButton onClick={() => navigate('/')}>
          <Image src={logo} width={36} alt="logo" />
          {/* <img src="/src/logo.png" alt="logo" width={52} height={52} /> */}
        </UnstyledButton>
        <SearchBar />
        {
          isAuthenticated ?
            <Menu
              control={
                <UnstyledButton style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar src={user.picture} size={52} alt="logo" radius="lg" />
                </UnstyledButton>
              }
            >
              <Menu.Label>Application</Menu.Label>


              <Menu.Item onClick={() => toggleColorScheme()} icon={dark ? <FaSun /> : <FaMoon />}>
                {dark ? 'Light mode' : 'Dark mode'}
              </Menu.Item>
              {/* 
              <Menu.Item icon={<FaCog />}>
                Settings
              </Menu.Item> */}

              <Menu.Item
                onClick={() => logout({ returnTo: window.location.origin })}
                icon={<FaSignOutAlt />}
              >
                Logout
              </Menu.Item>
            </Menu>
            :
            <>
              <Group noWrap spacing={8}>
                <ActionIcon variant="outline" size={36} onClick={() => toggleColorScheme()} >
                  {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
                </ActionIcon>
                <LoginButton />
              </Group>
            </>
        }
      </div>
    </Header>
  )
}

export default Navbar

