import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextInput, NativeSelect } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';


function SearchBar() {
  const [searchType, setSearchType] = useState('books');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${searchType}?q=${query}`);
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
      />
      <NativeSelect
        onChange={e => {
          setSearchType(e.target.value.toLowerCase());
        }}
        data={['Books', 'Users', 'Authors']}
        radius='xl'
      />
    </form>
  )
}

export default SearchBar