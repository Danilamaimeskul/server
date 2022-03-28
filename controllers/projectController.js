const {Project} = require('../models/models')

class ProjectController {
    async getAll(req, res){
        const searchValue = (req.query.value || "").toLowerCase();
        const projects = await Project.findAll();
        let filtred = projects.filter(({ title, description }) => {
            return (
            searchValue === "" ||
            title.toLowerCase().includes(searchValue) ||
            description.toLowerCase().includes(searchValue)
            );
        });
        res.json({ filtred });
    }
}

module.exports = new ProjectController()