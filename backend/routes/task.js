const registerTaskApi = (router) => {
    // creates a new task
    router.post('/board/:id/task', (req, res) => {
        res.send({
            message: `Creating a new task in a board with id: ${req.params.id}.`
        });
    });

    // gets all tasks of the board
    router.get('/board/:id/task', (req, res) => {
        res.send({
            message: `Getting tasks list of board with id: ${req.params.id}.`
        });
    });

    // gets a task by id
    router.get('/board/:boardId/task/:taskId', (req, res) => {
        res.send({
            message: `Getting a task with id: ${req.params.taskId} of board with id: ${req.params.boardId}.`
        });
    });

    // updates a task by id
    router.put('/board/:boardId/task/:taskId', (req, res) => {
        res.send({
            message: `Updating a task with id: ${req.params.taskId} of board with id: ${req.params.boardId}.`
        });
    });

    // deletes a task by id
    router.delete('/board/:boardId/task/:taskId', (req, res) => {
        res.send({
            message: `Deleting a task with id: ${req.params.taskId} of board with id: ${req.params.boardId}.`
        });
    });
};

export default registerTaskApi;