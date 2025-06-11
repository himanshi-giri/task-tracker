import { useState } from 'react';

// Multi-step form for adding tasks
function TaskForm({ addTask, error }) {
  const [step, setStep] = useState(1);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!taskName.trim()) {
        alert("Enter task name and then proceed further");
       return;
      }
      setStep(2);
    } else {
      const success = addTask({ name: taskName, priority, dueDate });
      if (success) {
        setTaskName('');
        setPriority('Low');
        setDueDate('');
        setStep(1);
      }
    }
  };

  // Go back to previous step
  const handleBack = () => {
    setStep(1);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {step === 1 ? (
        <div className="form-step" style={{fontSize:"28px", margin:"5px"}}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            style={{fontSize:"28px", margin:"5px"}}
          />
          <br />
          <label htmlFor="taskName">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{fontSize:"28px", margin:"5px"}}
          />
          <button type="submit" style={{fontSize:"28px", margin:"5px"}}>Next</button>
        </div>
      ) : (
        <div className="form-step" >
          <label htmlFor="priority" style={{fontSize:"28px", margin:"5px"}}>Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{fontSize:"20px", margin:"5px"}}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            
          </select>
          <div>
            <button type="button" onClick={handleBack} style={{fontSize:"20px", margin:"10px"}}>Back</button>
            <button type="submit"style={{fontSize:"20px", margin:"10px"}}>Add Task</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default TaskForm;