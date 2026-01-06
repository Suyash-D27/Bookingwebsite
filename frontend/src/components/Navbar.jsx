import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Simple check for token updates (in a real app, use Context)
    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you might store it later, currently cookies are used primarily but let's check both or just rely on cookie presence logic if possible, or simpler: just check if we have a user object in local storage if we saved it?
        // The previous login code didn't save to localStorage, it just expected the cookie.
        // Let's assume for now we might not have easy access to auth state without a context.
        // For this iteration, I'll add a placeholder or check if a "user" object was saved to localStorage (common pattern).
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // NOTE: In the Login.jsx, we need to make sure we modify it to save user to localStorage for this to work, 
    // or use a Context. For now, I will modify Login.jsx in the next steps to ensure it saves user info.

    const handleLogout = () => {
        // Clear everything
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Clear cookie if possible (often requires backend endpoint which clears cookie)
        // For now just redirect
        setUser(null);
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 style={{
                    margin: 0,
                    background: 'var(--accent-gradient)',
                    WebKitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    SikkimTourism
                </h2>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/hotels" className="nav-link" style={navLinkStyle}>Hotels</Link>
                <Link to="/monasteries" className="nav-link" style={navLinkStyle}>Monasteries</Link>
                <Link to="/events" className="nav-link" style={navLinkStyle}>Events</Link>

                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/profile" style={navLinkStyle}>Profile</Link>
                        <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', textDecoration: 'none' }}>
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const navLinkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s'
};

export default Navbar;
