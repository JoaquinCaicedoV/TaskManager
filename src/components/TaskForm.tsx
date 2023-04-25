import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (tasTitle: string, tasDescription: string, tasDueDate: string) => Promise<void>;
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onTaskCreated }) => {
  const [tasTitle, setTasTitle] = useState('');
  const [tasDescription, setTasDescription] = useState('');
  const [tasDueDate, setTasDueDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmit(tasTitle, tasDescription, tasDueDate);
      setTasTitle('');
      setTasDescription('');
      setTasDueDate('');
      onTaskCreated();
    } catch (error: any) {
      const message =
        error && error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An error occurred while creating the task.';
      setErrorMessage(message);
    }
  };
  
  

  return (
    <div className="card mb-4">
      <div className="card-header">Add Task</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label custom-text-color size">
              Task Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={tasTitle}
              onChange={(e) => setTasTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label custom-text-color size">
              Task Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              value={tasDescription}
              onChange={(e) => setTasDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label custom-text-color size">
              Due Date
            </label>
            <input
              type="date"
              className="form-control due-style"
              id="dueDate"
              value={tasDueDate}
              onChange={(e) => setTasDueDate(e.target.value)}
              required
              placeholder="yyyy-MM-dd"
            />
          </div>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
