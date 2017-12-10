import mongoService from '../mongodb';

const registerUserApi = (router) => {
    // creates a new task
    router.post('/api/register', async (req, res) => {
        const result = await mongoService.createUser(req.body);
        res.status(201).send({
            result
        });
    });
};

export default registerUserApi;