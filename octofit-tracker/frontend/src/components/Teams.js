import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const items = data.results || data;
        setTeams(items);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name || 'N/A'}</td>
              <td>{team.members ? team.members.length : 'N/A'}</td>
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

export default Teams;