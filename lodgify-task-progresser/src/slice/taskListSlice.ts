import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TaskItem } from "../interfaces/TaskList.interfaces";
import { getTaskList } from "../services/getTaskList";
import { taskIdGenerator } from "../utils/taskListSliceUtils";

interface TaskListSliceInterface {
  taskItems: TaskItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskListSliceInterface = {
  taskItems: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch task list data
export const getTasksListAsync = createAsyncThunk("getTaskList", getTaskList);

// Selector to get the task items from the state
export const selectTaskItems = createSelector(
  (state: RootState) => state.taskGroups.taskItems,
  (value) => value
);

// Selector to calculate the total progress of completed tasks
export const selectTotalProgress = createSelector(
  (state: RootState) => state.taskGroups.taskItems,
  (taskItems) => {
    const allTasks = taskItems.flatMap((item) => item.tasks);
    const completedTasks = allTasks.filter((task) => task.checked);
    const sumOfValues = completedTasks.reduce(
      (total, task) => total + task.value,
      0
    );

    const totalProgress =
      (sumOfValues * 100) /
      allTasks.reduce((total, task) => total + task.value, 0);

    return Math.round(totalProgress);
  }
);

export const selectTaskListLoading = (state: RootState) =>
  state.taskGroups.isLoading;

export const selectTaskListError = (state: RootState) => state.taskGroups.error;

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateTaskStatus: (
      state,
      action: PayloadAction<{ groupId: string; taskId: string }>
    ) => {
      const { groupId, taskId } = action.payload;

      return {
        ...state,
        taskItems: state.taskItems.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId ? { ...task, checked: !task.checked } : task
              ),
            };
          }
          return group;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasksListAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = taskIdGenerator(action.payload);
      })
      .addCase(getTasksListAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});
export const { updateTaskStatus } = taskListSlice.actions;
export default taskListSlice.reducer;
