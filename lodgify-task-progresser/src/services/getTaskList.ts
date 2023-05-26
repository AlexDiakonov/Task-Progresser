import { TaskItem } from "../interfaces/TaskList.interfaces";

export const getTaskList = async (): Promise<TaskItem[]> => {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch progress data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch progress data:", error);
    throw error;
  }
};
