import { TaskItem } from "../interfaces/TaskList.interfaces";
import { v4 as uuidv4 } from "uuid";

//utility to generate ID to trace changes by id, and to have id for mapping
export const taskIdGenerator = (data: TaskItem[]) => {
  const updatedData = data.map((item) => {
    const updatedTasks = item.tasks.map((task) => ({
      ...task,
      id: uuidv4(),
    }));

    return {
      ...item,
      tasks: updatedTasks,
      id: uuidv4(),
    };
  });

  return updatedData;
};
