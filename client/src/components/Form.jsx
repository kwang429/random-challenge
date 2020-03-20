import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [category, setCat] = useState([]);

  return (
    <div>
      <div>
        <b>Challenge Name: </b>
        <input></input>
      </div>
      <div>
        <b>Challenge Link: </b>
        <input></input>
      </div>
      <div>
        <b>Challenge Category(s): </b>
        <select>
          <option></option>
        </select>
      </div>
    </div>
  );
}

export default Form;
