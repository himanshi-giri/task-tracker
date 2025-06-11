import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import './App.css';

// Main App component
function App() {
  // State for tasks, search term, form error, and localStorage status
  const [tasks, setTasks] = useState(null); // Initialize as null to defer loading
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Initializing...');

  // Load tasks from localStorage and save when tasks change
  useEffect(() => {

    // Load tasks on mount
    if (tasks === null) {
      try {
        const storedTasks = localStorage.getItem('tasks');
        console.log('Retrieved from localStorage:', storedTasks);
        let parsedTasks = [];
        if (storedTasks) {
          parsedTasks = JSON.parse(storedTasks);
          if (!Array.isArray(parsedTasks)) {
            console.warn('Stored tasks are not an array, resetting to empty.');
            parsedTasks = [];
          }
          parsedTasks = parsedTasks.map(task => ({
            ...task,
            dueDate: task.dueDate || '',
          }));
        }
        setTasks(parsedTasks);
        setStatus(`Loaded ${parsedTasks.length} tasks from localStorage.`);
      } catch (e) {
        console.error('Error loading tasks from localStorage:', e);
        setStatus(`Error loading tasks: ${e.message}`);
        setTasks([]);
      }
      return; // Skip saving on initial load
    }

    // Save tasks when they change
    try {
      if (Array.isArray(tasks) && tasks.length > 0) {
        console.log('Saving to localStorage:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setStatus(`Saved ${tasks.length} tasks to localStorage.`);
      } else if (tasks.length === 0) {
        console.log('Clearing localStorage (no tasks).');
        localStorage.setItem('tasks', '[]'); // Explicitly set empty array
        setStatus('No tasks to save.');
      }
    } catch (e) {
      console.error('Error saving tasks to localStorage:', e);
      setStatus(`Error saving tasks: ${e.message}`);
    }
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    if (!task.name.trim()) {       //input validation
      alert('Task name cannot be empty');
      return false;
    }
    const newTask = { ...task, id: Date.now(), dueDate: task.dueDate || '' };
    setTasks([...tasks, newTask]);
    setError('');
    console.log('Task added:', newTask);
    return true;
  };

  // Update an existing task
  const updateTask = (id, updatedTask) => {
    if (!updatedTask.name.trim()) {
     alert('Task name cannot be empty');
      return false;
    }
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === id ? { ...updatedTask, id, dueDate: updatedTask.dueDate ||'' } : task)
    );
    setError('');
    console.log('Task updated:', updatedTask);
    return true;
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    console.log('Task deleted, ID:', id);
  };

  // Filter tasks based on search term
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Show loading state until tasks are initialized
  if (tasks === null) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="app-container" >
      <h1 className="app-title">My Tasks </h1>
      <div className="info" >
        <strong>Total tasks:</strong> {tasks.length}
        <br/>
        <strong>Status: </strong> {status} 
      </div>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TaskForm addTask={addTask} error={error} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;