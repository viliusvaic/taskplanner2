const url = 'mongodb://localhost:27017/test';
import Mongo from 'mongodb';
var bcrypt = require('bcrypt');

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

const createBoard = async (board) => {
    try {
        const res = await collections.boards.insertOne({
            name: board.name
        });
        return res.ops[0];
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getBoardsList = async () => {
    try {
        const res = await collections.boards.find().toArray();
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getBoard = async (boardId) => {
    try {
        const res = await collections.boards.findOne({ _id: ObjectId(boardId) });
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const updateBoard = async (boardId, board) => {
    try {
        const res = await collections.boards.updateOne(
            { _id: ObjectId(boardId) },
            { $set: { name: board.name } }
        );
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const deleteBoard = async (boardId) => {
    try {
        const res = await collections.boards.remove(
            { _id: ObjectId(boardId) }
        );
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const createTask = async (boardId, task) => {
    try {
        const res = await collections.tasks.insertOne({
            name: task.name,
            description: task.description,
            status: task.status,
            boardId: boardId
        });
        return res.ops[0];
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const getTasksList = async (boardId) => {
    try {
        const res = await collections.tasks.find({
            boardId: boardId
        }).toArray();
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};
const getTask = async (boardId, taskId) => {
    try {
        const res = await collections.tasks.findOne({
            _id: ObjectId(taskId),
            boardId: boardId
        });
        return res;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const updateTask = async (boardId, taskId, task) => {
    try {
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
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};

const deleteTask = async (boardId, taskId) => {
    try {
        const res = await collections.tasks.remove(
            { _id: ObjectId(taskId), boardId: boardId }
        );
        return res;
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