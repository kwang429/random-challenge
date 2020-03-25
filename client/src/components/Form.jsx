import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [category, setCat] = useState([]);

  return (
    <div>
      <div>
        <b>Challenge Name: </b>
        <input onChange={e => setName(e.target.value)}></input>
      </div>
      <div>
        <b>Challenge Link: </b>
        <input onChange={e => setLink(e.target.value)}></input>
      </div>
      <div>
        <b>Challenge Category(s): </b>
        <select>
          <option></option>
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
