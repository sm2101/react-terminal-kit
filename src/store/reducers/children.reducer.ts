import { ChildrenReducerState } from "../../interfaces/terminal.interface";
import { ChildrenActionTypes, ChildrenAction } from "../types/children.types";

const INIT_STATE: ChildrenReducerState = {
  fullscreen: {},
};

const childrenReducer = (
  state: ChildrenReducerState,
  action: ChildrenAction
): ChildrenReducerState => {
  switch (action.type) {
    case ChildrenActionTypes.SET_FULLSCREEN_CHILDREN:
      return {
        ...state,
        fullscreen: action.payload as ChildrenReducerState["fullscreen"],
      };
    case ChildrenActionTypes.OPEN_FULLSCREEN_CHILDREN:
      return {
        ...state,
        fullscreen: {
          ...state.fullscreen,
          [action.payload as string]: {
            ...state.fullscreen[action.payload as string],
            open: true,
          },
        },
      };
    case ChildrenActionTypes.CLOSE_FULLSCREEN_CHILDREN:
      return {
        ...state,
        fullscreen: {
          ...state.fullscreen,
          [action.payload as string]: {
            ...state.fullscreen[action.payload as string],
            open: false,
          },
        },
      };
    default:
      return state;
  }
};

export { INIT_STATE as childrenReducerInitialState };
export default childrenReducer;
