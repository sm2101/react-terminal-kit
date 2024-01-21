import { Output } from "../../interfaces/output.interface";
import { OutputActionTypes, IOutputAction } from "../types/output.types";
import { generateOutput } from "../../utils/output.utils";

const INIT_STATE: Array<Output> = [];

const outputReducer = (state: Array<Output>, action: IOutputAction) => {
  switch (action.type) {
    case OutputActionTypes.ADD_OUTPUT:
      return [
        ...state,
        {
          content: action.payload as string,
          type: "text",
        },
      ];
    case OutputActionTypes.ADD_OUTPUT_HTML:
      let out = action.payload;
      if (!Array.isArray(out)) out = [out];
      const outputHtml = out.map((item) =>
        generateOutput(item.content, item.options)
      );
      return [
        ...state,
        {
          content: `<div class="react-terminal__output">
            ${outputHtml.join("")}
            </div>`,
          type: "html",
        },
      ];
    case OutputActionTypes.ADD_OUTPUT_JSX:
      return [
        ...state,
        {
          content: action.payload as React.ReactNode,
          type: "jsx",
        },
      ];
    case OutputActionTypes.CLEAR_OUTPUT:
      return [];
    default:
      return state;
  }
};

export default outputReducer;
