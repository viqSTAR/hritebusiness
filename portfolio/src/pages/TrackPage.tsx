import React, { useState } from 'react';
import SEO from '../components/SEO';
import './TrackPage.css';

/* ─── Data & Types ─────────────────────────────────────────── */
interface Update {
    date: string;
    title: string;
    img?: string;
}

interface TicketData {
    projectName: string;
    phase: string;
    stage: number;   // 0=Discovery,1=Design,2=Development,3=Testing,4=Deployment
    startDate: string;
    eta: string;
    lead: string;
    leadInitials?: string;
    lastUpdate: string;
    paidAmount: number;
    totalAmount: number;
    milestones: {
        title: string;
        date: string;
        attachments?: { name: string; url: string; type: 'image' | 'file' }[];
    }[];
    updates: Update[];
}

const STAGES = ['Discovery', 'Design', 'Development', 'Testing', 'Deployment'];

/* ─── API Service ─────────────────────── */
const fetchTicketData = async (ticketId: string): Promise<TicketData | null> => {
    try {
        const response = await fetch(`https://hrite.in/api/tickets/track/${ticketId.toUpperCase()}`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return null;
    }
};

/* ─── Component ─────────────────────────────────────────────── */
const TrackPage: React.FC = () => {
    const [ticketId, setTicketId] = useState('');
    const [ticket, setTicket] = useState<TicketData | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (overrideId?: string) => {
        const idToSearch = overrideId || ticketId;
        if (!idToSearch.trim()) return;

        setTicketId(idToSearch);
        setLoading(true);
        setError('');

        try {
            const data = await fetchTicketData(idToSearch.trim());
            if (data) {
                setTicket(data);
            } else {
                setTicket(null);
                setError('Ticket not found. Please check your tracking ID.');
            }
        } catch {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const payPercent = ticket ? Math.round((ticket.paidAmount / ticket.totalAmount) * 100) : 0;
    const remaining = ticket ? ticket.totalAmount - ticket.paidAmount : 0;

    return (
        <div className="tp-page">
            <SEO
                title="Track Project – Real-time Updates"
                description="Enter your ticket ID to track your project's progress in real-time. Stay updated with Hrite's development process."
                canonical="https://hrite.in/track"
            />
            {/* ── Search Hero ────────────────────────────────────── */}
            <div className={`tp-hero ${!ticket ? 'tp-hero-centered' : ''}`}>
                <div className="tp-hero-inner">
                    <h1 className="tp-hero-title">Track Your Project</h1>
                    <p className="tp-hero-sub">Securely access your project's real-time development status.</p>

                    <div className="tp-search-container">
                        <div className="tp-search-input-wrap">
                            <input
                                className="tp-search-input"
                                type="text"
                                value={ticketId}
                                onChange={e => setTicketId(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                placeholder="Enter your Ticket ID..."
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                        <button className="tp-search-btn" onClick={() => handleSearch()} disabled={loading}>
                            {loading ? (
                                <div className="tp-spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                    Track Project
                                </>
                            )}
                        </button>
                    </div>

                    {error && <p className="tp-error" style={{ marginTop: '16px' }}>{error}</p>}
                </div>
            </div>

            {/* ── Result ────────────────────────────────────── */}
            {ticket && (
                <div className="tp-result-container">

                    {/* Header Card */}
                    <div className="tp-w-card tp-header-card">
                        <div className="tp-header-top">
                            <h2 className="tp-project-name">{ticket.projectName}</h2>
                            <span className="tp-phase-pill">{ticket.phase}</span>
                        </div>
                        <p className="tp-ticket-id">Ticket ID: <strong>{ticketId.toUpperCase()}</strong></p>
                    </div>

                    {/* 4 Info Cards */}
                    <div className="tp-info-grid">
                        <div className="tp-w-card tp-info-item">
                            <div className="tp-icon-box tp-icon-blue">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            </div>
                            <span className="tp-info-lbl">START DATE</span>
                            <span className="tp-info-val">{ticket.startDate}</span>
                        </div>

                        <div className="tp-w-card tp-info-item">
                            <div className="tp-icon-box tp-icon-orange">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            </div>
                            <span className="tp-info-lbl">ESTIMATED DELIVERY</span>
                            <span className="tp-info-val">{ticket.eta}</span>
                        </div>

                        <div className="tp-w-card tp-info-item">
                            <div className="tp-icon-box tp-icon-purple">
                                <span className="tp-initials">{ticket.leadInitials || ticket.lead.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <span className="tp-info-lbl">LEAD ARCHITECT</span>
                            <span className="tp-info-val">{ticket.lead}</span>
                        </div>

                        <div className="tp-w-card tp-info-item">
                            <div className="tp-icon-box tp-icon-green">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <span className="tp-info-lbl">LAST UPDATE</span>
                            <span className="tp-info-val">{ticket.lastUpdate}</span>
                        </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="tp-w-card">
                        <h3 className="tp-section-title">Project Timeline</h3>
                        <div className="tp-timeline-wrap">
                            {STAGES.map((s, i) => {
                                const isDone = i < ticket.stage;
                                const isActive = i === ticket.stage;
                                const isPending = i > ticket.stage;

                                return (
                                    <React.Fragment key={s}>
                                        <div className="tp-timeline-node">
                                            {isDone && (
                                                <div className="tp-tl-dot tp-tl-done">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </div>
                                            )}
                                            {isActive && (
                                                <div className="tp-tl-dot tp-tl-active">
                                                    <div className="tp-tl-active-inner" />
                                                </div>
                                            )}
                                            {isPending && (
                                                <div className="tp-tl-dot tp-tl-pending">
                                                    <div className="tp-tl-pending-inner" />
                                                </div>
                                            )}
                                            <span className="tp-tl-label">{s}</span>
                                        </div>
                                        {i < STAGES.length - 1 && (
                                            <div className={`tp-tl-line ${i < ticket.stage ? 'tp-tl-line-done' : ''}`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    {/* Milestones Card */}
                    <div className="tp-w-card">
                        <h3 className="tp-section-title">Recent Milestones</h3>
                        <div className="tp-milestone-list">
                            {ticket.milestones.map((m, i) => (
                                <div key={i} className="tp-milestone-row">
                                    <div className="tp-milestone-check">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                    <div className="tp-milestone-text">
                                        <span className="tp-milestone-title">{m.title}</span>
                                        <span className="tp-milestone-date">{m.date}</span>
                                        {m.attachments && m.attachments.length > 0 && (
                                            <div className="tp-attachments-list">
                                                {m.attachments.map((att, idx) => (
                                                    <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer" className="tp-attachment-card">
                                                        {att.type === 'image' ? (
                                                            <div className="tp-att-preview" style={{ backgroundImage: `url(${att.url})` }} />
                                                        ) : (
                                                            <div className="tp-att-preview file-icon">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                                                            </div>
                                                        )}
                                                        <div className="tp-att-info">
                                                            <span className="tp-att-name">{att.name}</span>
                                                            <span className="tp-att-type">{att.type.toUpperCase()}</span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Status Card */}
                    <div className="tp-w-card">
                        <div className="tp-payment-header">
                            <h3 className="tp-section-title" style={{ margin: 0 }}>Payment Status</h3>
                            <span className={`tp-pay-badge ${payPercent >= 100 ? 'paid' : payPercent > 0 ? 'partial' : 'unpaid'}`}>
                                {payPercent >= 100 ? (
                                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12" /></svg>Fully Paid</>
                                ) : 'Phase Paid'}
                            </span>
                        </div>

                        <div className="tp-pay-stats">
                            <div className="tp-pay-stat-item">
                                <span className="tp-pay-stat-lbl">ADVANCE PAID</span>
                                <span className="tp-pay-stat-val">₹{ticket.paidAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="tp-pay-stat-item">
                                <span className="tp-pay-stat-lbl">TOTAL AMOUNT</span>
                                <span className="tp-pay-stat-val">₹{ticket.totalAmount.toLocaleString('en-IN')}</span>
                            </div>
                            {remaining > 0 && (
                                <div className="tp-pay-stat-item">
                                    <span className="tp-pay-stat-lbl">REMAINING</span>
                                    <span className="tp-pay-stat-val tp-pay-muted">₹{remaining.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                        </div>

                        <div className="tp-progress-bar-wrap">
                            <div className="tp-progress-bar-bg">
                                <div className="tp-progress-bar-fill" style={{ width: `${Math.min(payPercent, 100)}%` }} />
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default TrackPage;
