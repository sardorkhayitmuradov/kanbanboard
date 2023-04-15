import React from 'react';
import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import { useDispatch } from "react-redux";
import { createTaskRequest, updateTaskRequest, deleteTaskRequest } from "../redux/actions/taskActions";

const Column = ({ tag, currentEvent }) => {
  console.log(tag)

  const dispatch = useDispatch();

  const handleAdd = () => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter description:");
    if (!(title && description)) return;
    const task = { title, description };
    const category = tag === 'To do' ? 'todo' : tag === 'In progress' ? 'inProgress' : 'completed';
    dispatch(createTaskRequest({ task, category, eventId: currentEvent.id }));
  };

  // const handleAdd = useCallback(
  //   (eventId, category) => {
  //     const taskName = prompt("Enter the task name:");
  //     if (!taskName) {
  //       return;
  //     }

  //     const newTask = {
  //       id: Date.now(), // Generate a unique ID for the task
  //       name: taskName,
  //       description: "", // You can prompt for a description if needed
  //     };

  //     dispatch(
  //       createTaskRequest({
  //         eventId,
  //         category,
  //         task: newTask,
  //       })
  //     );
  //   },
  //   [dispatch]
  // );

  const handleRemove = (id, e) => {
    e.stopPropagation();
    dispatch(deleteTaskRequest(id, tag, currentEvent.id));
  };

  const handleUpdate = (id) => {
    const name = prompt("Update task name:");
    const description = prompt("Update description:");
    if (!(name && description)) return;
    const updatedTask = { id, name, description };
    dispatch(updateTaskRequest(updatedTask, tag, currentEvent.id));
  };

  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <div
              className='task-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {currentEvent[tag]?.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Task
                      name={item.name}
                      description={item.description}
                      id={item.id}
                      provided={provided}
                      snapshot={snapshot}
                      handleRemove={handleRemove}
                      handleUpdate={handleUpdate}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;


// const handleAdd = () => {
//   const name = prompt('Enter task name:');
//   const description = prompt('Enter description:');
//   if (!(name && description)) return;
//   setEvents((prev) => {
//     const arrCopy = [...prev];
//     const index = prev.findIndex(
//       (event) => event.title === currentEvent.title
//     );
//     const eventCopy = arrCopy[index];
//     // Remove old and add the latest data
//     arrCopy.splice(index, 1, {
//       ...eventCopy,
//       [tag]: [
//         ...eventCopy[tag],
//         { name: name, id: uuid(), description: description },
//       ],
//     });
//     return arrCopy;
//   });
// };

// const handleRemove = (id, e) => {

//   e.stopPropagation();
//   setEvents((prev) =>
//     prev.map((event) => {
//       if (event.title === currentEvent.title) {
//         const taskList = event[tag];
//         const index = taskList.findIndex((item) => item.id === id);
//         taskList.splice(index, 1);
//         return { ...event, [tag]: [...taskList] };
//       } else {
//         return event;
//       }
//     })
//   );
// };

// const handleUpdate = (id) => {
//   const name = prompt('Update task name:');
//   const description = prompt('Update description:');
//   if (!(name && description)) return;
//   setEvents((prev) =>
//     prev.map((event) => {
//       if (event.title === currentEvent.title) {
//         const taskList = event[tag];
//         const index = taskList.findIndex((item) => item.id === id);
//         const updatedTask = {
//           ...taskList[index],
//           name,
//           description,
//         };
//         taskList.splice(index, 1);
//         return { ...event, [tag]: [...taskList, updatedTask] };
//       } else {
//         return event;
//       }
//     })
//   );
// };
