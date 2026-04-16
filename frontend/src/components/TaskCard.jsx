const TaskCard = ({ task, onToggle, onDelete }) => {
  // Define subject-specific accent colors
  const getSubjectStyle = (sub) => {
    const subjects = {
      math: { bg: '#8b5cf622', text: '#a78bfa', border: '#8b5cf644' },
      biology: { bg: '#10b98122', text: '#34d399', border: '#10b98144' },
      physics: { bg: '#3b82f622', text: '#60a5fa', border: '#3b82f644' },
      chemistry: { bg: '#f59e0b22', text: '#fbbf24', border: '#f59e0b44' },
    };
    return subjects[sub?.toLowerCase()] || { bg: '#33415522', text: '#94a3b8', border: '#33415544' };
  };

  const style = getSubjectStyle(task.subject);

  return (
    <div style={{
      backgroundColor: '#16161e',
      border: '1px solid #262626',
      padding: '16px 20px',
      borderRadius: '12px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`
          }}>
            {task.subject || 'General'}
          </span>
          {task.status === 'completed' && (
            <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '500' }}>✓ Done</span>
          )}
        </div>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          color: task.status === 'completed' ? '#475569' : '#f8fafc',
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          fontWeight: '500'
        }}>
          {task.title}
        </h3>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggle(task._id, task.status === 'pending' ? 'completed' : 'pending')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: task.status === 'completed' ? '#334155' : 'transparent',
            color: '#f8fafc',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {task.status === 'pending' ? 'Complete' : 'Undo'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#ef444411',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;