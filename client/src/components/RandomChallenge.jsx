import React, { useState } from 'react';

export default function RandomChallenge({ challenges }) {
  const [randomChallenge, setRandom] = useState({});

  let pickRandom = function () {
    let randomIndex = Math.floor(Math.random() * challenges.length);
    setRandom((obj) => (obj = challenges[randomIndex]));
  };

  const RenderChallenge = function () {
    if (randomChallenge.name) {
      return <div>{randomChallenge.name}</div>;
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <button onClick={pickRandom}>Pick a random challenge for me!</button>
      <RenderChallenge />
    </div>
  );
}
