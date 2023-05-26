import React, { ReactElement, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  path: string;
}

const Icon: React.FC<IconProps> = ({ path, ...props }): ReactElement => {
  return (
    <svg {...props}>
      <path d={path} />
    </svg>
  );
};

export default Icon;
