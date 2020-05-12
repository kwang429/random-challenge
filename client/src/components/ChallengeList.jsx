import React from 'react';
import axios from 'axios';

export default function ChallengeList({ challenges }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Challenge Name</th>
          <th>Categories</th>
          <th>Link</th>
          <th>Complete</th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map((challenge, i) => {
          return (
            <tr key={i}>
              <td>{challenge.name}</td>
              <td>
                {challenge.cat_types.map((catStr, i) => (
                  <span key={i} className='cat_badge'>
                    {catStr}
                  </span>
                ))}
              </td>
              <td>{challenge.link}</td>
              <td>{JSON.stringify(challenge.complete)}</td>
              <td>{JSON.stringify(challenge.premium)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
