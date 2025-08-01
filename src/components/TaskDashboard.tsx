// src/components/TaskDashboard.tsx
import React, { useState, useEffect } from 'react';
import './TaskDashboard.css';

interface Task {
  id: number;
  title: string;
  description: string | null;
  category: string;
  priority: number;
  due_date: string | null;
  is_recurring: boolean;
  recurrence_pattern: string | null;
  is_active: boolean;
  created_at: string;
}

interface TaskCreate {
  title: string;
  description?: string;
  category: 'physical' | 'mental' | 'social' | 'financial';
  priority: number;
  due_date?: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
}

const API_URL = 'https://tasks-api-71v5.onrender.com';
//const API_URL = 'http://localhost:8000';

const ADMIN_PASSWORD = 'kangz123'; // Change this

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completingTask, setCompletingTask] = useState<Task | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [newTask, setNewTask] = useState<TaskCreate>({
    title: '',
    description: '',
    category: 'physical',
    priority: 3,
    is_recurring: false
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPassword('');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        setShowCreateForm(false);
        setNewTask({
          title: '',
          description: '',
          category: 'physical',
          priority: 3,
          is_recurring: false
        });
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const completeTask = async (task: Task) => {
    setCompletingTask(task);
    setShowCompleteModal(true);
  };

  const submitCompletion = async () => {
    if (!completingTask) return;
    
    let body: any = undefined;
    if (completionNotes.trim()) {
      body = { notes: completionNotes };
    }
    
    try {
      const response = await fetch(`${API_URL}/api/tasks/disable/${completingTask.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Error:', error);
        showNotification('Failed to complete task', 'error');
        return;
      }
      
      const result = await response.json();
      showNotification(result.message || 'Task completed!', 'success');
      
      // Reset modal state
      setShowCompleteModal(false);
      setCompletingTask(null);
      setCompletionNotes('');
      fetchTasks();
    } catch (error) {
      console.error('Failed to complete task:', error);
      showNotification('Failed to complete task', 'error');
    }
  };

  const cancelCompletion = () => {
    setShowCompleteModal(false);
    setCompletingTask(null);
    setCompletionNotes('');
  };

  const deleteTask = async (id: number) => {
    if (confirm('Permanently delete this task?')) {
      await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'NO DEADLINE';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `OVERDUE BY ${Math.abs(diffDays)}D`;
    if (diffDays === 0) return 'DUE TODAY';
    if (diffDays === 1) return 'DUE TOMORROW';
    return `DUE IN ${diffDays}D`;
  };

  if (loading) return <div className="container">LOADING...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>ACCOUNTABILITY SYSTEM</h1>
        <div className="header-actions">
          {!isAdmin && (
            <button className="admin-btn" onClick={() => setShowPasswordPrompt(true)}>
              [🔒] ADMIN
            </button>
          )}
          {isAdmin && (
            <>
              <button className="create-btn" onClick={() => setShowCreateForm(true)}>
                [+] CREATE TASK
              </button>
              <button className="logout-btn" onClick={() => setIsAdmin(false)}>
                [X] LOGOUT
              </button>
            </>
          )}
        </div>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {showPasswordPrompt && (
        <div className="modal-overlay" onClick={() => setShowPasswordPrompt(false)}>
          <form className="password-form" onClick={e => e.stopPropagation()} onSubmit={checkPassword}>
            <h2>ADMIN ACCESS</h2>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="ENTER PASSWORD"
              autoFocus
            />
            <button type="submit">ACCESS</button>
          </form>
        </div>
      )}

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <form className="create-form" onClick={e => e.stopPropagation()} onSubmit={createTask}>
            <h2>NEW TASK</h2>
            
            <div className="form-group">
              <label>TITLE*</label>
              <input
                type="text"
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>DESCRIPTION</label>
              <textarea
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CATEGORY</label>
                <select
                  value={newTask.category}
                  onChange={e => setNewTask({...newTask, category: e.target.value as any})}
                >
                  <option value="physical">PHYSICAL</option>
                  <option value="mental">MENTAL</option>
                  <option value="social">SOCIAL</option>
                  <option value="financial">FINANCIAL</option>
                </select>
              </div>

              <div className="form-group">
                <label>PRIORITY</label>
                <select
                  value={newTask.priority}
                  onChange={e => setNewTask({...newTask, priority: parseInt(e.target.value)})}
                >
                  <option value={1}>1 - LOW</option>
                  <option value={2}>2 - MEDIUM</option>
                  <option value={3}>3 - NORMAL</option>
                  <option value={4}>4 - HIGH</option>
                  <option value={5}>5 - CRITICAL</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>DUE DATE</label>
              <input
                type="datetime-local"
                value={newTask.due_date}
                onChange={e => setNewTask({...newTask, due_date: e.target.value})}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newTask.is_recurring}
                  onChange={e => setNewTask({...newTask, is_recurring: e.target.checked})}
                />
                RECURRING TASK
              </label>
            </div>

            {newTask.is_recurring && (
              <div className="form-group">
                <label>RECURRENCE PATTERN</label>
                <input
                  type="text"
                  value={newTask.recurrence_pattern}
                  onChange={e => setNewTask({...newTask, recurrence_pattern: e.target.value})}
                  placeholder="e.g., daily, weekly, monthly"
                />
              </div>
            )}

            <div className="form-actions">
              <button type="submit">CREATE</button>
              <button type="button" onClick={() => setShowCreateForm(false)}>CANCEL</button>
            </div>
          </form>
        </div>
      )}

      {showCompleteModal && completingTask && (
        <div className="modal-overlay" onClick={cancelCompletion}>
          <div className="complete-modal" onClick={e => e.stopPropagation()}>
            <h2>COMPLETE TASK</h2>
            <div className="task-info">
              <p className="task-title">{completingTask.title}</p>
              <span className={`priority priority-${completingTask.priority}`}>
                P{completingTask.priority} - {completingTask.category.toUpperCase()}
              </span>
            </div>
            
            <div className="form-group">
              <label>COMPLETION NOTES (OPTIONAL)</label>
              <textarea
                value={completionNotes}
                onChange={e => setCompletionNotes(e.target.value)}
                placeholder="Add any notes about this completion..."
                rows={4}
                autoFocus
              />
            </div>
            
            <div className="modal-actions">
              <button className="complete-confirm-btn" onClick={submitCompletion}>
                [✓] COMPLETE
              </button>
              <button className="complete-skip-btn" onClick={() => {
                setCompletionNotes('');
                submitCompletion();
              }}>
                [→] SKIP NOTES
              </button>
              <button className="cancel-btn" onClick={cancelCompletion}>
                [X] CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`priority priority-${task.priority}`}>P{task.priority}</span>
            </div>
            
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            
            <div className="task-meta">
              <span className="category">[{task.category.toUpperCase()}]</span>
              <span className={`due-date ${task.due_date && new Date(task.due_date) < new Date() ? 'overdue' : ''}`}>
                {formatDate(task.due_date)}
              </span>
            </div>
            
            {task.is_recurring && (
              <div className="recurring-badge">
                ⟳ {task.recurrence_pattern?.toUpperCase()}
              </div>
            )}
            
            {isAdmin && (
              <div className="task-actions">
                <button className="complete-btn" onClick={() => completeTask(task)}>
                  [✓] COMPLETE
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  [X] DELETE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>NO ACTIVE TASKS</p>
          <p className="dim">CREATE YOUR FIRST TASK TO GET STARTED</p>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;