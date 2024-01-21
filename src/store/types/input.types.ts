import { InputState, InputType } from "../../interfaces/input.interface";

enum InputActionTypes {
  SET_IS_FOCUSED = "SET_IS_FOCUSED",
  SET_TEXT_INPUT = "SET_TEXT_INPUT",
  SET_PASSWORD_INPUT = "SET_PASSWORD_INPUT",
  SET_BOOLEAN_INPUT = "SET_BOOLEAN_INPUT",
  SET_SELECT_INPUT = "SET_SELECT_INPUT",
  RESET_INPUT = "RESET_INPUT",
  DISABLE_INPUT = "DISABLE_INPUT",
}

interface InputAction {
  type: InputActionTypes;
  payload: InputState | boolean;
}

export { InputActionTypes, InputAction };
