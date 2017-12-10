import mongoService from '../mongodb';

const registerTaskApi = (router, auth) => {
    // creates a new task
    router.post('/api/board/:id/task', auth.authenticate(), async (req, res) => {
        const result = await mongoService.createTask(req.params.id, req.body, req.get('Authorization'));
        res.status(201).send({
            result
        });
    });

    // gets all tasks of the board
    router.get('/api/board/:id/task', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getTasksList(req.params.id, req.get('Authorization'));
        if (result !== 'Error') {
            res.status(200).send({
                result
            });
        } else {
            res.status(404).send();
        }
    });

    // gets a task by id
    router.get('/api/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getTask(req.params.boardId, req.params.taskId, req.get('Authorization'));
        if (result !== 'Error') {
            res.status(200).send({
                result
            });
        } else {
            return res.status(404).send();
        }

    });

    // updates a task by id
    router.put('/api/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        await mongoService.updateTask(req.params.boardId, req.params.taskId, req.body, req.get('Authorization'));
        res.status(204).send({
            message: 'Task updated'
        });
    });

    // deletes a task by id
    router.delete('/api/board/:boardId/task/:taskId', auth.authenticate(), async (req, res) => {
        await mongoService.deleteTask(req.params.boardId, req.params.taskId, req.get('Authorization'));
        res.status(204).send({
            message: 'Task deleted'
        });
    });
};

export default registerTaskApi;