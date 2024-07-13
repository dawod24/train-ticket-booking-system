import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Train Ticket Booking System</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search Trains</a></li>
                    <li><a href="/bookings">My Bookings</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;