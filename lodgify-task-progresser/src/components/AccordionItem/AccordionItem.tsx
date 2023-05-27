import React, { useState } from "react";
import { TaskItemInterface, Task } from "../../interfaces/TaskList.interfaces";
import Typography from "../Typography/Typography";
import styles from "./accordionItem.module.scss";
import { ReactComponent as Show } from "../../assets/icons/show.svg";
import { ReactComponent as GroupIcon } from "../../assets/icons/groupIcon.svg";
import TaskItem from "../TaskItem/TaskItem";

interface AccordionItemProps {
  taskGroup: TaskItemInterface;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ taskGroup }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(taskGroup);

  //dropDown handler
  const handleExpand = () => {
    setExpanded(!expanded);
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
            <TaskItem
              key={task.id}
              id={task.id || ""}
              groupTaskId={taskGroup.id || ""}
              checked={task?.checked}
              description={task?.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

//using memo to avoid rerender due to a checked state change.
export default React.memo(AccordionItem);
