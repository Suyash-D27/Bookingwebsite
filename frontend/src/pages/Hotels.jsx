import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                // In a real scenario we'd call the API. 
                // Since I can't guarantee data seeding, I'll handle empty states gracefully.
                const response = await api.get('/hotels');
                setHotels(response.data.data || []);
            } catch (err) {
                console.error("Failed to fetch hotels:", err);
                // Fallback / Mock data for demonstration if API fails or returns separate structure
                // For now, let's just show error or empty
                setError("Could not load hotels at this time.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
                    Discover Luxury Stays
                </h1>

                {loading ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>Loading hotels...</div>
                ) : error ? (
                    <div style={{ color: '#fca5a5', textAlign: 'center', marginTop: '4rem' }}>{error}</div>
                ) : hotels.length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>
                        No hotels found. <br /> <small>Populate your database to see listings here.</small>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {hotels.map(hotel => (
                            <div key={hotel._id} className="glass-panel" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '200px', background: 'var(--bg-secondary)', position: 'relative' }}>
                                    {hotel.image ? (
                                        <img
                                            src={hotel.image}
                                            alt={hotel.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                            Image Placeholder
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{hotel.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                                        {hotel.location}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                                            ${hotel.pricePerNight || '100'} / night
                                        </span>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hotels;
