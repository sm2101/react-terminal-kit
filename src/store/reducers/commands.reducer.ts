import { TerminalCommand } from "../../interfaces/terminal.interface";
import { CommandAction } from "../types/command.types";

const INIT_STATE: TerminalCommand = {
  help: {
    description: "List all available commands",
    callback: (utils) => (commands: TerminalCommand) => {
      utils.displayOutput({
        content: "Available commands:",
        options: { variant: "body1" },
      });
      for (const [key, value] of Object.entries(commands)) {
        utils.displayOutput([
          {
            content: `${key}: `,
            options: { variant: "body1" },
          },
          ...(value.description && {
            content: `${value.description}`,
            options: { variant: "body2" },
          }),
        ]);
      }
    },
  },
  clear: {
    description: "Clear the terminal",
    callback: (utils) => () => {
      utils.clearScreen();
    },
  },
};

const commandReducer = (state: TerminalCommand, action: CommandAction) => {
  switch (action.type) {
    case CommandActionTypes.ADD_COMMANDS:
      return {
        ...state,
        ...action.payload,
      };
    case CommandActionTypes.RESET_COMMANDS:
      return {
        ...INIT_STATE,
      };
    default:
      return state;
  }
};

export { INIT_STATE as commandReducerInitialState };

export default commandReducer;
