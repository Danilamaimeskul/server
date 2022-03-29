const {Project} = require('../models/models')
const tokenService = require('../service/tokenService')
const ApiError = require('../error/apiError')

class ProjectController {
    async getAll(req, res){
        // console.log(req.headers.cookie);
        const { headers: { cookie } } = req;
        if(!cookie){
            throw ApiError.UnauthorizedError()
        }
        const {refreshToken} = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        const userData = tokenService.validateRefreshToken(refreshToken);
        if(!userData){
            throw ApiError.UnauthorizedError()
        }
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