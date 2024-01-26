import { ChildrenReducerState } from "../../interfaces/terminal.interface";

enum ChildrenActionTypes {
  SET_FULLSCREEN_CHILDREN = "SET_FULLSCREEN_CHILDREN",
  OPEN_FULLSCREEN_CHILDREN = "OPEN_FULLSCREEN_CHILDREN",
  CLOSE_FULLSCREEN_CHILDREN = "CLOSE_FULLSCREEN_CHILDREN",
}

type ChildrenActionPayload = ChildrenReducerState["fullscreen"] | string;

interface ChildrenAction {
  type: ChildrenActionTypes;
  payload?: ChildrenActionPayload;
}

export { ChildrenActionTypes, ChildrenAction };
