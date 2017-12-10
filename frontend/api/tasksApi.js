export const getTasksRequest =  async (boardId) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}/task`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    const json = await  res.json();
    return json.result;
};

export const getTaskRequest =  async (boardId, taskId) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}/task/${taskId}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    const json = await  res.json();
    return json.result;
};

export const updateTaskRequest =  async (boardId, task) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}/task/${task._id}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
    );

    return res.status === 204;
};

export const deleteTaskRequest =  async (boardId, taskId) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}/task/${taskId}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    return res.status === 204;
};

export const createTaskRequest = async (boardId, task) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}/task`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
    );
};