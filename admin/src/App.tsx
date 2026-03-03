import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLeads from './pages/AdminLeads';
import AdminProjects from './pages/AdminProjects';
import AdminTickets from './pages/AdminTickets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/leads" element={<AdminLeads />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/tickets" element={<AdminTickets />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
