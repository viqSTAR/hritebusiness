import { useEffect, useState } from 'react';
import { fetchAdminProjects, fetchAdminLeads, fetchAdminTickets } from '../services/api';

const AdminDashboard = () => {
    const [counts, setCounts] = useState({ projects: 0, leads: 0, tickets: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [projects, leads, tickets] = await Promise.all([
                    fetchAdminProjects(),
                    fetchAdminLeads(),
                    fetchAdminTickets()
                ]);

                setCounts({
                    projects: projects.length,
                    leads: leads.length,
                    tickets: tickets.length
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard Overview</h1>
            </div>

            {loading ? (
                <p>Loading analytics...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>

                    <div className="admin-card" style={{ borderLeft: '4px solid #4f46e5' }}>
                        <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginTop: 0 }}>Total Leads</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: '10px 0 0 0', color: '#f8fafc' }}>{counts.leads}</p>
                    </div>

                    <div className="admin-card" style={{ borderLeft: '4px solid #ec4899' }}>
                        <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginTop: 0 }}>Portfolio Projects</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: '10px 0 0 0', color: '#f8fafc' }}>{counts.projects}</p>
                    </div>

                    <div className="admin-card" style={{ borderLeft: '4px solid #10b981' }}>
                        <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginTop: 0 }}>Active Tickets</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: '10px 0 0 0', color: '#f8fafc' }}>{counts.tickets}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
