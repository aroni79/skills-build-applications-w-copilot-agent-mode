import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const items = data.results || data;
        setLeaderboard(items);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.id || index}>
              <td>{index + 1}</td>
              <td>{entry.user || entry.username || 'N/A'}</td>
              <td>{entry.score || 'N/A'}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">View</button>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;