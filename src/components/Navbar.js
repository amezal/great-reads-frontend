import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import SearchBar from '../components/SearchBar';
import { Header, UnstyledButton, Image, Menu, Avatar, useMantineColorScheme } from '@mantine/core';
import { FaCog, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';


function Navbar() {

  const { isAuthenticated, logout, user } = useAuth0();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const navigate = useNavigate();

  return (
    <Header height={65} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between', padding: '0 24px' }}>
        <UnstyledButton onClick={() => navigate('/')}>
          <Image src="https://picsum.photos/52/52" alt="logo" radius="lg" />
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

