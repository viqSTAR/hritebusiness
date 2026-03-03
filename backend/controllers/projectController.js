const Project = require('../models/Project');

// @desc    Get all projects (Public)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ orderIndex: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get featured projects (Public)
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isFeatured: true }).sort({ orderIndex: 1 }).limit(4);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a project (Admin)
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        // Assume image upload logic is handled as middleware earlier or body parsing includes imageUrl
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a project (Admin)
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a project (Admin)
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProjects, getFeaturedProjects, createProject, updateProject, deleteProject };
