import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextInput, MediaQuery, Button, Menu, Space } from '@mantine/core';
import { FaSearch, FaChevronDown } from 'react-icons/fa';


function SearchBar() {
  const [searchType, setSearchType] = useState('books');
  const [buttonText, setButtonText] = useState('Books');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${searchType}?q=${query}`);
  }

  const changeSearchType = (type) => {
    setButtonText(type);
    setSearchType(type.toLowerCase());
  }

  return (

    <form action=""
      onSubmit={search}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <TextInput
        onChange={(e) => (setQuery(e.target.value))}
        placeholder={`Search ${searchType}...`}
        icon={<FaSearch size={14} />}
        radius='xl'
        size="xs"
        ml="md"
      />
      <Menu
        mr="md"
        control={
          <Button p="xs" radius="xl" size="xs" variant="outline" style={{ display: 'flex', justifyContent: 'center' }}>
            {buttonText}
            <Space w='sm' />
            <FaChevronDown />
          </Button>
        }
      >
        <Menu.Item onClick={() => (changeSearchType('Books'))}>
          Books
        </Menu.Item>
        <Menu.Item onClick={() => (changeSearchType('Authors'))}>
          Authors
        </Menu.Item>
        <Menu.Item onClick={() => (changeSearchType('Users'))}>
          Users
        </Menu.Item>
      </Menu>
    </form>
  )
}

export default SearchBar