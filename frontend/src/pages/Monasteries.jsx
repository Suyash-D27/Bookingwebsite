import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Monasteries = () => {
    const [monasteries, setMonasteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonasteries = async () => {
            try {
                const response = await api.get('/monasteries');
                setMonasteries(response.data.data || []);
            } catch (err) {
                console.error("Failed to fetch monasteries:", err);
                setError("Could not load monasteries.");
            } finally {
                setLoading(false);
            }
        };

        fetchMonasteries();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
                    Spiritual Journeys
                </h1>

                {loading ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>Loading monasteries...</div>
                ) : error ? (
                    <div style={{ color: '#fca5a5', textAlign: 'center', marginTop: '4rem' }}>{error}</div>
                ) : monasteries.length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>
                        No monasteries found.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {monasteries.map(monastery => (
                            <div key={monastery._id} className="glass-panel" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '200px', background: 'var(--bg-secondary)', position: 'relative' }}>
                                    {monastery.image ? (
                                        <img
                                            src={monastery.image}
                                            alt={monastery.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                            Image Placeholder
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{monastery.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                                        {monastery.description?.substring(0, 100)}...
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                            Learn More
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

export default Monasteries;
