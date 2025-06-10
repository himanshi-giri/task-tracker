import { useState } from 'react';

// Component for individual task item
function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [isChecked, setCheckBox] = useState(false);

  // Handle task update
  const handleUpdate = (e) => {
    e.preventDefault();
    const success = updateTask(task.id, { name: editName, priority: editPriority });
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    
    <li className="task-item">
    {isEditing ? (
        <form onSubmit={handleUpdate} >
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          style={{fontSize:"20px", margin:"5px"}}/>
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            style={{fontSize:"20px", margin:"5px"}}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit" style={{fontSize:"20px", margin:"5px"}}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{fontSize:"20px", margin:"5px"}}>Cancel</button>
        </form>
      ) : (
        
        <>
         
          <span className={`priority-${task.priority.toLowerCase()}`} style={{fontSize:"25px", textDecoration: isChecked ? "line-through" : "none"}}>
            {task.name}   ({task.priority})     
          </span>
          <div>
            <button onClick={() => setIsEditing(true)} style={{margin:"10px", padding:"3px", fontSize:"15px"}}>Edit</button>
            
            <button onClick={() => deleteTask(task.id)}  style={{margin:"10px", padding:"3px", fontSize:"15px"}}>Delete</button>
            <input type="checkbox" checked={isChecked} onClick={(e) => {setCheckBox(e.target.value)}} style={{margin:"10px", padding:"3px", fontSize:"15px"}}/>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;