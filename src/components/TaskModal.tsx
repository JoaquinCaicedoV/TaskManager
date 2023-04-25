import React from 'react';
import TaskForm from './TaskForm';
import { Task } from '../types/Task';
import {createTask } from '../services/taskService';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onTaskCreated: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onTaskCreated }) => {
  const handleTaskSave = async (tasTitle: string, tasDescription: string, tasDueDate: string) => {
    await createTask({ tasTitle, tasDescription, tasDueDate });
    onTaskCreated();
    onClose();
  };

  return (
    <div className="task-modal-backdrop" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <TaskForm onSubmit={handleTaskSave} onTaskCreated={onTaskCreated} />
      </div>
    </div>
  );
};

export default TaskModal;
