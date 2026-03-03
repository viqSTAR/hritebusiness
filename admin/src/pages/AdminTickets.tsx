import { useEffect, useState, FormEvent } from 'react';
import { fetchAdminTickets, authHeaders, API_URL } from '../services/api';
import './AdminProjects.css'; // Reusing standard modal styles

export interface Attachment {
    name: string;
    url: string;
    type: string;
}

export interface Milestone {
    title: string;
    date: string;
    attachments: Attachment[];
}

export interface Update {
    date: string;
    title: string;
    img: string;
}

interface Ticket {
    _id: string;
    ticketId: string;
    clientEmail: string;
    projectName: string;
    phase: string;
    stage: number;
    startDate: string;
    eta: string;
    lead: string;
    leadInitials?: string;
    lastUpdate: string;
    paidAmount: number;
    totalAmount: number;
    status: 'Active' | 'Paused' | 'Completed';
    milestones: Milestone[];
    updates: Update[];
}

export default function AdminTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingMedia, setUploadingMedia] = useState<{ type: 'update' | 'milestone', index: number } | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<Ticket>>({
        ticketId: '',
        clientEmail: '',
        projectName: '',
        phase: 'Phase 01: Discovery',
        stage: 0,
        startDate: '',
        eta: '',
        lead: '',
        leadInitials: '',
        lastUpdate: '',
        paidAmount: 0,
        totalAmount: 0,
        status: 'Active',
        milestones: [],
        updates: []
    });

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const data = await fetchAdminTickets();
            setTickets(data);
        } catch {
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const deleteTicket = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;

        try {
            const response = await fetch(`${API_URL}/tickets/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });

            if (response.ok) {
                setTickets(tickets.filter(t => t._id !== id));
            } else {
                alert('Failed to delete ticket');
            }
        } catch {
            alert('Error deleting ticket');
        }
    };

    const handleOpenModal = (ticket?: Ticket) => {
        if (ticket) {
            setEditingId(ticket._id);
            setFormData({ ...ticket });
        } else {
            const randomId = 'TK-' + Math.floor(1000 + Math.random() * 9000);
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            setEditingId(null);
            setFormData({
                ticketId: randomId,
                clientEmail: '',
                projectName: '',
                phase: 'Phase 01: Discovery',
                stage: 0,
                startDate: today,
                eta: '',
                lead: '',
                leadInitials: '',
                lastUpdate: today,
                paidAmount: 0,
                totalAmount: 0,
                status: 'Active',
                milestones: [],
                updates: []
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleAddUpdate = () => {
        setFormData(prev => ({
            ...prev,
            updates: [...(prev.updates || []), { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), title: '', img: '' }]
        }));
    };

    const handleUpdateChange = (index: number, field: keyof Update, value: string) => {
        const newUpdates = [...(formData.updates || [])];
        newUpdates[index] = { ...newUpdates[index], [field]: value };
        setFormData(prev => ({ ...prev, updates: newUpdates }));
    };

    const handleRemoveUpdate = (index: number) => {
        const newUpdates = [...(formData.updates || [])];
        newUpdates.splice(index, 1);
        setFormData(prev => ({ ...prev, updates: newUpdates }));
    };

    const handleAddMilestone = () => {
        setFormData(prev => ({
            ...prev,
            milestones: [...(prev.milestones || []), { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), title: '', attachments: [] }]
        }));
    };

    const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
        const newMs = [...(formData.milestones || [])];
        newMs[index] = { ...newMs[index], [field]: value };
        setFormData(prev => ({ ...prev, milestones: newMs }));
    };

    const handleRemoveMilestone = (index: number) => {
        const newMs = [...(formData.milestones || [])];
        newMs.splice(index, 1);
        setFormData(prev => ({ ...prev, milestones: newMs }));
    };

    const handleFileUpload = async (type: 'update' | 'milestone', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setUploadingMedia({ type, index });
        const fileData = new FormData();
        fileData.append('image', file);

        try {
            const headers = authHeaders() as Record<string, string>;
            delete headers['Content-Type'];

            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers,
                body: fileData
            });

            const data = await response.json();
            if (response.ok) {
                if (type === 'update') {
                    handleUpdateChange(index, 'img', data.imageUrl);
                } else if (type === 'milestone') {
                    const newMs = [...(formData.milestones || [])];
                    newMs[index].attachments = [{ name: file.name, url: data.imageUrl, type: 'image' }];
                    setFormData(prev => ({ ...prev, milestones: newMs }));
                }
            } else {
                alert(`Upload failed`);
            }
        } catch {
            alert('Error uploading file');
        } finally {
            setUploadingMedia(null);
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId ? `${API_URL}/tickets/${editingId}` : `${API_URL}/tickets`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: authHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const savedTicket = await response.json();
                if (editingId) {
                    setTickets(tickets.map(t => t._id === editingId ? savedTicket : t));
                } else {
                    setTickets([savedTicket, ...tickets]);
                }
                handleCloseModal();
            } else {
                alert('Failed to save ticket');
            }
        } catch {
            alert('Error saving ticket');
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }; // Emerald
            case 'Paused': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }; // Amber
            case 'Completed': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }; // Blue
            default: return { bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af' };
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Client Tickets</h1>
                <button
                    className="admin-btn-primary"
                    style={{ width: 'auto', padding: '10px 20px', margin: 0 }}
                    onClick={() => handleOpenModal()}
                >
                    + Create Ticket
                </button>
            </div>

            {error && <div className="admin-error-box">{error}</div>}

            <div className="admin-card">
                {loading ? (
                    <p>Loading tickets...</p>
                ) : tickets.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No active tickets. Create one to share progress with a client.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Stage</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id}>
                                        <td style={{ fontWeight: 600, color: '#f8fafc' }}>{ticket.ticketId}</td>
                                        <td>{ticket.projectName}</td>
                                        <td style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{ticket.clientEmail}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, background: '#334155', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${(ticket.stage / 4) * 100}%`, background: '#6366f1', height: '100%' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: '#94a3b8', width: '20px' }}>{ticket.stage}/4</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                backgroundColor: getStatusStyle(ticket.status).bg,
                                                color: getStatusStyle(ticket.status).color,
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600
                                            }}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleOpenModal(ticket)}
                                                style={{ background: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer', padding: '8px', marginRight: '4px' }}
                                                title="Edit Details"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                            </button>
                                            <button
                                                onClick={() => deleteTicket(ticket._id)}
                                                style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '8px' }}
                                                title="Delete Ticket"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <div className="admin-modal-header">
                            <h2>{editingId ? 'Edit Ticket' : 'Create Tracking Ticket'}</h2>
                            <button className="admin-modal-close" onClick={handleCloseModal}>×</button>
                        </div>
                        <form onSubmit={handleSave} className="admin-form">

                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Tracking ID</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.ticketId}
                                        onChange={e => setFormData({ ...formData, ticketId: e.target.value })}
                                        placeholder="TK-1234"
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Client Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.clientEmail}
                                        onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
                                        placeholder="client@example.com"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.projectName}
                                    onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 2 }}>
                                    <label>Current Phase Text</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.phase}
                                        onChange={e => setFormData({ ...formData, phase: e.target.value })}
                                        placeholder="e.g. Phase 02: Design sprint"
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Stage (0-4)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="4"
                                        required
                                        value={formData.stage}
                                        onChange={e => setFormData({ ...formData, stage: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Start Date</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>ETA / Deadline</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.eta}
                                        onChange={e => setFormData({ ...formData, eta: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 3 }}>
                                    <label>Lead Developer Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lead}
                                        onChange={e => setFormData({ ...formData, lead: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Initials</label>
                                    <input
                                        type="text"
                                        value={formData.leadInitials}
                                        onChange={e => setFormData({ ...formData, leadInitials: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Total Value ($)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.totalAmount}
                                        onChange={e => setFormData({ ...formData, totalAmount: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Amount Paid ($)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.paidAmount}
                                        onChange={e => setFormData({ ...formData, paidAmount: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Last Updated</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastUpdate}
                                        onChange={e => setFormData({ ...formData, lastUpdate: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Updates Section */}
                            <div style={{ marginTop: '30px', marginBottom: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.05rem' }}>Project Updates / Feed</h3>
                                    <button type="button" onClick={handleAddUpdate} style={{ background: '#334155', color: '#f8fafc', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>+ Add Update</button>
                                </div>
                                {(formData.updates || []).map((update, idx) => (
                                    <div key={`upd-${idx}`} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Update #{idx + 1}</span>
                                            <button type="button" onClick={() => handleRemoveUpdate(idx)} style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-group" style={{ flex: 1 }}>
                                                <label>Date</label>
                                                <input type="text" value={update.date} required onChange={e => handleUpdateChange(idx, 'date', e.target.value)} />
                                            </div>
                                            <div className="admin-form-group" style={{ flex: 2 }}>
                                                <label>Title / Description</label>
                                                <input type="text" value={update.title} required onChange={e => handleUpdateChange(idx, 'title', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                            <label>Image Attachment</label>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                                <input type="file" accept="image/*" onChange={e => handleFileUpload('update', idx, e)} disabled={uploadingMedia?.type === 'update' && uploadingMedia.index === idx} style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.2)' }} />
                                                {uploadingMedia?.type === 'update' && uploadingMedia.index === idx && <span style={{ fontSize: '0.85rem', color: '#818cf8' }}>Uploading...</span>}
                                            </div>
                                            <input type="text" placeholder="Or paste image URL" value={update.img || ''} onChange={e => handleUpdateChange(idx, 'img', e.target.value)} />
                                            {update.img && <img src={update.img} alt="Update Preview" style={{ marginTop: '10px', maxHeight: '80px', borderRadius: '4px' }} />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Milestones Section */}
                            <div style={{ marginBottom: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.05rem' }}>Project Milestones</h3>
                                    <button type="button" onClick={handleAddMilestone} style={{ background: '#334155', color: '#f8fafc', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>+ Add Milestone</button>
                                </div>
                                {(formData.milestones || []).map((ms, idx) => (
                                    <div key={`ms-${idx}`} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Milestone #{idx + 1}</span>
                                            <button type="button" onClick={() => handleRemoveMilestone(idx)} style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-group" style={{ flex: 1 }}>
                                                <label>Date</label>
                                                <input type="text" value={ms.date} required onChange={e => handleMilestoneChange(idx, 'date', e.target.value)} />
                                            </div>
                                            <div className="admin-form-group" style={{ flex: 2 }}>
                                                <label>Milestone Title</label>
                                                <input type="text" value={ms.title} required onChange={e => handleMilestoneChange(idx, 'title', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                            <label>Milestone Proof (Image)</label>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                                <input type="file" accept="image/*" onChange={e => handleFileUpload('milestone', idx, e)} disabled={uploadingMedia?.type === 'milestone' && uploadingMedia.index === idx} style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.2)' }} />
                                                {uploadingMedia?.type === 'milestone' && uploadingMedia.index === idx && <span style={{ fontSize: '0.85rem', color: '#818cf8' }}>Uploading...</span>}
                                            </div>
                                            <input type="text" placeholder="Or paste image URL" value={ms.attachments?.[0]?.url || ''} onChange={e => {
                                                const newMs = [...(formData.milestones || [])];
                                                newMs[idx].attachments = [{ name: 'attachment', type: 'image', url: e.target.value }];
                                                setFormData(prev => ({ ...prev, milestones: newMs }));
                                            }} />
                                            {ms.attachments?.[0]?.url && <img src={ms.attachments[0].url} alt="Milestone Preview" style={{ marginTop: '10px', maxHeight: '80px', borderRadius: '4px' }} />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="admin-form-group">
                                <label>Ticket Status</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as 'Active' | 'Paused' | 'Completed' })}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        background: '#0f172a',
                                        border: '1px solid #334155',
                                        borderRadius: '6px',
                                        color: '#f8fafc'
                                    }}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Paused">Paused</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="admin-modal-actions">
                                <button type="button" onClick={handleCloseModal} className="admin-btn-secondary">Cancel</button>
                                <button type="submit" className="admin-btn-primary">Save Ticket</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
