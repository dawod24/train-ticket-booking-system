import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Welcome to Train Ticket Booking</h2>
                <SearchForm />
            </main>
        </div>
    );
};

export default HomePage;