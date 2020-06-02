import React, { useState } from 'react';

export default function CatCheckbox({ handleCatChange, cat, index }) {
  const [checked, setChecked] = useState(false);

  function handleCheck(e) {
    setChecked(!checked);
    handleCatChange(e);
  }

  return (
    <div key={index}>
      <input
        type='checkbox'
        name={cat.id}
        value={cat.type}
        onChange={handleCheck}
        checked={checked}
      />
      <label>{cat.type}</label>
    </div>
  );
}
