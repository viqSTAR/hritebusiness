import { useEffect, useState, FormEvent } from 'react';
import { fetchAdminProjects, authHeaders } from '../services/api';
import './AdminProjects.css';

interface Project {
    _id: string;
    title: string;
    description: string;
    industry: string;
    tags: string[];
    imageUrl: string;
    liveLink: string;
    isFeatured: boolean;
    orderIndex: number;
}

const AdminProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: '',
        tags: '',
        imageUrl: '',
        liveLink: '',
        isFeatured: false,
        orderIndex: 0
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await fetchAdminProjects();
            setProjects(data);
        } catch (_err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });

            if (response.ok) {
                setProjects(projects.filter(p => p._id !== id));
            } else {
                alert('Failed to delete project');
            }
        } catch (_err) {
            alert('Error deleting project');
        }
    };

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingId(project._id);
            setFormData({
                title: project.title,
                description: project.description,
                industry: project.industry,
                tags: (project.tags || []).join(', '),
                imageUrl: project.imageUrl || '',
                liveLink: project.liveLink || '',
                isFeatured: project.isFeatured || false,
                orderIndex: project.orderIndex || 0
            });
        } else {
            setEditingId(null);
            setFormData({
                title: '',
                description: '',
                industry: '',
                tags: '',
                imageUrl: '',
                liveLink: '',
                isFeatured: false,
                orderIndex: projects.length
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setUploadingImage(true);
        const fileData = new FormData();
        fileData.append('image', file);

        try {
            // Reconstruct auth headers without Content-Type so browser sets boundary
            const headers: any = authHeaders();
            delete headers['Content-Type'];

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers,
                body: fileData
            });

            const data = await response.json();
            if (response.ok) {
                setFormData({ ...formData, imageUrl: data.imageUrl });
            } else {
                alert(`Upload failed: ${data.message || 'Check .env credentials'}`);
            }
        } catch (_err) {
            alert('Error connecting to upload server');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        };

        try {
            const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: authHeaders(),
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const savedProject = await response.json();
                if (editingId) {
                    setProjects(projects.map(p => p._id === editingId ? savedProject : p));
                } else {
                    setProjects([savedProject, ...projects]);
                }
                handleCloseModal();
            } else {
                alert('Failed to save project');
            }
        } catch (_err) {
            alert('Error saving project');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Portfolio Projects</h1>
                <button
                    className="admin-btn-primary"
                    style={{ width: 'auto', padding: '10px 20px', margin: 0 }}
                    onClick={() => handleOpenModal()}
                >
                    + Add New Project
                </button>
            </div>

            {error && <div className="admin-error-box">{error}</div>}

            <div className="admin-card">
                {loading ? (
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p style={{ color: '#6b7280' }}>No projects found in database.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Industry</th>
                                    <th>Tags</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id}>
                                        <td>
                                            <img
                                                src={project.imageUrl || 'https://via.placeholder.com/60'}
                                                alt={project.title}
                                                style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{project.title}</td>
                                        <td style={{ fontSize: '0.9rem' }}>{project.industry}</td>
                                        <td style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                            {(project.tags || []).slice(0, 3).join(', ')}
                                            {(project.tags || []).length > 3 && ' ...'}
                                        </td>
                                        <td>
                                            {project.isFeatured ? (
                                                <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Yes</span>
                                            ) : (
                                                <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>No</span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleOpenModal(project)}
                                                style={{ background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', padding: '8px', marginRight: '4px' }}
                                                title="Edit Project"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                            </button>
                                            <button
                                                onClick={() => deleteProject(project._id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                                                title="Delete Project"
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
                            <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                            <button className="admin-modal-close" onClick={handleCloseModal}>×</button>
                        </div>
                        <form onSubmit={handleSave} className="admin-form">
                            <div className="admin-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Industry</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.industry}
                                        onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group" style={{ flex: 1 }}>
                                    <label>Order Index (for sorting)</label>
                                    <input
                                        type="number"
                                        value={formData.orderIndex}
                                        onChange={e => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="e.g. React, Node.js, MongoDB"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Project Image</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        disabled={uploadingImage}
                                        style={{ flex: 1, padding: '8px' }}
                                    />
                                    {uploadingImage && <span style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: 600 }}>Uploading...</span>}
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="Or paste an image URL here..."
                                />
                                {formData.imageUrl && (
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        style={{ marginTop: '10px', maxHeight: '100px', borderRadius: '4px', objectFit: 'contain', background: '#f3f4f6' }}
                                    />
                                )}
                            </div>
                            <div className="admin-form-group">
                                <label>Live Link URL (optional)</label>
                                <input
                                    type="text"
                                    value={formData.liveLink}
                                    onChange={e => setFormData({ ...formData, liveLink: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    />
                                    Feature on Homepage?
                                </label>
                            </div>
                            <div className="admin-modal-actions">
                                <button type="button" onClick={handleCloseModal} className="admin-btn-secondary">Cancel</button>
                                <button type="submit" className="admin-btn-primary">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
