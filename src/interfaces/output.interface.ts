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
  content: string | React.ReactNode;
  type: "text" | "html" | "jsx";
}

interface OutputOptions {
  variant?:
    | "body1"
    | "body2"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info"
    | string;
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

export {
  OutputVariantClass,
  OutputColorClass,
  Output,
  OutputOptions,
  DisplayTextOutputArgs,
  DisplayOutputArgs,
};
