import React, { useEffect , useState } from 'react';
import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventsRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from '../redux/actions/taskActions';

const Column = ({ tag, currentEvent }) => {
  const [isLoading, setIsLoading] = useState(false);
  // console.log(currentEvent);
  
  const dispatch = useDispatch();
  
  const category =
    tag == 'To do' ? 'todo' : tag == 'In progress' ? 'inProgress' : 'completed';

  const handleAdd = () => {
    if (currentEvent == undefined) {
      return alert('Iltimos Eventlardan tanlang yoki yangi event oching !');
    }
    const title = prompt('Enter task title:');
    const description = prompt('Enter description:');
    if (!(title && description)) return;
    const task = { title, description };
    dispatch(createTaskRequest({ task, category, eventId: currentEvent.id }));
    setIsLoading(true);
  };

  const handleRemove = (e,id, category, eventId) => {
    e.stopPropagation();
    dispatch(deleteTaskRequest(id, category, currentEvent.id));
    console.log(id, category);
  };

  const handleUpdate = (id) => {
    const name = prompt('Update task name:');
    const description = prompt('Update description:');
    if (!(name && description)) return;
    const updatedTask = { id, name, description };
    dispatch(updateTaskRequest(updatedTask, tag, currentEvent.id));
    dispatch(fetchEventsRequest());
  };


  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchEventsRequest());
    }
    setIsLoading(false)
  }, [dispatch, isLoading]);

  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />

      <div className='task-container'>
        {currentEvent &&
          currentEvent[category]?.map((item) => {
            return (
              <Task
                title={item.title}
                description={item.description}
                category={category}
                id={item.id}
                key={item.id}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            );
          })}
      </div>
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
