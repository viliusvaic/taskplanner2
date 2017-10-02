const registerBoardApi = (router) => {
    // creates a new board
    router.post('/board', (req, res) => {
        res.send({
            message: 'Creating a new board.'
        });
    });

    // gets all boards list
    router.get('/board', (req, res) => {
        res.send({
            message: 'Getting boards list.'
        });
    });

    // gets a board by id
    router.get('/board/:id', (req, res) => {
        res.send({
            message: `Getting a board with id: ${req.params.id}`
        });
    });

    // updates a board by id
    router.put('/board/:id', (req, res) => {
        res.send({
            message: `Updating a board with id: ${req.params.id}`
        });
    });

    // deletes a board by id
    router.delete('/board/:id', (req, res) => {
        res.send({
            message: `Updating a board with id: ${req.params.id}`
        });
    });
};

export default registerBoardApi;