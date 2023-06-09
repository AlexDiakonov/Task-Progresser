export interface Task {
  id?: string;
  description: string;
  value: number;
  checked: boolean;
}

export interface TaskItemInterface {
  name: string;
  id?: string;
  tasks: Task[];
}
