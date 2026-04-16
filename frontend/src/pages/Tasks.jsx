import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../services/taskAPI';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try { const data = await fetchTasks(); setTasks(data); } 
    catch (err) { console.error(err); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, subject });
      setTitle(''); setSubject(''); loadTasks();
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (id, status) => {
    try { await updateTaskStatus(id, status); loadTasks(); } 
    catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try { await deleteTask(id); loadTasks(); } 
    catch (err) { console.error(err); }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header Section */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          My Tasks
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>
          You have <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{pendingTasks.length}</span> tasks to complete today.
        </p>
      </header>

      {/* Input Section */}
      <form onSubmit={handleCreate} style={{
        display: 'flex',
        gap: '12px',
        backgroundColor: '#16161e',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #262626',
        marginBottom: '32px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            flex: 2,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            outline: 'none',
            fontSize: '15px'
          }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            flex: 1,
            background: '#0f0f12',
            border: '1px solid #262626',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#6366f1',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          Add Task
        </button>
      </form>

      {/* List Section */}
      <div>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', border: '2px dashed #262626', borderRadius: '16px' }}>
            <p style={{ color: '#475569' }}>No tasks found. Add one above to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;