const Task = ({ name, description, id, provided, handleUpdate, handleRemove }) => {
  return (
    <div
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleUpdate(id)}
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>{description}</p>
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        -
      </div>
    </div>
  );
};

export default Task;
