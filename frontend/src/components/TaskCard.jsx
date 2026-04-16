const TaskCard = ({ task, onToggle, onDelete }) => {
    return (
        <div style={{ border: '1px solid gray', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
            <h3>{task.title} {task.status === 'completed' && '✅'}</h3>
            {task.subject && <p><strong>Subject:</strong> {task.subject}</p>}
            
            <button onClick={() => onToggle(task._id, task.status === 'pending' ? 'completed' : 'pending')}>
                Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
            <button onClick={() => onDelete(task._id)} style={{ color: 'red', marginLeft: '10px' }}>
                Delete
            </button>
        </div>
    );
};

export default TaskCard;