import mongoService from '../mongodb';

const registerBoardApi = (router, auth) => {
    // creates a new board
    router.post('/board', auth.authenticate(), async (req, res) => {
        const result = await mongoService.createBoard({ name: req.body.name });
        res.status(201).send({
            result
        });
    });

    // gets all boards list
    router.get('/board', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getBoardsList();
        res.status(200).send({
            result
        });
    });

    // gets a board by id
    router.get('/board/:id', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getBoard(req.params.id);
        res.status(200).send({
            result
        });
    });

    // updates a board by id
    router.put('/board/:id', auth.authenticate(), async (req, res) => {
        await mongoService.updateBoard(req.params.id, { name: req.body.name });
        res.status(204).send({
            message: `Board updated`
        });
    });

    // deletes a board by id
    router.delete('/board/:id', auth.authenticate(), async (req, res) => {
        await mongoService.deleteBoard(req.params.id);
        res.status(204).send({
            message: `Board deleted`
        });
    });
};

export default registerBoardApi;