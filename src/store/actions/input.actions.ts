import { InputAction, InputActionTypes } from "../types/input.types";
import {
  BooleanInputState,
  InputState,
  InputType,
  PasswordInputState,
  SelectInputState,
  TextInputState,
} from "../../interfaces/input.interface";

const setIsFocused = (payload: boolean): InputAction => ({
  type: InputActionTypes.SET_IS_FOCUSED,
  payload,
});

const setTextInput = (payload: TextInputState): InputAction => ({
  type: InputActionTypes.SET_TEXT_INPUT,
  payload,
});

const setPasswordInput = (payload: PasswordInputState): InputAction => ({
  type: InputActionTypes.SET_PASSWORD_INPUT,
  payload,
});

const setBooleanInput = (payload: BooleanInputState): InputAction => ({
  type: InputActionTypes.SET_BOOLEAN_INPUT,
  payload,
});

const setSelectInput = (payload: SelectInputState): InputAction => ({
  type: InputActionTypes.SET_SELECT_INPUT,
  payload,
});

const resetInput = (): InputAction => ({
  type: InputActionTypes.RESET_INPUT,
});

const disableInput = (): InputAction => ({
  type: InputActionTypes.DISABLE_INPUT,
});

export default {
  setIsFocused,
  setTextInput,
  setPasswordInput,
  setBooleanInput,
  setSelectInput,
  resetInput,
  disableInput,
};
