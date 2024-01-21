import { TerminalCommand } from "../../index";

enum CommandActionTypes {
  ADD_COMMANDS = "ADD_COMMANDS",
  RESET_COMMANDS = "RESET_COMMANDS",
}

interface CommandAction {
  type: CommandActionTypes;
  payload?: TerminalCommand;
}

export { CommandActionTypes, CommandAction };
