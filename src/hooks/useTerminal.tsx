import React, { JSXElementConstructor } from "react";
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
  ChildrenReducerState,
  ITerminal,
  TerminalCommand,
  TerminalUtils,
} from "../interfaces/terminal.interface";
import { generateOutput } from "../utils/output.utils";
import reducers, {
  inputReducerInitialState,
  commandReducerInitialState,
  childrenReducerInitialState,
} from "../store/reducers/index";
import {
  commandActions,
  inputActions,
  outputActions,
  childrenActions,
} from "../store/actions/index";
import Text from "../components/Output/Text";

interface UseTerminal {
  output: Array<Output>;
  inputState: InputReducerState;
  commands: TerminalCommand;
  inputRef: React.RefObject<HTMLInputElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  cursorClassName: string;
  childrenState: ChildrenReducerState;
  handleCommand: (input: string) => void;
  focusInput: () => void;
  blurInput: () => void;
  displayOutput: (data: DisplayOutputArgs) => void;
  closeFullscreen: () => void;
}

interface UseTerminalArgs {
  userCommands?: TerminalCommand;
  cursor: ITerminal["cursor"];
  children?: React.ReactNode;
  welcomeMessage?: React.ReactNode | string;
}

const useTerminal = ({
  userCommands,
  cursor,
  children,
  welcomeMessage,
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

  /* @INFO: Children States */
  const [childrenState, dispatchChildrenState] = React.useReducer(
    reducers.childrenReducer,
    childrenReducerInitialState
  );
  const [openChild, setOpenChild] = React.useState<string | null>(null);

  /* @INFO: Cursor Class Name */
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

  React.useEffect(() => {
    if (children) {
      const childrenArray = React.Children.toArray(children);
      const fullScreenChildrenObject: ChildrenReducerState["fullscreen"] = {};

      childrenArray.forEach((child: React.ReactNode) => {
        if (!React.isValidElement(child)) {
          console.error("Invalid child passed to Terminal");
        }
        if (typeof (child as React.ReactElement)?.type === "string") {
          console.error("Invalid child passed to Terminal");
        }
        const type = (child as React.ReactElement)
          .type as JSXElementConstructor<any>;
        if (type.name && type.name === "FullscreenOutput") {
          const { path, unmountOnExit } = (child as React.ReactElement).props;
          fullScreenChildrenObject[path] = {
            component: child,
            unmountOnExit,
            open: false,
          };
        }
      });

      dispatchChildrenState(
        childrenActions.setFullscreenChildren(fullScreenChildrenObject)
      );
    }
  }, [children]);

  React.useEffect(() => {
    if (output.length !== 0) return;
    if (welcomeMessage) {
      if (React.isValidElement(welcomeMessage)) {
        dispatchOutput(outputActions.addOutput(welcomeMessage));
      } else if (typeof welcomeMessage === "string") {
        dispatchOutput(
          outputActions.addOutput(
            <Text variant="body1" color="primary">
              {welcomeMessage}
            </Text>
          )
        );
      } else {
        console.warn(
          "Invalid welcomeMessage type. welcomeMessage must be a string or a ReactNode."
        );
      }
    }
    dispatchOutput(
      outputActions.addOutput({
        content: "Type 'help' to see available commands.",
        options: {
          variant: "caption",
          color: "primary",
        },
      })
    );
  }, []);

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
  const openFullscreen = (path: string) => {
    if (openChild) {
      console.error("Cannot open multiple fullscreen at once");
      return;
    }
    dispatchChildrenState(childrenActions.openFullscreenChildren(path));
    setOpenChild(path);
    dispatchInputState(inputActions.disableInput());
  };
  const closeFullscreen = () => {
    if (!openChild) {
      console.error("No fullscreen open");
      return;
    }
    dispatchChildrenState(childrenActions.closeFullscreenChildren(openChild));
    setOpenChild(null);
    setTimeout(() => {
      dispatchInputState(inputActions.resetInput());
    }, 100);
  };

  const utils: TerminalUtils = {
    displayOutput,
    clearScreen: clearOutput,
    input: userInput,
    password: userPassword,
    confirm: userConfirm,
    select: userSelect,
    openFullscreen,
    closeFullscreen,
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
    childrenState,
    handleCommand,
    focusInput,
    blurInput,
    cursorClassName,
    displayOutput: utils.displayOutput,
    closeFullscreen: utils.closeFullscreen,
  };
};

export default useTerminal;
