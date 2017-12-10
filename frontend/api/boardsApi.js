export const createBoardRequest = async (board) => {
    const res = await fetch(
        `http://localhost:8080/api/board`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        }
    );
};

export const getBoardsRequest =  async () => {
    const res = await fetch(
        'http://localhost:8080/api/board',
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

export const getBoardRequest =  async (boardId) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}`,
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

export const updateBoardRequest = async (board) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${board._id}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        }
    );
};

export const deleteBoardRequest =  async (boardId) => {
    const res = await fetch(
        `http://localhost:8080/api/board/${boardId}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    return res.status === 204;
};