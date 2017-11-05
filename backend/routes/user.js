import mongoService from '../mongodb';

const registerUserApi = (router) => {
    // creates a new task
    router.post('/register', async (req, res) => {
        const result = await mongoService.createUser(req.body);
        console.log(result);
        res.status(201).send({
            result
        });
    });
};

export default registerUserApi;