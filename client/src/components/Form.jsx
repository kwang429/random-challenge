import React, { useState, useEffect } from 'react';
import CatCheckbox from './CatCheckbox.jsx';
import axios from 'axios';

function Form({ categories, getChallenges }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [selectedCats, setCat] = useState({});

  const handleCatChange = function (e) {
    let cat = e.target.value;
    if (e.target.checked) {
      console.log('adding', cat);
      selectedCats[cat] = 1;
    } else {
      console.log('removing', cat);
      delete selectedCats[cat];
    }
    setCat(selectedCats);
  };

  const clearForm = function () {
    setName('');
    setLink('');
    setCat({});
  };

  // replace this function with an axios post
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!name.length || !Object.keys(selectedCats).length || !link.length) {
      alert('Please fill out the name, link, and category(s)!');
    } else {
      axios
        .post('/challenge', {
          name: name,
          categories: Object.keys(selectedCats),
          link: link,
        })
        .then(() => clearForm())
        .then(() => {
          getChallenges();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form>
      <h3 className='challengeName'>Challenge Name: </h3>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <h3 className='challengeLink'>Challenge Link: </h3>
      <input
        type='text'
        value={link}
        onChange={(e) => setLink(e.target.value)}
      ></input>

      <h3 className='challengeCat'>Challenge Category(s): </h3>
      {categories.map((cat, index) => {
        return (
          <CatCheckbox
            handleCatChange={handleCatChange}
            key={index}
            index={index}
            cat={cat}
          />
        );
      })}

      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default Form;
