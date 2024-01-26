import React from "react";
import {
  TextProps,
  OutputVariantClass,
  OutputColorClass,
} from "../../../interfaces/output.interface";
import clsx from "clsx";

const Text: React.FC<TextProps> = ({
  variant,
  color,
  className,
  href,
  children,
  ...rest
}) => {
  const classNames = clsx({
    [OutputVariantClass[variant as keyof typeof OutputVariantClass]]:
      variant || false,
    [OutputColorClass[color as keyof typeof OutputColorClass]]: color || false,
    "react-terminal__output": true,
    [className as string]: className || false,
  });
  if (href)
    return (
      <a className={classNames} href={href} {...rest}>
        {children}
      </a>
    );
  return (
    <p className={classNames} {...rest}>
      {children}
    </p>
  );
};

export default Text;
