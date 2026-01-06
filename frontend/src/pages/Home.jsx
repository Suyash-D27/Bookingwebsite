import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Experience Tranquility
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Discover and book the most serene monasteries and spiritual retreats around the world.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    {user ? (
                        <Link to="/hotels" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Hotels</Link>
                    ) : (
                        <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
                    )}
                    <button className="glass-panel" style={{ padding: '0.75rem 1.5rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '600', background: 'transparent' }}>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
