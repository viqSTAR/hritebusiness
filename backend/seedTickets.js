const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ticket = require('./models/Ticket');

dotenv.config();

const demoTickets = [
    {
        ticketId: 'HR-9921',
        clientEmail: 'client1@example.com',
        projectName: 'Verdant Market Ecosystem',
        phase: 'Phase 02: Design & Dev',
        stage: 2, // 0=Discovery, 1=Design, 2=Development
        startDate: 'Jan 12, 2026',
        eta: 'April 20, 2026',
        lead: 'Sarah Mitchell',
        leadInitials: 'SM',
        lastUpdate: '2 hours ago',
        paidAmount: 25000,
        totalAmount: 55000,
        milestones: [
            {
                title: 'High-fidelity wireframes approved by stakeholder team',
                date: 'Feb 28, 2026',
                attachments: [
                    { name: 'Wireframes_v2.pdf', url: '#', type: 'file' },
                    { name: 'Homepage_preview.png', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop', type: 'image' }
                ]
            },
            { title: 'Database architecture finalized and deployed to staging', date: 'Feb 25, 2026' },
            { title: 'Initial design system components built and tested', date: 'Feb 20, 2026' },
        ],
        updates: [],
    },
    {
        ticketId: 'HRITE-001',
        clientEmail: 'client2@example.com',
        projectName: 'Real Estate Web Platform',
        phase: 'Phase 02: Design & Dev',
        stage: 2,
        startDate: 'Jan 12, 2026',
        eta: 'April 20, 2026',
        lead: 'Vikashdeep P.',
        leadInitials: 'VP',
        lastUpdate: '2 hours ago',
        paidAmount: 25000,
        totalAmount: 55000,
        milestones: [
            { title: 'High-fidelity wireframes approved by stakeholder team', date: 'Feb 28, 2026' },
            { title: 'Database architecture finalized and deployed to staging', date: 'Feb 25, 2026' },
            { title: 'Initial design system components built and tested', date: 'Feb 20, 2026' },
        ],
        updates: [
            { date: 'Mar 1, 2026', title: 'Property listing pages completed', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
            { date: 'Feb 25, 2026', title: 'Dashboard UI finalised & sent for review', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
            { date: 'Feb 20, 2026', title: 'Initial wireframes shared via Figma' },
        ],
    },
    {
        ticketId: 'HRITE-002',
        clientEmail: 'client3@example.com',
        projectName: 'E-Commerce Store',
        phase: 'Phase 04: Deployment',
        stage: 4,
        startDate: 'Jan 1, 2026',
        eta: 'Mar 5, 2026',
        lead: 'Vikashdeep P.',
        leadInitials: 'VP',
        lastUpdate: '1 day ago',
        paidAmount: 40000,
        totalAmount: 40000,
        milestones: [
            { title: 'Store live on staging environment', date: 'Mar 2, 2026' },
            { title: 'Razorpay payment gateway integrated', date: 'Feb 28, 2026' },
            { title: 'Product catalog and checkout flow complete', date: 'Feb 22, 2026' },
        ],
        updates: [
            { date: 'Mar 2, 2026', title: 'Staging link shared for final review', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
            { date: 'Feb 28, 2026', title: 'Payment gateway test transactions successful' },
        ],
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hriteweb')
    .then(async () => {
        console.log('MongoDB connected for Ticket Seeding');

        await Ticket.deleteMany();
        await Ticket.insertMany(demoTickets);

        console.log('✅ Demo tickets successfully seeded into MongoDB!');
        process.exit();
    })
    .catch((err) => {
        console.error('❌ Error seeding tickets:', err);
        process.exit(1);
    });
