// client/src/components/SuperAdminDashboard.js
import React, { useState, useEffect } from 'react';

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
            const updatedUser = await response.json();
            setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2>Super Admin Dashboard</h2>
            <h3>User Management</h3>
            {users.map((user) => (
                <div key={user._id} style={styles.userCard}>
                    <h4>{user.username}</h4>
                    <p>Email: {user.email}</p>
                    <p>Current Role: {user.role}</p>
                    <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        style={styles.select}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    userCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
    },
    select: {
        padding: '5px',
        fontSize: '16px',
    },
};

export default SuperAdminDashboard;