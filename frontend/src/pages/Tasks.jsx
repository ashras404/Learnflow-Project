import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../services/taskAPI';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createTask({ title, subject });
            setTitle(''); // clear input
            setSubject(''); // clear input
            loadTasks(); // refresh list
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    const handleToggle = async (id, newStatus) => {
        try {
            await updateTaskStatus(id, newStatus);
            loadTasks();
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            loadTasks();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>My Tasks</h2>
            
            {/* Task Form */}
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Subject (e.g. Math)" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                />
                <button type="submit">Add Task</button>
            </form>

            {/* Task List */}
            <div>
                {tasks.length === 0 ? <p>No tasks yet. Add one above!</p> : null}
                {tasks.map(task => (
                    <TaskCard 
                        key={task._id} 
                        task={task} 
                        onToggle={handleToggle} 
                        onDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Tasks;