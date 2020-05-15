import React from 'react';
import axios from 'axios';

export default function ChallengeList({ challenges, getChallenges }) {
  const handleDelete = function (e) {
    const { value } = e.target;
    axios
      .put('/delete', { id: value })
      .then(() => getChallenges())
      .catch((err) => console.log(err));
  };

  const handleUpdate = function (e) {
    const { value } = e.target;
    axios
      .put('/update', { id: value })
      .then(() => getChallenges())
      .catch((err) => console.log(err));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Challenge Name</th>
          <th>Categories</th>
          <th>Link</th>
          <th>Complete</th>
          <th>Premium</th>
          <th></th>
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
              <td>
                <a href={challenge.link}>{challenge.link}</a>
              </td>
              <td>{JSON.stringify(challenge.complete)}</td>
              <td>{JSON.stringify(challenge.premium)}</td>
              <td>
                <button
                  value={challenge.id}
                  name={challenge.name}
                  onClick={handleDelete()}
                >
                  Delete
                </button>
                <button value={challenge.id} onClick={handleUpdate}>
                  Update
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
