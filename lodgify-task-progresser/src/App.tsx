import React from "react";
import TaskProgresser from "./components/TaskProgresser/TaskProgresser";
import { useSelector } from "react-redux";
import { selectTaskListError } from "./slice/taskListSlice";
import styles from "./app.module.scss";

function App() {
  const error = useSelector(selectTaskListError);

  return (
    <div className={styles.appWrapper}>
      {error ? error : <TaskProgresser />}
    </div>
  );
}

export default App;
