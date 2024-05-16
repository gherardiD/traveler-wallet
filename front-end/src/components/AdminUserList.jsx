import React, { useEffect, useState } from 'react'
import Axios from '../api/Axios';

export default function AdminUserList({token}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.firstName} - {user.email}
        </li>
      ))}
    </ul>
  )
}
