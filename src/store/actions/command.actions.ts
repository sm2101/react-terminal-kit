import { TerminalCommand } from "../../index";
import { CommandAction, CommandActionTypes } from "../types/command.types";

const addCommands = (commands: TerminalCommand): CommandAction => {
  return {
    type: CommandActionTypes.ADD_COMMANDS,
    payload: commands,
  };
};

const resetCommands = (): CommandAction => {
  return {
    type: CommandActionTypes.RESET_COMMANDS,
  };
};

export default { addCommands, resetCommands };
