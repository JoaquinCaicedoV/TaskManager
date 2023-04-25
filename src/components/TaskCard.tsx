import { Task, TasksStatusEnum } from '../types/Task';
import { updateTaskStatus } from '../services/taskService';

interface TaskCardProps {
    task: Task;
    onTaskUpdated: () => Promise<void>;
    id: number;
  }
  
export const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdated }) => {
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TasksStatusEnum;
    await updateTaskStatus(task.tasId, newStatus);
    onTaskUpdated();
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md ">
      <h2 className="text-2xl font-bold mb-2 ">{task.tasTitle}</h2>
      <p className="mb-4">{task.tasDescription}</p>
      <select
        value={task.tasStatus}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2"
      >
        {Object.values(TasksStatusEnum).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
