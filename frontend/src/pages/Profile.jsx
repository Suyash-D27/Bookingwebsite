import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user from local storage or context (simulated here based on Navbar logic)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem', color: 'var(--accent-primary)', marginRight: '1.5rem'
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                            <span style={{
                                display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.75rem',
                                background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)',
                                borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold'
                            }}>
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        My Bookings
                    </h3>

                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                        No bookings found yet.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
