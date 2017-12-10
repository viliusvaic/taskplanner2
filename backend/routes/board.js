import mongoService from '../mongodb';

const registerBoardApi = (router, auth) => {
    // creates a new board
    router.post('/api/board', auth.authenticate(), async (req, res) => {
        const result = await mongoService.createBoard(
            {
                name: req.body.name,
                description: req.body.description
            },
            req.get('Authorization')
        );
        res.status(201).send({
            result
        });
    });

    // gets all boards list
    router.get('/api/board', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getBoardsList(req.get('Authorization'));
        if (result !== 'Error') {
            res.status(200).send({
                result
            });
        } else {
            res.status(404).send();
        }

    });

    // gets a board by id
    router.get('/api/board/:id', auth.authenticate(), async (req, res) => {
        const result = await mongoService.getBoard(req.params.id, req.get('Authorization'));
        if (result !== 'Error') {
            res.status(200).send({
                result
            });
        } else {
            res.status(404).send();
        }

    });

    // updates a board by id
    router.put('/api/board/:id', auth.authenticate(), async (req, res) => {
        await mongoService.updateBoard(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description
            },
            req.get('Authorization')
        );
        res.status(204).send({
            message: `Board updated`
        });
    });

    // deletes a board by id
    router.delete('/api/board/:id', auth.authenticate(), async (req, res) => {
        await mongoService.deleteBoard(req.params.id, req.get('Authorization'));
        res.status(204).send({
            message: `Board deleted`
        });
    });
};

export default registerBoardApi;