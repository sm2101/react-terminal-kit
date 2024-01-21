import { OutputActionTypes, IOutputAction } from "../types/output.types";
import { DisplayOutputArgs } from "../../interfaces/output.interface";
import React from "react";

const addOutput = (payload: DisplayOutputArgs): IOutputAction => {
  if (React.isValidElement(payload)) {
    return {
      type: OutputActionTypes.ADD_OUTPUT_JSX,
      payload: payload as React.ReactNode,
    };
  } else if (typeof payload === "string") {
    return {
      type: OutputActionTypes.ADD_OUTPUT,
      payload: payload as string,
    };
  } else {
    return {
      type: OutputActionTypes.ADD_OUTPUT_HTML,
      payload: payload as DisplayOutputArgs | Array<DisplayOutputArgs>,
    };
  }
};

const clearOutput = (): IOutputAction => ({
  type: OutputActionTypes.CLEAR_OUTPUT,
});

export default { addOutput, clearOutput };
