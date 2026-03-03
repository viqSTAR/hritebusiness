import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Hrite Admin</h2>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/dashboard" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/leads" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        Leads
                    </NavLink>
                    <NavLink to="/projects" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        Projects
                    </NavLink>
                    <NavLink to="/tickets" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        Tickets
                    </NavLink>
                </nav>
                <div className="admin-logout-wrap">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
