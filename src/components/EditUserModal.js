import React, { useState } from "react";
import { updateUser } from "../services/userService";

//This file edits user details[first and last name]

const EditUserModal = ({ user, onClose, onUpdate, token }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUser(user.id, formData, token);
      onUpdate({ ...user, ...updatedUser });
      onClose();
    } catch (err) {
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;