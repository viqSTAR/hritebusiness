const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hriteweb')
    .then(async () => {
        console.log('MongoDB connected');

        // Remove existing users to avoid duplicates in testing
        await User.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const admin = await User.create({
            name: 'Hrite Admin',
            email: 'prasadmanthan07@gmail.com',
            password: hashedPassword,
            role: 'Admin'
        });

        console.log('✅ Admin user successfully seeded!');
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        process.exit();
    })
    .catch((err) => {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    });
