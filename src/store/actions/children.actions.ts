import { ChildrenAction, ChildrenActionTypes } from "../types/children.types";
import { ChildrenReducerState } from "../../interfaces/terminal.interface";

const setFullscreenChildren = (
  payload: ChildrenReducerState["fullscreen"]
): ChildrenAction => ({
  type: ChildrenActionTypes.SET_FULLSCREEN_CHILDREN,
  payload,
});

const openFullscreenChildren = (payload: string): ChildrenAction => ({
  type: ChildrenActionTypes.OPEN_FULLSCREEN_CHILDREN,
  payload,
});

const closeFullscreenChildren = (payload: string): ChildrenAction => ({
  type: ChildrenActionTypes.CLOSE_FULLSCREEN_CHILDREN,
  payload,
});

export default {
  setFullscreenChildren,
  openFullscreenChildren,
  closeFullscreenChildren,
};
