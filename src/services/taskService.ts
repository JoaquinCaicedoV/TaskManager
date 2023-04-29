import axios from 'axios';
import { Task, TasksResponse, TasksStatusEnum } from '../types/Task';

const API_URL = 'http://3.141.98.165:8080/api/v1/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<TasksResponse>(API_URL);
  return response.data.data;
};

export async function createTask(task: {
  tasTitle: string;
  tasDescription: string;
  tasDueDate: string;
}): Promise<Task> {
  try {
    console.log('Task data:', task);
    const response = await axios.post<Task>(API_URL, {
      ...task,
      status: TasksStatusEnum.Pending,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', JSON.stringify(error.response, null, 2));
    }
    throw error;
  }
}

export async function updateTaskStatus(
  taskId: number,
  status: TasksStatusEnum
): Promise<void> {
  await axios.patch(`${API_URL}/${taskId}/status`, status, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteTask(
  taskId: number
): Promise<void> {
  await axios.delete(`${API_URL}/${taskId}`);
}