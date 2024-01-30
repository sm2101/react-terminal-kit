import { Output, DisplayOutputArgs } from "./output.interface";
import { TerminalUtils } from "./terminal.interface";

interface ICommandInput {
  prefix: string;
  prompt: string;
  inputRef: React.RefObject<HTMLInputElement>;
  cursorClassName?: string;
  isFocused: InputReducerState["isFocused"];
  focusInput: () => void;
  blurInput: () => void;
  handleCommand: (command: string) => void;
  displayOutput: TerminalUtils["displayOutput"];
}

interface Input {
  prefix: string;
  prompt: string;
  inputRef: React.RefObject<HTMLInputElement>;
  cursorClassName?: string;
  displayOutput: TerminalUtils["displayOutput"];
  isFocused: InputReducerState["isFocused"];
  focusInput: () => void;
  blurInput: () => void;
  handleError: (error: string) => void;
}

interface ITextInput extends Input {
  handleEnter: (text: string) => void;
  options?: UserInputOptions;
}
interface IBooleanInput extends Input {
  handleEnter: (choice: boolean) => void;
  options?: UserBooleanInputOptions;
}

interface IPasswordInput extends Input {
  handleEnter: (password: string) => void;
  options?: UserPasswordInputOptions;
}

interface ISelectInput extends Input {
  handleEnter: (choice: number) => void;
  options: UserSelectInputOptions;
}

interface UserInputOptions {
  allowEmpty?: boolean;
  maxRetries?: number; // 0 = infinite & allowEmpty = false
  retryMessage?: string;
  errorMessage?: string;
  validator?: (input: string) => boolean;
}

interface UserPasswordInputOptions extends UserInputOptions {
  mask?: boolean;
}

interface UserBooleanInputOptions {
  true: string;
  false: string;
  default?: boolean;
}

interface UserSelectInputOptions {
  options: string[];
  default?: number;
}

type InputType =
  | "command"
  | "text"
  | "password"
  | "boolean"
  | "select"
  | "loading"
  | null;

type LoadingType =
  | "bar"
  | "bubble"
  | "breathe"
  | "metro"
  | "modern-metro"
  | "vertical"
  | "horizontal"
  | "semi-circle"
  | "arrow"
  | "clock"
  | "bounce"
  | "firework";

interface LoadingProps {
  text: string;
  type: LoadingType;
}

interface StopLoadingArgs {
  message?: string;
  status: "success" | "error";
}

type TextInputState = {
  prefix: ITextInput["prefix"];
  prompt: ITextInput["prompt"];
  handleEnter: ITextInput["handleEnter"];
  handleError: ITextInput["handleError"];
  options?: ITextInput["options"];
};

type PasswordInputState = {
  prefix: IPasswordInput["prefix"];
  prompt: IPasswordInput["prompt"];
  handleEnter: IPasswordInput["handleEnter"];
  handleError: IPasswordInput["handleError"];
  options?: IPasswordInput["options"];
};

type BooleanInputState = {
  prefix: IBooleanInput["prefix"];
  prompt: IBooleanInput["prompt"];
  handleEnter: IBooleanInput["handleEnter"];
  handleError: IBooleanInput["handleError"];
  options?: IBooleanInput["options"];
};

type SelectInputState = {
  prefix: ISelectInput["prefix"];
  prompt: ISelectInput["prompt"];
  handleEnter: ISelectInput["handleEnter"];
  handleError: ISelectInput["handleError"];
  options: ISelectInput["options"];
};

type InputState =
  | TextInputState
  | PasswordInputState
  | BooleanInputState
  | SelectInputState
  | LoadingProps
  | null;

interface InputReducerState {
  type: InputType;
  state: InputState;
  isFocused: boolean;
}

export {
  InputType,
  ICommandInput,
  IBooleanInput,
  ITextInput,
  ISelectInput,
  IPasswordInput,
  UserInputOptions,
  UserPasswordInputOptions,
  UserBooleanInputOptions,
  UserSelectInputOptions,
  TextInputState,
  PasswordInputState,
  BooleanInputState,
  SelectInputState,
  InputState,
  InputReducerState,
  LoadingType,
  LoadingProps,
  StopLoadingArgs,
};
