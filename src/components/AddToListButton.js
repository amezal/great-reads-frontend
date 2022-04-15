import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Button, Menu, Space } from '@mantine/core';
import { FaChevronDown } from 'react-icons/fa';

const AddToListButton = ({ book, accessToken, setBook }) => {
  const { id } = useParams();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [buttonText, setButtonText] = useState('Add To List');

  useEffect(() => {
    switch (book.isInList) {
      case 'read':
        setButtonText('Read');
        break;
      case 'want':
        setButtonText('Want to read');
        break;
      case 'reading':
        setButtonText('Reading');
        break;
      default:
        break;
    }
  }, [book])

  const addToList = async (list) => {
    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      setBook({ ...book, isInList: list, [list]: book[list] + 1, [book.isInList]: book[book.isInList] - 1 });
      await axios.post(`${serverUrl}/users/current/${list}?book=${id}`,
        {
          cover: book.covers ? book.covers[0] : '-1',
          title: book.title,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
    } else {
      loginWithPopup();
    }
  }

  return (
    <Menu
      control={
        <Button variant='gradient' style={{ display: 'flex', justifyContent: 'center' }}>
          {buttonText}
          <Space w='sm' />
          <FaChevronDown />
        </Button>
      }
    >

      <Menu.Item onClick={() => (addToList('read'))}>
        Read
      </Menu.Item>
      <Menu.Item onClick={() => (addToList('want'))}>
        Want to read
      </Menu.Item>
      <Menu.Item onClick={() => (addToList('reading'))}>
        Reading
      </Menu.Item>
    </Menu>
  )
}

export default AddToListButton;
