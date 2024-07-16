import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ... existing imports and component structure

const onSubmit = async e => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
            navigate('/');
        } else {
            setError(data.message);
        }
    } catch (err) {
        setError('Server error');
    }
};

// ... rest of the component

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Server error');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;