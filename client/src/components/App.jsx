import React, { useEffect, useState } from 'react';
import Form from './Form.jsx';
import ChallengeList from './ChallengeList.jsx';
import axios from 'axios';

function App() {
  /*-- Get Categories --*/
  const [allCats, setCats] = useState([]);

  const updateCategories = function () {
    axios.get('/categories').then(({ data }) => {
      setCats(allCats.concat(data));
    });
  };

  useEffect(() => {
    updateCategories();
  }, []);

  /*-- Get Challenges --*/
  const [allChallenges, setChallenges] = useState([]);

  const getAll = function () {
    axios.get('/getAll').then(({ data }) => {
      setChallenges(data);
    });
  };

  useEffect(() => {
    getAll();
  });

  return (
    <div>
      <Form categories={allCats} />
      <ChallengeList challenges={allChallenges} />
    </div>
  );
}

export default App;
