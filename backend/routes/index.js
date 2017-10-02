import registerBoard from './board';
import registerTask from './task';

const registerApi = (router) => {
    registerBoard(router);
    registerTask(router);
};

export default registerApi;