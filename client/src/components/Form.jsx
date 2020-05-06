import React, { useState } from 'react';
import axios from 'axios';

function Form({ categories }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [selectedCats, setCat] = useState({});

  const handleCatChange = function (e) {
    let cat = e.target.value;
    if (e.target.checked) {
      selectedCats[cat] = 1;
      setCat(selectedCats);
    } else {
      delete selectedCats[cat];
      setCat(selectedCats);
    }
  };

  // replace this function with an axios post
  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post('/challenge', {
        name: name,
        categories: Object.keys(selectedCats),
        link: link,
      })
      .then(() => console.log('posted'))
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <h3 className='challengeName'>Challenge Name: </h3>
      <input type='text' onChange={(e) => setName(e.target.value)}></input>

      <h3 className='challengeLink'>Challenge Link: </h3>
      <input type='text' onChange={(e) => setLink(e.target.value)}></input>

      <h3 className='challengeCat'>Challenge Category(s): </h3>
      {categories.map((cat, index) => {
        return (
          <div key={index}>
            <input
              type='checkbox'
              name={cat.id}
              value={cat.type}
              onChange={handleCatChange}
            />
            <label>{cat.type}</label>
          </div>
        );
      })}

      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default Form;
