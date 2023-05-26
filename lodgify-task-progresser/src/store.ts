import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "./slice/taskListSlice";

const store = configureStore({
  reducer: {
    taskGroups: taskListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
