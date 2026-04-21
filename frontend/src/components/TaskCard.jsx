const TaskCard = ({ task, onToggle, onDelete }) => {
    // Exact tag colors from your UI
    const getSubjectStyle = (sub) => {
        const lower = (sub || '').toLowerCase();
        if (lower === 'biology') return { text: '#818cf8', bg: '#818cf815' }; // Indigo
        if (lower === 'math') return { text: '#a855f7', bg: '#a855f715' }; // Purple
        if (lower === 'history') return { text: '#3b82f6', bg: '#3b82f615' }; // Blue
        if (lower === 'english') return { text: '#ec4899', bg: '#ec489915' }; // Pink
        return { text: '#94a3b8', bg: '#94a3b815' }; // Default Slate
    };

    const style = getSubjectStyle(task.subject);
    const isDone = task.status === 'completed';

    return (
        <div style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            padding: '16px 24px',
            borderRadius: '16px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            {/* Custom Checkbox */}
            <div 
                onClick={() => onToggle(task._id, isDone ? 'pending' : 'completed')}
                style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: isDone ? '2px solid #10b981' : '2px solid #475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                }}
            >
                {isDone && <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
            </div>

            {/* Task Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: '500',
                    color: isDone ? '#475569' : 'var(--text-main)',
                    textDecoration: isDone ? 'line-through' : 'none'
                }}>
                    {task.title}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Subject Tag */}
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: style.bg,
                        color: style.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '12px' }}>🏷️</span> {task.subject || 'General'}
                    </span>

                    {/* Mock Due Date (To match your screenshot exactly) */}
                    <span style={{ fontSize: '12px', color: isDone ? '#475569' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        📅 Today, 4:00 PM
                    </span>
                </div>
            </div>

            {/* Delete Button (Appears on hover or standard) */}
            <button
                onClick={() => onDelete(task._id)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '18px',
                    opacity: 0.7
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.7}
                title="Delete Task"
            >
                ×
            </button>
        </div>
    );
};

export default TaskCard;