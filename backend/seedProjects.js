const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const allProjects = [
    {
        title: 'Organization Manager App',
        description: 'A mobile-first collaboration tool for managing organizations, announcements, and team insights.',
        imageUrl: '/mockups/mockup_collab.png',
        liveLink: 'https://drive.google.com/file/d/1GGOdHTYEyKX4aJPEbxWJWF16Dn0yCVKJ/view?usp=sharing',
        tags: ['Mobile', 'React Native'],
        industry: 'Mobile',
        isFeatured: false,
        orderIndex: 0
    },
    {
        title: 'Product Store via MERN',
        description: 'Full-stack product management store. Features real-time updates, dark mode, and a responsive product grid.',
        imageUrl: '/mockups/mockup_store.png',
        liveLink: 'https://mern-viq.onrender.com',
        tags: ['MERN', 'MongoDB', 'React'],
        industry: 'Ecommerce',
        isFeatured: true, // Will show on homepage
        orderIndex: 1
    },
    {
        title: 'Fresh by Hrite',
        description: 'Fresh Organic Groceries Delivered to Your Door. A comprehensive e-commerce platform for farm-fresh produce.',
        imageUrl: '/mockups/mockup_fresh.png',
        liveLink: 'https://grocery-ecommerce-gwcc.onrender.com/',
        tags: ['Ecommerce', 'Node.js', 'React'],
        industry: 'Ecommerce',
        isFeatured: true, // Will show on homepage
        orderIndex: 2
    },
    {
        title: 'HRITE Real Estate',
        description: 'Where Quality Meets Innovation. Building dreams into reality with excellence and innovative design.',
        imageUrl: '/mockups/mockup_realestate.png',
        liveLink: 'https://real-estate-p9j8.onrender.com/',
        tags: ['Real Estate', 'React', 'CRM'],
        industry: 'Real Estate',
        isFeatured: true, // Will show on homepage
        orderIndex: 3
    },
    {
        title: 'Fresh by Hrite (Mobile UI)',
        description: 'A sleek mobile UI for an organic grocery delivery app, with high-fidelity design and vibrant aesthetics.',
        imageUrl: '/mockups/project-fresh-card.jpg',
        liveLink: 'https://drive.google.com/file/d/1OC4iOmqHIh1q06OUN_o5DWMe2M2ii4hG/view?usp=sharing',
        tags: ['Mobile', 'UI/UX', 'Grocery'],
        industry: 'Mobile',
        isFeatured: true, // Will show on homepage
        orderIndex: 4
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hriteweb')
    .then(async () => {
        console.log('MongoDB connected for Project Seeding');

        // Remove existing projects to avoid duplicates
        await Project.deleteMany();

        await Project.insertMany(allProjects);

        console.log('✅ Hardcoded projects successfully seeded into MongoDB!');
        process.exit();
    })
    .catch((err) => {
        console.error('❌ Error seeding projects:', err);
        process.exit(1);
    });
