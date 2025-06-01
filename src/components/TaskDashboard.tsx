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

const API_URL = 'http://localhost:8000';

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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


  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>ACCOUNTABILITY SYSTEM</h1>
      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <span className={`priority-${task.priority}`}>P{task.priority}</span>
            <button onClick={() => deleteTask(task.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;