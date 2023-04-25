export interface Task {
    tasId: number;
    tasTitle: string;
    tasDescription: string;
    tasStatus: TasksStatusEnum;
    tasDueDate: string;
  }
  
  export interface TasksResponse {
    code: number;
    status: string;
    message: string;
    data: Task[];
  }
  
  export enum TasksStatusEnum {
    Pending = 'pending',
    InProgress = 'in_progress',
    Done = 'done',
  }
  