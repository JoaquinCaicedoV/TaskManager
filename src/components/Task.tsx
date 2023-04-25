import React from 'react';
import { Task as TaskType, TasksStatusEnum } from '../types/Task';
import { Trash } from 'react-bootstrap-icons';

interface TaskProps {
  task: TaskType;
  onUpdateStatus: (taskId: number, newStatus: TasksStatusEnum) => void;
  onDelete: (taskId: number) => void;
  onCheck: () => void;
  onClick: () => void;
  checked: boolean;
}

const Task: React.FC<TaskProps> = ({ task, onUpdateStatus, onDelete, onCheck, onClick, checked }) => {
  const { tasId, tasTitle, tasDescription, tasStatus, tasDueDate } = task;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TasksStatusEnum;
    onUpdateStatus(tasId, newStatus);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Add this line
    onDelete(tasId);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    const checkmark = (e.target as HTMLLabelElement).querySelector(".checkmark");
    if (checkmark) {
      checkmark.classList.toggle("checked");
      onCheck();
    }
  };

  return (
    <div className="task" onClick={onClick}>
      <div className="card mb-3">
        <div className="card-body">
          <div className="action-icons">
            <label className="checkbox-container" onClick={handleCheckboxClick}>
              <span className="custom-checkbox">
              <span className={`checkmark${checked ? ' checked' : ''}`}></span>
              </span>
            </label>
          </div>
          <h5 className="card-title">{tasTitle}</h5>
          <p className="card-text">{tasDescription}</p>
          <p className="card-text ">
            <small className="text-muted ">Due on {tasDueDate}</small>
          </p>
          <div className="form-group custom-text-color">
            <label htmlFor={`status-${tasId}`}>Status</label>
            <select
              className="form-control"
              id={`status-${tasId}`}
              value={tasStatus}
              onChange={handleStatusChange}
              onClick={(e) => e.stopPropagation()}>
              <option value={TasksStatusEnum.Pending}>Pending</option>
              <option value={TasksStatusEnum.InProgress}>In Progress</option>
              <option value={TasksStatusEnum.Done}>Done</option>
            </select>
          </div>
          <button
          type="button"
          className="delete-button trash-icon"
          onClick={handleDeleteClick}>
          <Trash />
        </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
