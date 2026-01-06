import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data.data || []);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError("Could not load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleBook = async (event) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to book tickets!");
            navigate('/login');
            return;
        }

        if (!confirm(`Book ticket for ${event.name} for $${event.ticketPrice || 0}?`)) return;

        try {
            // 1. Create Booking
            const bookingPayload = {
                targetType: 'Event',
                targetId: event._id,
                checkIn: event.startDate,
                qty: 1,
                totalAmount: event.ticketPrice || 0
            };

            const bookingRes = await api.post('/bookings', bookingPayload);
            const bookingId = bookingRes.data.data._id;

            alert("Booking confirmed! Generating your ticket...");

            // 2. Generate Ticket
            await api.post('/tickets', { bookingId });

            alert("Success! Your ticket has been sent to your email.");
        } catch (err) {
            console.error("Booking failed:", err);
            // Handle error safely
            const msg = err.response?.data?.message || "Booking failed. Please try again.";
            alert(msg);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
                    Upcoming Events
                </h1>

                {loading ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>Loading events...</div>
                ) : error ? (
                    <div style={{ color: '#fca5a5', textAlign: 'center', marginTop: '4rem' }}>{error}</div>
                ) : events.length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4rem' }}>
                        No events found.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {events.map(event => (
                            <div key={event._id} className="glass-panel" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '200px', background: 'var(--bg-secondary)', position: 'relative' }}>
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{event.name}</h3>
                                    <p style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Date TBA'}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                                        {event.description?.substring(0, 100)}...
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                            ${event.ticketPrice || 0}
                                        </span>
                                        <button
                                            onClick={() => handleBook(event)}
                                            className="btn-primary"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                        >
                                            Book Ticket
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

export default Events;
