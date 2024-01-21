import { DisplayOutputArgs } from "./output.interface";
import {
  UserBooleanInputOptions,
  UserInputOptions,
  UserPasswordInputOptions,
  UserSelectInputOptions,
} from "./input.interface";

interface TerminalRef {}

interface TerminalUtils {
  displayOutput: (data: DisplayOutputArgs) => void;
  clearScreen: () => void;
  input: (prompt: string, options: UserInputOptions) => Promise<string>;
  password: (
    prompt: string,
    options: UserPasswordInputOptions
  ) => Promise<string>;
  confirm: (
    prompt: string,
    options: UserBooleanInputOptions
  ) => Promise<boolean>;
  select: (prompt: string, options: UserSelectInputOptions) => Promise<number>;
}

interface ITerminal {
  prefix: string;
  prompt: string;
  cursor: "block" | "underline" | "bar";
  theme: "light" | "dark";
  commands: TerminalCommand;
  children?: React.ReactNode;
}

interface TerminalCommand {
  help: {
    description?: string;
    usage?: React.ReactNode;
    callback: (
      utils: TerminalUtils,
      args: string[]
    ) => (commands: TerminalCommand) => void;
  };
  [key: string]: {
    description?: string;
    usage?: React.ReactNode;
    callback: (utils: TerminalUtils, args: string[]) => void;
  };
}

export { TerminalRef, ITerminal, TerminalCommand, TerminalUtils };
