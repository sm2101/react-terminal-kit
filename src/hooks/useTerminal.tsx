import React from "react";
import { Output, DisplayOutputArgs } from "../interfaces/output.interface";
import {
  InputType,
  InputState,
  InputReducerState,
  UserInputOptions,
  UserPasswordInputOptions,
  UserBooleanInputOptions,
  UserSelectInputOptions,
} from "../interfaces/input.interface";
import {
  ITerminal,
  TerminalCommand,
  TerminalUtils,
} from "../interfaces/terminal.interface";
import { generateOutput } from "../utils/output.utils";
import reducers, {
  inputReducerInitialState,
  commandReducerInitialState,
} from "../store/reducers/index";
import {
  commandActions,
  inputActions,
  outputActions,
} from "../store/actions/index";

interface UseTerminal {
  output: Array<Output>;
  inputState: InputReducerState;
  commands: TerminalCommand;
  inputRef: React.RefObject<HTMLInputElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  cursorClassName: string;
  handleCommand: (input: string) => void;
  focusInput: () => void;
  blurInput: () => void;
  displayOutput: (data: DisplayOutputArgs) => void;
}

interface UseTerminalArgs {
  userCommands?: TerminalCommand;
  cursor: ITerminal["cursor"];
}

const useTerminal = ({
  userCommands,
  cursor,
}: UseTerminalArgs): UseTerminal => {
  /* @INFO: Output Reducer */
  const [output, dispatchOutput] = React.useReducer(reducers.outputReducer, []);
  /* @INFO: Input Reducer */
  const [inputState, dispatchInputState] = React.useReducer(
    reducers.inputReducer,
    inputReducerInitialState
  );

  /* @INFO: Terminal Commands */
  const [commands, dispatchCommands] = React.useReducer(
    reducers.commandReducer,
    commandReducerInitialState
  );

  const cursorClassName =
    cursor === "block"
      ? "cursor__box"
      : cursor === "bar"
      ? "cursor__line"
      : cursor === "underline"
      ? "cursor__underline"
      : "cursor__box";

  /* @INFO: Terminal Refs */
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  /* @INFO: Internal Functions */
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const registerCommands = (commands: TerminalCommand) => {
    dispatchCommands(commandActions.addCommands(commands));
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [output]);

  React.useEffect(() => {
    if (userCommands) registerCommands(userCommands);
  }, [userCommands]);

  /* @INFO: Terminal Functions */
  const displayOutput = (data: DisplayOutputArgs) => {
    dispatchOutput(outputActions.addOutput(data));
  };
  const clearOutput = () => {
    dispatchOutput(outputActions.clearOutput());
  };
  const userInput = async (
    prompt: string,
    options: UserInputOptions
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      dispatchInputState(
        inputActions.setTextInput({
          prefix: !options.allowEmpty ? prompt : `${prompt} (empty to skip)`,
          prompt: "",
          handleEnter: (text: string) => {
            dispatchInputState(inputActions.resetInput());
            resolve(text);
          },
          handleError: (error: string) => {
            dispatchInputState(inputActions.resetInput());
            reject(error);
          },
          options,
        })
      );
      scrollToBottom();
    });
  };
  const userPassword = async (
    prompt: string,
    options: UserPasswordInputOptions
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      dispatchInputState(
        inputActions.setPasswordInput({
          prefix: !options.allowEmpty ? prompt : `${prompt} (empty to skip)`,
          prompt: "",
          handleEnter: (password: string) => {
            dispatchInputState(inputActions.resetInput());
            resolve(password);
          },
          handleError: (error: string) => {
            dispatchInputState(inputActions.resetInput());
            reject(error);
          },
          options,
        })
      );
      scrollToBottom();
    });
  };
  const userConfirm = async (
    prompt: string,
    options: UserBooleanInputOptions
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      dispatchInputState(
        inputActions.setBooleanInput({
          prefix: prompt,
          prompt: "",
          handleEnter: (choice: boolean) => {
            dispatchInputState(inputActions.resetInput());
            resolve(choice);
          },
          handleError: (error: string) => {
            dispatchInputState(inputActions.resetInput());
            reject(error);
          },
          options,
        })
      );
      scrollToBottom();
    });
  };
  const userSelect = async (
    prompt: string,
    options: UserSelectInputOptions
  ): Promise<number> => {
    return new Promise((resolve, reject) => {
      dispatchInputState(
        inputActions.setSelectInput({
          prefix: prompt,
          prompt: "",
          handleEnter: (choice: number) => {
            dispatchInputState(inputActions.resetInput());
            resolve(choice);
          },
          handleError: (error: string) => {
            dispatchInputState(inputActions.resetInput());
            reject(error);
          },
          options,
        })
      );
      scrollToBottom();
    });
  };

  const utils: TerminalUtils = {
    displayOutput,
    clearScreen: clearOutput,
    input: userInput,
    password: userPassword,
    confirm: userConfirm,
    select: userSelect,
  };

  Object.freeze(utils);

  const handleCommand = (input: string) => {
    const [trigger, ...args] = input.split(" ");
    const commandFunction = (commands as TerminalCommand)[
      trigger as keyof TerminalCommand
    ];
    if (!commandFunction)
      displayOutput({
        content: `Command not found: ${trigger}`,
        options: {
          variant: "body1",
          color: "error",
        },
      });
    else {
      if (trigger === "help") {
        (commandFunction as TerminalCommand["help"]).callback(
          utils,
          args
        )(commands as TerminalCommand);
      } else {
        commandFunction.callback(utils, args);
      }
    }
  };
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    dispatchInputState(inputActions.setIsFocused(true));
  };
  const blurInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    dispatchInputState(inputActions.setIsFocused(false));
  };

  return {
    output,
    inputState,
    inputRef,
    scrollRef,
    commands,
    handleCommand,
    focusInput,
    blurInput,
    cursorClassName,
    displayOutput: utils.displayOutput,
  };
};

export default useTerminal;
