import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7242/api/User");
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7242/api/User",
        formData
      );
      setUsers([...users, response.data]);
      setFormData({ name: "", email: "", role: "", password: "" });
    } catch (err) {
      setError("Error adding user.");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:7242/api/User/${editingUserId}`,
        formData
      );
      setUsers(
        users.map((user) => (user.id === editingUserId ? response.data : user))
      );
      setEditingUserId(null);
      setFormData({ name: "", email: "", role: "", password: "" });
    } catch (err) {
      setError("Error updating user.");
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios.delete(
          `https://localhost:7242/api/User/${userToDelete.id}`
        );
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setShowModal(false);
        setUserToDelete(null);
      } catch (err) {
        setError("Error deleting user.");
      }
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password || "",
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "", password: "" });
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true); // Show the modal when delete is clicked
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User List</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={editingUserId ? handleUpdateUser : handleAddUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="dealer">Dealer</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={editingUserId === null} // Password required only when adding a new user
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingUserId ? "Update User" : "Add User"}
        </button>
        {editingUserId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={cancelEditing}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEditing(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => confirmDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this user?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteUser}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
