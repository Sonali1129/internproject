import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: Bearer ${token} }
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err.response.data);
                alert('Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(http://localhost:5000/api/admin/users/${id}, {
                headers: { Authorization: Bearer ${token} }
            });
            setUsers(users.filter(user => user._id !== id));
            alert('User deleted successfully');
        } catch (err) {
            console.error(err.response.data);
            alert('Error deleting user');
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.userName}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
