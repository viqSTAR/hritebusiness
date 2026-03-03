const API_URL = '/api'; // Using Vite proxy to localhost:5000

export const authHeaders = (): HeadersInit => {
    const userInfo = localStorage.getItem('adminInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }
    return {
        'Content-Type': 'application/json',
    };
};

export const fetchAdminProjects = async () => {
    const res = await fetch(`${API_URL}/projects`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
};

export const fetchAdminLeads = async () => {
    const res = await fetch(`${API_URL}/leads`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
};

export const fetchAdminTickets = async () => {
    const res = await fetch(`${API_URL}/tickets`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to fetch tickets');
    return res.json();
};
