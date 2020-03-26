import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [category, setCat] = useState([]);

  return (
    <div>
      <div id='inputSection'>
        <h3>Challenge Name: </h3>
        <input type='text' onChange={e => setName(e.target.value)}></input>
      </div>
      <div id='inputSection'>
        <h3>Challenge Link: </h3>
        <input type='text' onChange={e => setLink(e.target.value)}></input>
      </div>
      <div id='inputSection'>
        <h3>Challenge Category(s): </h3>
        <select>
          <option defaultValue>--Select a category--</option>
        </select>
      </div>
      <div>
        <button
          onClick={() => console.log(`You're submitting ${name} and ${link}`)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
