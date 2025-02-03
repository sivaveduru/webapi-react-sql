import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showSearch, setShowSearch] = useState(false); // State for toggling search and form

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
      setFormData({ name: "", email: "", password: "", role: "" });
      setSuccessMessage("User added successfully!");
    } catch (err) {
      setError("Error adding user.");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:7242/api/User/${editingUserId}`,
        {
          id: editingUserId,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );
      setUsers(
        users.map((user) => (user.id === editingUserId ? response.data : user))
      );
      setEditingUserId(null);
      setFormData({ name: "", email: "", password: "", role: "" });
      setSuccessMessage("User updated successfully!");
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
        setSuccessMessage("User deleted successfully!");
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
      password: user.password,
      role: user.role || "",
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", password: "", role: "" });
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  // Filter users based on search term (name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">User List</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* Button to toggle between search input and add user form */}
      <button
        className="btn btn-info mb-4"
        onClick={() => setShowSearch(!showSearch)}
      >
        {showSearch ? "Show Add User Form" : "Show Search"}
      </button>

      {/* Conditionally render the search input or the form */}
      {showSearch ? (
        <div className="mb-4 d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : (
        <form
          onSubmit={editingUserId ? handleUpdateUser : handleAddUser}
          className="bg-light p-4 rounded shadow-sm"
        >
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
              required={!editingUserId}
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

          <button type="submit" className="btn btn-primary w-100">
            {editingUserId ? "Update User" : "Add User"}
          </button>
          {editingUserId && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      <table className="table mt-4 table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
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

      {/* Modal for Confirm Delete */}
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
