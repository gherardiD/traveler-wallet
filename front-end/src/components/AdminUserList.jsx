/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import styles from "./AdminUserList.module.css";

export default function AdminUserList({ token }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className={styles.container}>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id} className={styles.userListItem}>
            <span className={styles.userName}>{user.firstName}</span> -
            <span className={styles.userEmail}>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
