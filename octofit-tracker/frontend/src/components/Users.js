import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const items = data.results || data;
        setUsers(items);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
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

export default Users;