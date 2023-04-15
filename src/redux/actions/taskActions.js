export const actionTypes = {
    FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',

    CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
    CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
    CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',

    DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE',

    UPDATE_TASK_REQUEST: "UPDATE_TASK_REQUEST",
    UPDATE_TASK_SUCCESS: "UPDATE_TASK_SUCCESS",
    UPDATE_TASK_FAILURE: "UPDATE_TASK_FAILURE",


    FETCH_EVENTS_REQUEST: 'FETCH_EVENTS_REQUEST',
    FETCH_EVENTS_SUCCESS: 'FETCH_EVENTS_SUCCESS',
    FETCH_EVENTS_FAILURE: 'FETCH_EVENTS_FAILURE',

    CREATE_EVENT_REQUEST: 'CREATE_EVENT_REQUEST',
    CREATE_EVENT_SUCCESS: 'CREATE_EVENT_SUCCESS',
    CREATE_EVENT_FAILURE: 'CREATE_EVENT_FAILURE',

    DELETE_EVENT_REQUEST: 'DELETE_EVENT_REQUEST',
    DELETE_EVENT_SUCCESS: 'DELETE_EVENT_SUCCESS',
    DELETE_EVENT_FAILURE: 'DELETE_EVENT_FAILURE',
};

export const fetchTasksRequest = () => ({
    type: actionTypes.FETCH_TASKS_REQUEST
});

export const createTaskRequest = ({ task, category, eventId }) => ({
    type: actionTypes.CREATE_TASK_REQUEST,
    payload: { task, category, eventId },
});

export const deleteTaskRequest = (taskId, category, eventId) => ({
    type: actionTypes.DELETE_TASK_REQUEST,
    payload: { taskId, category, eventId },
  });

export const updateTaskRequest = (task) => ({
    type: actionTypes.UPDATE_TASK_REQUEST,
    payload: task
});

export const fetchEventsRequest = () => ({
    type: actionTypes.FETCH_EVENTS_REQUEST,
});

export const createEventRequest = (event) => ({
    type: actionTypes.CREATE_EVENT_REQUEST,
    payload: event,
});

export const deleteEventRequest = (id) => ({
    type: actionTypes.DELETE_EVENT_REQUEST,
    payload: id,
});