import React, { useEffect } from "react";
import {
  getTasksListAsync,
  selectTaskItems,
  selectTaskListLoading,
} from "../../slice/taskListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Accordion from "../Accordion/Accordion";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./taskProgresser.module.scss";
import Typography from "../Typography/Typography";

const TaskProgresser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const taskItems = useSelector(selectTaskItems);
  const isLoading = useSelector(selectTaskListLoading);

  //Dispatching asyncThunk to have task list
  useEffect(() => {
    dispatch(getTasksListAsync());
  }, [dispatch]);

  return (
    <div className={styles.taskProgresser__container}>
      <header className={styles.taskProgresser__container_header}>
        <Typography variant="h1">Lodgify Grouped Tasks</Typography>
        <ProgressBar />
      </header>
      {isLoading ? (
        <Typography variant="span">...Loading</Typography>
      ) : (
        <Accordion taskGroups={taskItems} />
      )}
    </div>
  );
};

export default TaskProgresser;
