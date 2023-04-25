import Task from './Task';
import { Task as TaskType, TasksStatusEnum } from '../types/Task';
import { useTransition, animated } from '@react-spring/web';
import React, { useState, useEffect } from 'react';
import { Plus } from 'react-bootstrap-icons';

interface TaskListProps {
  tasks: TaskType[];
  onUpdateStatus: (taskId: number, newStatus: TasksStatusEnum) => void;
  onDelete: (taskId: number) => void;
  onTaskDeleted: () => void;
  onTaskSelected: (task: TaskType) => void;
  onTaskCreate: (tasTitle: string, tasDescription: string, tasDueDate: string) => void;
  onCreateButtonClick: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateStatus, onDelete, onTaskDeleted, onCreateButtonClick }) => {
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
  const [taskRefs, setTaskRefs] = useState<Map<number, React.RefObject<HTMLDivElement>>>(new Map());

  useEffect(() => {
    const newTaskRefs = new Map<number, React.RefObject<HTMLDivElement>>();
    tasks.forEach((task) => {
      newTaskRefs.set(task.tasId, React.createRef());
    });
    setTaskRefs(newTaskRefs);
  }, [tasks]);

  const toggleTaskSelection = (taskId: number) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.add(taskId);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleDeleteSelectedTasks = async () => {
    const tasksToDelete = Array.from(selectedTasks);
    for (const taskId of tasksToDelete) {
      await onDelete(taskId);
      onTaskDeleted();
    }
    setSelectedTasks(new Set());
  };

  const transitions = useTransition(tasks, {
    keys: (task) => task.tasId,
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 200,
    config: {
      mass: 0.5,
      tension: 100,
      friction: 10,
    },
  });

  const createButtonTransition = useTransition(true, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    delay: 500,
    config: {
      mass: 1,
      tension: 100,
      friction: 10,
    },
  });

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {transitions((style, task) => (
          <animated.div
            style={style}
            key={task.tasId}
            className="col-12 col-md-6 col-lg-4 task-col"
            ref={taskRefs.get(task.tasId)}
          >
            <Task
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onCheck={() => toggleTaskSelection(task.tasId)}
              onClick={() => toggleTaskSelection(task.tasId)}
              checked={selectedTasks.has(task.tasId)}
            />
          </animated.div>
        ))}
        {createButtonTransition((style, item) => (
          <animated.div style={style} className="col-12 col-md-6 col-lg-4 task-col">
            <div className="create-task-btn-wrapper">
            <button onClick={onCreateButtonClick} className="btn btn-primary create-task-btn">
              <Plus />
            </button>
            </div>
          </animated.div>
        ))}
      </div>
      {selectedTasks.size > 0 && (
        <button onClick={handleDeleteSelectedTasks} className="btn btn-danger delete-selected-tasks-btn">
          Delete Selected Tasks
        </button>
      )}
    </div>
  );

};

export default TaskList;
