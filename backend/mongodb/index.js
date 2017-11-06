const url = 'mongodb://localhost:27017/test';
import Mongo from 'mongodb';
var bcrypt = require('bcrypt');
import _ from 'lodash';

const MongoClient = Mongo.MongoClient;
const ObjectId = Mongo.ObjectId;

let db;
let collections;

MongoClient.connect(url, async (err, database) => {
    db = database;
    collections = {
        boards: database ? db.collection('boards'): null,
        tasks: database ? db.collection('tasks'): null,
        users: database ? db.collection('users'): null
    };
    if (err) {
        console.log(err);
    }
});

const getUserIdByToken = async (token) => {
    const tk = token.slice(7);
    return collections.users.findOne({
        'token.accessToken': tk
    });
};

const createBoard = async (board, token) => {
    try {
        const user = await getUserIdByToken(token);
        const res = await collections.boards.insertOne({
            name: board.name,
            userId: user._id
        });
        return res.ops[0];
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getBoardsList = async (token) => {
    try {
        const user = await getUserIdByToken(token);
        const res = await collections.boards.find({
            userId: ObjectId(user._id)
        }).toArray();

        return res.map((board) => {
            return _.omit(board, ['userId'])
        });
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getBoard = async (boardId, token) => {
    try {
        const user = await getUserIdByToken(token);
        const res = await collections.boards.findOne({ _id: ObjectId(boardId) });
        if (res && res.userId.toString() == user._id.toString()) {
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const updateBoard = async (boardId, board, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });
        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.boards.updateOne(
                { _id: ObjectId(boardId) },
                { $set: { name: board.name } }
            );
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const deleteBoard = async (boardId, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });
        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.boards.remove(
                { _id: ObjectId(boardId) }
            );
            return res;
        }

        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const createTask = async (boardId, task, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });

        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.tasks.insertOne({
                name: task.name,
                description: task.description,
                status: task.status,
                boardId: boardId
            });
            return res.ops[0];
        }

        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getTasksList = async (boardId, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });

        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.tasks.find({
                boardId: boardId
            }).toArray();
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};
const getTask = async (boardId, taskId, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });

        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.tasks.findOne({
                _id: ObjectId(taskId),
                boardId: boardId
            });
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const updateTask = async (boardId, taskId, task, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });

        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.tasks.updateOne(
                { _id: ObjectId(taskId), boardId: boardId },
                {
                    $set: {
                        name: task.name,
                        description: task.description,
                        status: task.status,
                    }
                }
            );
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const deleteTask = async (boardId, taskId, token) => {
    try {
        const user = await getUserIdByToken(token);
        const existing = await collections.boards.findOne({ _id: ObjectId(boardId) });

        if (existing && existing.userId.toString() == user._id.toString()) {
            const res = await collections.tasks.remove(
                { _id: ObjectId(taskId), boardId: boardId }
            );
            return res;
        }
        return 'Unauthorized';
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const createUser = async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 10);
        const res = await collections.users.insertOne({
            username: user.username,
            password: hash,
            token: null
        });
        return res.ops[0];
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const saveAccessToken = async (token, client, user) => {
    try {
        await collections.users.updateOne(
            { _id: ObjectId(user._id) },
            {
                $set: {
                    token: {
                        accessToken: token.accessToken,
                        accessTokenExpiresAt: token.accessTokenExpiresAt,
                        client: {
                            id: client.id
                        }
                    }

                }
            }
        )
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getUser = async (username, password) => {
    try {
        const res = await collections.users.findOne({
            username: username
        });
        if (res) {
            const comp = await bcrypt.compare(password, res.password);
            if (comp) {
                return res;
            }
        }
        return false;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getAccessToken = async (token) => {
    try {
        const res = await collections.users.findOne({
            'token.accessToken': token
        });
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

export default {
    createBoard,
    getBoardsList,
    getBoard,
    updateBoard,
    deleteBoard,
    createTask,
    getTasksList,
    getTask,
    updateTask,
    deleteTask,
    createUser,
    saveAccessToken,
    getUser,
    getAccessToken
}