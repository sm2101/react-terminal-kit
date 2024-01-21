import { DisplayOutputArgs } from "../../interfaces/output.interface";

enum OutputActionTypes {
  ADD_OUTPUT = "ADD_OUTPUT",
  ADD_OUTPUT_HTML = "ADD_OUTPUT_HTML",
  ADD_OUTPUT_JSX = "ADD_OUTPUT_JSX",
  CLEAR_OUTPUT = "CLEAR_OUTPUT",
}

interface IOutputAction {
  type: OutputActionTypes;
  payload: DisplayOutputArgs | undefined | null;
}

export { OutputActionTypes, IOutputAction };
