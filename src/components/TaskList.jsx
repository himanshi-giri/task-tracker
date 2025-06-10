import TaskItem from './TaskItem';
import './TaskList.css';
// Component to display the list of tasks
function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;