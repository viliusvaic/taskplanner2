const url = 'mongodb://localhost:27017/test';
import Mongo from 'mongodb';

const MongoClient = Mongo.MongoClient;
const ObjectId = Mongo.ObjectId;

let db;
let collections;

MongoClient.connect(url, async (err, database) => {
    db = database;
    collections = {
        boards: database ? db.collection('boards'): null,
        tasks: database ? db.collection('tasks'): null
    };
    const res = await collections.boards.find();
    console.log(res);
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
    deleteTask
}