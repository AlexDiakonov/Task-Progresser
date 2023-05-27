import React from "react";
import { updateTaskStatus } from "../../slice/taskListSlice";
import Typography from "../Typography/Typography";
import styles from "./taskItem.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface TaskProps {
  id: string;
  checked: boolean;
  description: string;

  groupTaskId: string;
}

const TaskItem: React.FC<TaskProps> = ({
  id,
  checked = false,
  description,
  groupTaskId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  //dispatch update task checked status
  const handleCheckboxChange = (taskId: string) => {
    dispatch(updateTaskStatus({ groupId: groupTaskId || "", taskId }));
  };

  return (
    <li key={id} className={styles.task}>
      <label htmlFor={id} className={styles.task_label}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => handleCheckboxChange(id || "")}
          className={styles.task_label_checkbox}
        />
        <div className={styles.task_label_checkmark}></div>
        <Typography className={styles.task_label_text} variant="span">
          {description}
        </Typography>
      </label>
    </li>
  );
};

export default React.memo(TaskItem);
