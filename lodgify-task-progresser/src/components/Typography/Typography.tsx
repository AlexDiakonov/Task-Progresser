import React, { ReactNode } from "react";
import styles from "./typography.module.scss";

interface TypographyProps {
  className?: string;
  variant: "h1" | "h2" | "span";
  children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = "",
}) => {
  let Tag: React.ElementType = "span";

  switch (variant) {
    case "h1":
      Tag = "h1";
      break;
    case "h2":
      Tag = "h2";
      break;
    case "span":
      Tag = "span";
      break;
    default:
      break;
  }

  let basicClassName = "";
  switch (variant) {
    case "h1":
      basicClassName = styles.bigHeading;
      break;
    case "h2":
      basicClassName = styles.smallHeading;
      break;
    case "span":
      basicClassName = styles.shortText;
      break;
    default:
      break;
  }

  return (
    <Tag className={`${basicClassName} ${className || ""}`}>{children}</Tag>
  );
};

export default Typography;
