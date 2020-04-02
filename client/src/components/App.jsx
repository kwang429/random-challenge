import React, { useEffect, useState } from 'react';
import Form from './Form.jsx';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [allCats, setCats] = useState([]);

  const updateCategories = function() {
    axios.get('/categories').then(({ data }) => {
      setCats(allCats.concat(data));
    });
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return (
    <div>
      <Form categories={allCats} />
    </div>
  );
}

export default App;
