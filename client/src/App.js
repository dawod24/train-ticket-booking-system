import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import MyBookings from './pages/MyBookings';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/bookings" element={<MyBookings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;