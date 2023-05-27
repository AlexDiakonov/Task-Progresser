import React from "react";
import styles from "./accordion.module.scss";
import AccordionItem from "../AccordionItem/AccordionItem";
import { TaskItemInterface } from "../../interfaces/TaskList.interfaces";

interface AccordionProps {
  taskGroups: TaskItemInterface[];
}

const Accordion: React.FC<AccordionProps> = ({ taskGroups }) => {
  return (
    <div className={styles.accordion}>
      {taskGroups.map((taskGroup) => (
        <AccordionItem key={taskGroup.id} taskGroup={taskGroup} />
      ))}
    </div>
  );
};

export default Accordion;
