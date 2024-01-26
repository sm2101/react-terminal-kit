import React from "react";

enum OutputVariantClass {
  body1 = "react-terminal__output-body1",
  body2 = "react-terminal__output-body2",
  caption = "react-terminal__output-caption",
  h1 = "react-terminal__output-h1",
  h2 = "react-terminal__output-h2",
  h3 = "react-terminal__output-h3",
  h4 = "react-terminal__output-h4",
  h5 = "react-terminal__output-h5",
  h6 = "react-terminal__output-h6",
}

enum OutputColorClass {
  primary = "react-terminal__output-primary",
  secondary = "react-terminal__output-secondary",

  error = "react-terminal__output-error",
  success = "react-terminal__output-success",
  warning = "react-terminal__output-warning",
  info = "react-terminal__output-info",
}

interface Output {
  content: React.ReactNode;
  type: "text" | "html" | "jsx";
}

type OutputVariant =
  | "body1"
  | "body2"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type OutputColor =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "info";

interface OutputOptions {
  variant?: OutputVariant;
  color?: OutputColor;
  url?: string;
}

interface DisplayTextOutputArgs {
  content: string;
  options: OutputOptions;
}

type DisplayOutputArgs =
  | DisplayTextOutputArgs
  | Array<DisplayOutputArgs>
  | React.ReactNode
  | string;

// Output Components

interface FullscreenOutputWrapperProps {
  open: boolean;
  handleClose: () => void;
  terminalRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

interface FullscreenOutputProps {
  unmountOnExit: boolean;
  path: string;
  children?: React.ReactNode;
}

interface TextProps {
  variant: OutputVariant;
  color: OutputColor;
  children?: React.ReactNode;
  id?: string;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}

export {
  OutputVariantClass,
  OutputVariant,
  OutputColorClass,
  OutputColor,
  Output,
  OutputOptions,
  DisplayTextOutputArgs,
  DisplayOutputArgs,
  FullscreenOutputWrapperProps,
  FullscreenOutputProps,
  TextProps,
};
