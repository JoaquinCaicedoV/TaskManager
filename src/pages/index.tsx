import React, { useState, useEffect } from 'react';
import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import { Task, TasksStatusEnum } from '../types/Task';
import { fetchTasks, createTask, deleteTask, updateTaskStatus } from '../services/taskService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const mainClass = selectedTask ? 'main-container blurred' : 'main-container';

  const loadTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskCreate = async (tasTitle: string, tasDescription: string, tasDueDate: string) => {
    try {
      const newTask = await createTask({ tasTitle, tasDescription, tasDueDate });
      setTasks([...tasks, newTask]);
      setSelectedTask(null);
      const newTaskElement = document.getElementById(`task-${newTask.tasId}`);
      if (newTaskElement) {
        newTaskElement.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log("Error creating task", error);
    }
  };
  
  const handleTaskStatusUpdate = async (taskId: number, newStatus: TasksStatusEnum) => {
    await updateTaskStatus(taskId, newStatus);
    loadTasks();
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.tasId !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error deleting the task", error);
    }
  };

  const handleTaskDeleted = async () => {
    loadTasks();
  };

  const handleTaskSelected = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className={mainClass}>
      <img src="/images/logoTask.png" alt="Task Manager" className="my-5 mx-auto d-block logo"/>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onTaskCreated={loadTasks}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <TaskList
        tasks={tasks}
        onUpdateStatus={handleTaskStatusUpdate}
        onDelete={handleTaskDelete}
        onTaskDeleted={handleTaskDeleted}
        onTaskSelected={handleTaskSelected}
        onTaskCreate={handleTaskCreate}
        onCreateButtonClick={ () => setSelectedTask({ tasId: 0, tasTitle: '', tasDescription: '', tasDueDate: '', tasStatus: TasksStatusEnum.Pending }) }
      />
    </div>
  );
};

export default App;
