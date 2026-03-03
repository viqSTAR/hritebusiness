import { useEffect, useState } from 'react';
import { fetchAdminLeads, authHeaders, API_URL } from '../services/api';

interface Lead {
    _id: string;
    name: string;
    email: string;
    company: string;
    budget: string;
    message: string;
    status: string;
    createdAt: string;
}

const AdminLeads = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const data = await fetchAdminLeads();
            setLeads(data);
        } catch (_err) {
            setError('Failed to load leads');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`${API_URL}/leads/${id}/status`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
            } else {
                alert('Failed to update status');
            }
        } catch (_err) {
            alert('Error updating status');
        }
    };

    const deleteLead = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;

        try {
            const response = await fetch(`${API_URL}/leads/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });

            if (response.ok) {
                setLeads(leads.filter(lead => lead._id !== id));
            } else {
                alert('Failed to delete lead');
            }
        } catch (err) {
            alert('Error deleting lead');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }; // Premium Blue
            case 'Contacted': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }; // Deep Yellow
            case 'In Progress': return { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }; // Indigo
            case 'Closed': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }; // Emerald
            default: return { bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af' }; // Slate
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Lead Management</h1>
            </div>

            {error && <div className="admin-error-box">{error}</div>}

            <div className="admin-card">
                {loading ? (
                    <p>Loading leads...</p>
                ) : leads.length === 0 ? (
                    <p style={{ color: '#6b7280' }}>No leads submitted yet.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Budget</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => {
                                    const { bg, color } = getStatusColor(lead.status);
                                    return (
                                        <tr key={lead._id}>
                                            <td style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </td>
                                            <td style={{ fontWeight: 500 }}>{lead.name}</td>
                                            <td style={{ fontSize: '0.9rem' }}>
                                                <div><a href={`mailto:${lead.email}`} style={{ color: '#4f46e5', textDecoration: 'none' }}>{lead.email}</a></div>
                                                {lead.company && <div style={{ color: '#9ca3af', marginTop: '4px' }}>{lead.company}</div>}
                                            </td>
                                            <td style={{ fontSize: '0.9rem' }}>{lead.budget || 'N/A'}</td>
                                            <td style={{ maxWidth: '250px' }}>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                    {lead.message}
                                                </p>
                                            </td>
                                            <td>
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                                                    style={{
                                                        backgroundColor: bg,
                                                        color: color,
                                                        border: '1px solid rgba(255,255,255,0.05)',
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        fontWeight: 600,
                                                        fontSize: '0.85rem',
                                                        outline: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="New" style={{ background: '#1e293b', color: '#f8fafc' }}>New</option>
                                                    <option value="Contacted" style={{ background: '#1e293b', color: '#f8fafc' }}>Contacted</option>
                                                    <option value="In Progress" style={{ background: '#1e293b', color: '#f8fafc' }}>In Progress</option>
                                                    <option value="Closed" style={{ background: '#1e293b', color: '#f8fafc' }}>Closed</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => deleteLead(lead._id)}
                                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                                                    title="Delete Lead"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLeads;
