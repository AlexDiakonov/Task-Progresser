import React from "react";
import { useSelector } from "react-redux";
import { selectTotalProgress } from "../../slice/taskListSlice";
import styles from "./progress.module.scss";
import Typography from "../Typography/Typography";

const ProgressBar: React.FC = () => {
  const progress = useSelector(selectTotalProgress) || 0;

  const progressBarStyles: React.CSSProperties = {
    width: `${progress}%`,
  };

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressContainer_bar} style={progressBarStyles}>
        <Typography
          className={styles.progressContainer_bar_percentage}
          variant="span"
        >
          {Math.round(progress)}%
        </Typography>
      </div>
    </div>
  );
};

export default ProgressBar;
