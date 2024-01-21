import { InputAction, InputActionTypes } from "../types/input.types";
import {
  BooleanInputState,
  InputReducerState,
  PasswordInputState,
  SelectInputState,
  TextInputState,
} from "../../interfaces/input.interface";

const INIT_STATE: InputReducerState = {
  type: "command",
  state: null,
  isFocused: false,
};

const inputReducer = (state: InputReducerState, action: InputAction) => {
  switch (action.type) {
    case InputActionTypes.SET_IS_FOCUSED:
      return {
        ...state,
        type: action.payload as boolean,
      };
    case InputActionTypes.SET_TEXT_INPUT:
      return {
        ...state,
        state: action.payload as TextInputState,
        type: "text",
      };
    case InputActionTypes.SET_PASSWORD_INPUT:
      return {
        ...state,
        state: action.payload as PasswordInputState,
        type: "password",
      };
    case InputActionTypes.SET_BOOLEAN_INPUT:
      return {
        ...state,
        state: action.payload as BooleanInputState,
        type: "boolean",
      };
    case InputActionTypes.SET_SELECT_INPUT:
      return {
        ...state,
        state: action.payload as SelectInputState,
        type: "select",
      };
    case InputActionTypes.RESET_INPUT:
      return {
        ...state,
        state: null,
        type: "command",
      };
    case InputActionTypes.DISABLE_INPUT:
      return {
        ...state,
        state: null,
        type: null,
      };
    default:
      return state;
  }
};

export { INIT_STATE as inputReducerInitialState };
export default inputReducer;
