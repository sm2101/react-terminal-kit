import React from "react";
import {
  InputReducerState,
  TextInputState,
  PasswordInputState,
  BooleanInputState,
  SelectInputState,
  LoadingProps,
} from "../../interfaces/input.interface";

// Input Components
import CommandInput from "./CommandInput";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import BooleanInput from "./BooleanInput";
import SelectInput from "./SelectInput";
import Loading from "./Loading";

//Interfaces
import { DisplayOutputArgs } from "../../interfaces/output.interface";
import { TerminalUtils } from "../../interfaces/terminal.interface";

interface InputWrapperProps {
  prefix: string;
  prompt: string;
  inputRef: React.RefObject<HTMLInputElement>;
  cursorClassName: string;
  handleCommand: (input: string) => void;
  inputState: InputReducerState;
  focusInput: () => void;
  blurInput: () => void;
  displayOutput: TerminalUtils["displayOutput"];
}
const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  if (!props.inputState.type) return null;
  else {
    switch (props.inputState.type) {
      case "command":
        return (
          <CommandInput
            prefix={props.prefix}
            prompt={props.prompt}
            inputRef={props.inputRef}
            cursorClassName={props.cursorClassName}
            handleCommand={props.handleCommand}
            isFocused={props.inputState.isFocused}
            focusInput={props.focusInput}
            blurInput={props.blurInput}
            displayOutput={props.displayOutput}
          />
        );
      case "text":
        return (
          <TextInput
            prefix={(props.inputState.state as TextInputState).prefix}
            prompt={(props.inputState.state as TextInputState).prompt}
            options={(props.inputState.state as TextInputState).options}
            handleEnter={(props.inputState.state as TextInputState).handleEnter}
            handleError={(props.inputState.state as TextInputState).handleError}
            inputRef={props.inputRef}
            cursorClassName={props.cursorClassName}
            isFocused={props.inputState.isFocused}
            focusInput={props.focusInput}
            blurInput={props.blurInput}
            displayOutput={props.displayOutput}
          />
        );
      case "password":
        return (
          <PasswordInput
            prefix={(props.inputState.state as PasswordInputState).prefix}
            prompt={(props.inputState.state as PasswordInputState).prompt}
            options={(props.inputState.state as PasswordInputState).options}
            handleEnter={
              (props.inputState.state as PasswordInputState).handleEnter
            }
            handleError={
              (props.inputState.state as PasswordInputState).handleError
            }
            inputRef={props.inputRef}
            cursorClassName={props.cursorClassName}
            isFocused={props.inputState.isFocused}
            focusInput={props.focusInput}
            blurInput={props.blurInput}
            displayOutput={props.displayOutput}
          />
        );
      case "boolean":
        return (
          <BooleanInput
            prefix={(props.inputState.state as BooleanInputState).prefix}
            prompt={(props.inputState.state as BooleanInputState).prompt}
            options={(props.inputState.state as BooleanInputState).options}
            handleEnter={
              (props.inputState.state as BooleanInputState).handleEnter
            }
            handleError={
              (props.inputState.state as BooleanInputState).handleError
            }
            inputRef={props.inputRef}
            cursorClassName={props.cursorClassName}
            isFocused={props.inputState.isFocused}
            focusInput={props.focusInput}
            blurInput={props.blurInput}
            displayOutput={props.displayOutput}
          />
        );
      case "select":
        return (
          <SelectInput
            prefix={(props.inputState.state as SelectInputState).prefix}
            prompt={(props.inputState.state as SelectInputState).prompt}
            options={(props.inputState.state as SelectInputState).options}
            handleEnter={
              (props.inputState.state as SelectInputState).handleEnter
            }
            handleError={
              (props.inputState.state as SelectInputState).handleError
            }
            inputRef={props.inputRef}
            cursorClassName={props.cursorClassName}
            isFocused={props.inputState.isFocused}
            focusInput={props.focusInput}
            blurInput={props.blurInput}
            displayOutput={props.displayOutput}
          />
        );
      case "loading":
        return (
          <Loading
            text={(props.inputState.state as LoadingProps).text}
            type={(props.inputState.state as LoadingProps).type}
          />
        );
      default:
        return null;
    }
  }
};

export default InputWrapper;
