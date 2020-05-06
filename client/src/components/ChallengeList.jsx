import React from 'react';
import axios from 'axios';

export default function ChallengeList({ challenges }) {
  return (
    <table>
      <tr>
        <th>Challenge Name</th>
        <th>Categories</th>
        <th>Link</th>
        <th>Complete</th>
        <th>Premium</th>
      </tr>
      {challenges.map((challenge, i) => {
        return (
          <tr key={i}>
            <td>{challenge.name}</td>
            <td>{challenge.cat_id}</td>
            <td>{challenge.link}</td>
            <td>{challenge.complete}</td>
            <td>{challenge.name}</td>
          </tr>
        );
      })}
    </table>
  );
}
