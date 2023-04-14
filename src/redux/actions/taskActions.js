export const actionTypes = {
    FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',

    CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
    CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
    CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',

    DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE'
};

export const fetchTasksRequest = () => ({
    type: actionTypes.FETCH_TASKS_REQUEST
});

export const createTaskRequest = (task) => ({
    type: actionTypes.CREATE_TASK_REQUEST,
    payload: task
});

export const deleteTaskRequest = (id) => ({
    type: actionTypes.DELETE_TASK_REQUEST,
    payload: id
});