import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notifications', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setNotifications(notifications.map(notif =>
                    notif._id === id ? { ...notif, isRead: true } : notif
                ));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div>
            <h3>Notifications</h3>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul>
                    {notifications.map(notif => (
                        <li key={notif._id} style={{ backgroundColor: notif.isRead ? 'white' : '#e6f3ff' }}>
                            {notif.message}
                            {!notif.isRead && (
                                <button onClick={() => markAsRead(notif._id)}>Mark as Read</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;