// client/src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <HeaderContainer>
            <h1>Train Ticket Booking System</h1>
            <nav>
                <NavList>
                    <li><NavLink to="/">Home</NavLink></li>
                    {user ? (
                        <>
                            <li><NavLink to="/dashboard">My Dashboard</NavLink></li>
                            {(user.role === 'admin' || user.role === 'super_admin') && (
                                <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
                            )}
                            {user.role === 'super_admin' && (
                                <li><NavLink to="/super-admin">Super Admin Dashboard</NavLink></li>
                            )}
                            <li><LogoutButton onClick={handleLogout}>Logout</LogoutButton></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </>
                    )}
                </NavList>
            </nav>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    background-color: #4a90e2;
    color: white;
    padding: 1rem;
    text-align: center;
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 0 1rem;
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
`;

export default Header;