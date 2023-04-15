const Task = ({ title, description, id, handleUpdate, handleRemove, category }) => {
  return (
    <div
      className='task'
      onClick={() => handleUpdate(id)}
    >
      <h2 className='task-name over-hide'>{title}</h2>
      <p className='task-details'>{description}</p>
      <div className='remove-bar' onClick={(e) => handleRemove(e,id, category)}>
        -
      </div>
    </div>
  );
};

export default Task;
