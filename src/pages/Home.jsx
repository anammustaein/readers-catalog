import React from 'react';
import BookList from '../components/BookList';
import SearchForm from '../components/SearchForm';

function Home() {
  return (
    <div>
        <SearchForm />
        <BookList />
    </div>
  )
};

export default Home;