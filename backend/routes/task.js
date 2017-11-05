import mongoService from '../mongodb';

const registerTaskApi = (router, auth) => {
    // creates a new task
    router.post('/board/:id/task', auth.authenticate(), async (req, res) => {
        const result = await mongoService.createTask(req.params.id, req.body);
        res.status(201).send({
            result
        });
    });

    // gets all tasks of the board
    router.get('/board/:id/task', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getTasksList(req.params.id);
        res.status(200).send({
            result
        });
    });

    // gets a task by id
    router.get('/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getTask(req.params.boardId, req.params.taskId);
        res.status(200).send({
            result
        });
    });

    // updates a task by id
    router.put('/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        await mongoService.updateTask(req.params.boardId, req.params.taskId, req.body);
        res.status(204).send({
            message: 'Task updated'
        });
    });

    // deletes a task by id
    router.delete('/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        await mongoService.deleteTask(req.params.boardId, req.params.taskId);
        res.status(204).send({
            message: 'Task deleted'
        });
    });
};

export default registerTaskApi;