import React, { useState } from "react";
import { TaskItem, Task } from "../../interfaces/TaskList.interfaces";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../slice/taskListSlice";
import Typography from "../Typography/Typography";
import styles from "./accordionItem.module.scss";
import { ReactComponent as Show } from "../../assets/icons/show.svg";
import { ReactComponent as GroupIcon } from "../../assets/icons/groupIcon.svg";

interface AccordionItemProps {
  taskGroup: TaskItem;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ taskGroup }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  //dropDown handler
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  //dispatch update task checked status
  const handleCheckboxChange = (taskId: string) => {
    dispatch(updateTaskStatus({ groupId: taskGroup.id || "", taskId }));
  };

  return (
    <div
      className={`${styles.accordion_item} ${
        expanded ? styles.accordion_item_expanded : ""
      }`}
    >
      <header className={styles.accordion_item_header} onClick={handleExpand}>
        <div className={styles.accordion_item_header_nameWrapper}>
          <GroupIcon
            className={styles.accordion_item_header_nameWrapper_icon}
          />
          <Typography variant="h2" className={styles.accordion_item_text}>
            {taskGroup.name}
          </Typography>
        </div>
        {expanded ? (
          <div className={styles.accordion_item_header_iconWrapper}>
            <Typography
              className={styles.accordion_item_header_iconWrapper_text}
              variant="span"
            >
              Hide
            </Typography>
            <Show className={styles.accordion_item_header_iconWrapper_hide} />
          </div>
        ) : (
          <div className={styles.accordion_item_header_iconWrapper}>
            <Typography
              className={styles.accordion_item_header_iconWrapper_text}
              variant="span"
            >
              Show
            </Typography>
            <Show className={styles.accordion_item_icon} />
          </div>
        )}
      </header>
      {expanded && (
        <ul className={styles.accordion_item_taskList}>
          {taskGroup.tasks.map((task: Task) => (
            <li key={task.id} className={styles.accordion_item_taskList_task}>
              <label
                htmlFor={task.id}
                className={styles.accordion_item_taskList_task_label}
              >
                <input
                  type="checkbox"
                  id={task.id}
                  checked={task.checked}
                  onChange={() => handleCheckboxChange(task.id || "")}
                  className={styles.accordion_item_taskList_task_label_checkbox}
                />
                <div
                  className={
                    styles.accordion_item_taskList_task_label_checkmark
                  }
                ></div>
                <Typography
                  className={styles.accordion_item_taskList_task_label_text}
                  variant="span"
                >
                  {task.description}
                </Typography>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

//using memo to avoid rerender due to a checked state change.
export default React.memo(AccordionItem);
