import registerBoard from './board';
import registerTask from './task';
import registerUser from './user';

const registerApi = (router, auth) => {
    registerBoard(router, auth);
    registerTask(router, auth);
    registerUser(router);
};

export default registerApi;