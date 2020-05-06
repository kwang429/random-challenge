import React from 'react';
import axios from 'axios';

export default function ChallengeList({ challenges }) {
  return (
    <div>
      {challenges.map((challenge, i) => {
        return <li key={i}>{challenge.name}</li>;
      })}
    </div>
  );
}
