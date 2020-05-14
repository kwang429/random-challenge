import React, { useEffect, useState } from 'react';
import Form from './Form.jsx';
import ChallengeList from './ChallengeList.jsx';
import RandomChallenge from './RandomChallenge.jsx';
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
    getAll();
  }, []);

  /*-- Get Challenges --*/
  const [allChallenges, setChallenges] = useState([]);

  const getAll = function () {
    axios.get('/getAll').then(({ data }) => {
      setChallenges(data);
    });
  };

  return (
    <div>
      <RandomChallenge challenges={allChallenges} />
      <Form categories={allCats} getChallenges={getAll} />
      <ChallengeList challenges={allChallenges} getChallenges={getAll} />
    </div>
  );
}

export default App;
