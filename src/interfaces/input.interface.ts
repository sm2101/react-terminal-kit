import { Output, DisplayOutputArgs } from "./output.interface";
import { TerminalUtils } from "./terminal.interface";

interface ICommandInput {
  prefix: string;
  prompt: string;
  inputRef: React.RefObject<HTMLInputElement>;
  cursorClassName?: string;
  setOutput: React.Dispatch<React.SetStateAction<Output[]>>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleCommand: (command: string) => void;
}

interface Input {
  prefix: string;
  prompt: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setOutput: React.Dispatch<React.SetStateAction<Output[]>>;
  cursorClassName?: string;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  displayOutput: TerminalUtils["displayOutput"];
}

interface ITextInput extends Input {
  handleEnter: (text: string) => void;
  handleError: (error: string) => void;
  options?: AwaitInputOptions;
}
interface IBooleanInput extends Input {
  handleEnter: (choice: boolean) => void;
  handleError: (error: string) => void;
  options?: AwaitBooleanInputOptions;
}

interface IPasswordInput extends Input {
  handleEnter: (password: string) => void;
  handleError: (error: string) => void;
  options?: AwaitPasswordInputOptions;
}

interface ISelectInput extends Input {
  handleEnter: (choice: number) => void;
  handleError: (error: string) => void;
  options: AwaitSelectInputOptions;
}

interface AwaitInputOptions {
  allowEmpty?: boolean;
  maxRetries?: number; // 0 = infinite & allowEmpty = false
  retryMessage?: string;
  errorMessage?: string;
  validator?: (input: string) => boolean;
}

interface AwaitPasswordInputOptions extends AwaitInputOptions {
  mask?: boolean;
}

interface AwaitBooleanInputOptions {
  true: string;
  false: string;
  default?: boolean;
}

interface AwaitSelectInputOptions {
  options: string[];
  default?: number;
}

type InputType = "command" | "text" | "password" | "boolean" | "select" | null;

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
  AwaitInputOptions,
  AwaitPasswordInputOptions,
  AwaitBooleanInputOptions,
  AwaitSelectInputOptions,
  TextInputState,
  PasswordInputState,
  BooleanInputState,
  SelectInputState,
  InputState,
  InputReducerState,
};
