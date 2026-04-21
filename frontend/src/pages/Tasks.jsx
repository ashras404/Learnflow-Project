import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../services/taskAPI';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('All'); // 'All', 'Pending', 'Completed'

    useEffect(() => { loadTasks(); }, []);

    const loadTasks = async () => {
        try { const data = await fetchTasks(); setTasks(data); } 
        catch (err) { console.error(err); }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createTask({ title, subject });
            setTitle(''); setSubject(''); setShowForm(false); loadTasks();
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

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        if (filter === 'Pending') return task.status === 'pending';
        if (filter === 'Completed') return task.status === 'completed';
        return true;
    });

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Header Section */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 8px 0' }}>
                        Tasks
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', margin: 0 }}>
                        Manage your assignments and study goals.
                    </p>
                </div>
                
                <button 
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        backgroundColor: 'var(--primary)', color: 'white', border: 'none',
                        padding: '10px 20px', borderRadius: '30px', fontWeight: '600',
                        fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>+</span> Add Task
                </button>
            </header>

            {/* Hidden Input Form (Toggles when you click + Add Task) */}
            {showForm && (
                <form onSubmit={handleCreate} style={{
                    display: 'flex', gap: '12px', backgroundColor: 'var(--bg-card)', 
                    padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px'
                }}>
                    <input type="text" placeholder="Task description..." value={title} onChange={(e) => setTitle(e.target.value)} required 
                        style={{ flex: 2, background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'white', padding: '12px', borderRadius: '8px', outline: 'none' }} />
                    <input type="text" placeholder="Subject (e.g. Math)" value={subject} onChange={(e) => setSubject(e.target.value)} 
                        style={{ flex: 1, background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'white', padding: '12px', borderRadius: '8px', outline: 'none' }} />
                    <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                        Save
                    </button>
                </form>
            )}

            {/* Filters Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ 
                    display: 'inline-flex', backgroundColor: 'var(--bg-card)', 
                    padding: '6px', borderRadius: '12px', gap: '4px' 
                }}>
                    {['All', 'Pending', 'Completed'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            style={{
                                background: filter === tab ? 'var(--border)' : 'transparent',
                                color: filter === tab ? 'var(--text-main)' : 'var(--text-muted)',
                                border: 'none', padding: '8px 20px', borderRadius: '8px',
                                fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <span>▽</span> Filter
                </div>
            </div>

            {/* Task List Container */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredTasks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ color: '#475569', fontSize: '15px' }}>No tasks found in this view.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskCard key={task._id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Tasks;