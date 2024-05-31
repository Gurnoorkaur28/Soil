// Some concept of this code/design were taken from RMIT - COSC2758 Wk10 Lec Code
import { useState, useEffect } from "react";
import { blockUnblockUser, fetchUsers } from "../data/repository";
import { Button } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState(null);

  // Fetch users and sets them in state
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await fetchUsers();
    setUsers(users);
  };

  // Block and unblock users
  const handleBlock = async (user) => {
    let id;
    if (user.is_blocked === false) {
      id = await blockUnblockUser(user.id, true);
    } else {
      id = await blockUnblockUser(user.id, false);
    }

    // Reload data if change is made in db
    if (id) await getUsers();
  };

  if (users == null) return null;
  return (
    <div>
      <h1 className="text-start display-4">Users</h1>
      <table className="table table-hover">
        {/* Head */}
        <thead>
          <tr className="table-primary">
            <th>ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Join Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {/* Map Users */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.full_name}</td>
              <td>{user.join_date}</td>
              <td>
                {user.is_blocked ? (
                  <p className="blockedStatus">Blocked</p>
                ) : (
                  <p className="unblockedStatus">Good</p>
                )}
              </td>
              {/* Block/unBock */}
              <td>
                {user.is_blocked ? (
                  <Button
                    variant="outline-success w-50"
                    onClick={() => handleBlock(user)}
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger w-50"
                    onClick={() => handleBlock(user)}
                  >
                    Block
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users;
