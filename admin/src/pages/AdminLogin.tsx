import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Store user info and token
                localStorage.setItem('adminInfo', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch {
            setError('Server error connecting to backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Hrite Admin Panel</h2>
                <p>Secure authentication gateway</p>

                {error && <div className="admin-error-box">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="admin-form-group">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="prasadmanthan07@gmail.com"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="admin-btn-primary" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
