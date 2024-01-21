import React from "react";
import { Output, DisplayOutputArgs } from "../interfaces/output.interface";
import {
  InputType,
  InputState,
  InputReducerState,
} from "../interfaces/input.interface";
import { TerminalCommand } from "../interfaces/terminal.interface";
import { generateOutput } from "../utils/output.utils";
import reducers, {
  inputReducerInitialState,
  commandReducerInitialState,
} from "../store/reducers/index";
import { commandActions, outputActions } from "../store/actions/index";

interface UseTerminal {
  output: Array<Output>;
  inputState: InputReducerState;
  commands: TerminalCommand;
  inputRef: React.RefObject<HTMLInputElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
}

interface UseTerminalArgs {
  userCommands?: TerminalCommand;
}

const useTerminal = ({ userCommands }: UseTerminalArgs): UseTerminal => {
  /* @INFO: Output Reducer */
  const [output, dispatchOutput] = React.useReducer<Array<Output>>(
    reducers.outputReducer,
    []
  );
  /* @INFO: Input Reducer */
  const [inputState, dispatchInputState] = React.useReducer<InputReducerState>(
    reducers.inputReducer,
    inputReducerInitialState
  );

  /* @INFO: Terminal Commands */
  const [commands, dispatchCommands] = React.useReducer<TerminalCommand>(
    reducers.commandReducer,
    commandReducerInitialState
  );

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
        )(commands as TerminalCommand)();
      }
    }
  };

  return {
    output,
    inputState,
    inputRef,
    scrollRef,
    commands,
  };
};

export default useTerminal;
