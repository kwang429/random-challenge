import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form({ categories }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [category, setCat] = useState([]);

  const addCategory = function(e) {
    let target = e.target.value.toLowerCase();
    if (!category.includes(target)) {
      setCat(category.concat(target));
    }
  };

  return (
    <div>
      <div>
        <h3>Challenge Name: </h3>
        <input type='text' onChange={e => setName(e.target.value)}></input>
      </div>
      <div>
        <h3>Challenge Link: </h3>
        <input type='text' onChange={e => setLink(e.target.value)}></input>
      </div>
      <div>
        <h3>Challenge Category(s): </h3>
        <select onChange={addCategory}>
          <option defaultValue>--Select a category--</option>
          {categories.map((cat, index) => (
            <option key={index}>{cat.type}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          onClick={() =>
            console.log(`You're submitting ${name}, ${category} and ${link}`)
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
