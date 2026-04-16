const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// We will mount routes here in Phase 1
app.get('/', (req, res) => res.send('LearnFlow API is running...'));
app.use('/api/auth', require('./routes/authRoutes'));
// Add this right below: app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
// Add this right below: app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
// Add this right below: app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
// Add this right below: app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/study', require('./routes/studyRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));