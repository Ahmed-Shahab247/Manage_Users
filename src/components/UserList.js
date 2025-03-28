import React, { useState, useEffect } from "react";
import { fetchUsersFromAPI } from "../services/userService";
import './UserList.css'; 


//Main file to display the list of users
/* 
TODO:
1. Create a page that shows all users fetched from the API.
2. Must be able to edit the users name[first and last name]
3. Must be able to delete the user
4. Must be compatible with both desktop and mobile devices
5. Logout button is required to delete the session token redirect to loginPage

*/
const UsersList = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const newUsers = await fetchUsersFromAPI(page);
        
        if (newUsers.length === 0) {
          setHasMore(false);
        } else {
          setUsers(prev => page === 1 ? newUsers : [...prev, ...newUsers]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  const handleDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setEditingUser(null);
  };

  const loadMoreUsers = () => {
    setPage(prev => prev + 1);
  };

  return (

    <div className="users-container">
      <header className="users-header">
        <h2>Users List</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* User Grid */}
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img 
              src={user.avatar} 
              alt={`${user.first_name} ${user.last_name}`}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.first_name} {user.last_name}</h3>
              <p>ID: {user.id}</p>
            </div>
            <div className="user-actions">
              <button 
                onClick={() => setEditingUser({...user})}
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  setSelectedUser(user);
                  setShowDeleteModal(true);
                }}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="load-more-section">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : hasMore ? (
          <button 
            onClick={loadMoreUsers}
            className="load-more-btn"
          >
            Load More Users
          </button>
        ) : (
          <p className="no-more-users">All users loaded</p>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Delete {selectedUser?.first_name} {selectedUser?.last_name}?</p>
            <div className="modal-actions">
              <button 
                onClick={handleDelete}
                className="confirm-delete-btn"
              >
                Delete
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User</h3>
            <div className="form-group">
              <label>First Name:</label>
              <input
                value={editingUser.first_name}
                onChange={(e) => setEditingUser({
                  ...editingUser,
                  first_name: e.target.value
                })}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                value={editingUser.last_name}
                onChange={(e) => setEditingUser({
                  ...editingUser,
                  last_name: e.target.value
                })}
              />
            </div>
            <div className="modal-actions">
              <button 
                onClick={handleEdit}
                className="save-btn"
              >
                Save
              </button>
              <button 
                onClick={() => setEditingUser(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;