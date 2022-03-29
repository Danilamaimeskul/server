const {Project} = require('../models/models')
const tokenService = require('../service/tokenService')
const ApiError = require('../error/apiError')

class ProjectController {
    async getAll(req, res, next){
        try{
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
        }catch(e){
            next(e)
        }
        
    }
}

module.exports = new ProjectController()