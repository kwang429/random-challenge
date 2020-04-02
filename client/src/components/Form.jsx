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
    console.log(category);
  };

  return (
    <form>
      <h3 className='challengeName'>Challenge Name: </h3>
      <input type='text' onChange={e => setName(e.target.value)}></input>

      <h3 className='challengeLink'>Challenge Link: </h3>
      <input type='text' onChange={e => setLink(e.target.value)}></input>

      <h3 className='challengeCat'>Challenge Category(s): </h3>
      {categories.map((cat, index) => {
        return (
          <div key={index}>
            <input
              type='checkbox'
              name={cat.id}
              value={cat.type}
              onChange={addCategory}
            />
            <label>{cat.type}</label>
          </div>
        );
      })}

      <button
        onClick={() =>
          console.log(`You're submitting ${name}, ${category} and ${link}`)
        }
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
