import { DisplayOutputArgs, OutputMarginLevel } from "./output.interface";
import {
  AwaitBooleanInputOptions,
  AwaitInputOptions,
  AwaitPasswordInputOptions,
  AwaitSelectInputOptions,
} from "./input.interface";

interface TerminalRef {}

interface TerminalUtils {
  displayOutput: (data: DisplayOutputArgs) => void;
  awaitInput: (text: string, options: AwaitInputOptions) => Promise<string>;
  awaitPassword: (
    text: string,
    options: AwaitPasswordInputOptions
  ) => Promise<string>;
  awaitConfirm: (
    text: string,
    options: AwaitBooleanInputOptions
  ) => Promise<boolean>;
  awaitSelect: (
    text: string,
    options: AwaitSelectInputOptions
  ) => Promise<number>;
  clearScreen: () => void;
}

interface ITerminal {
  prefix: string;
  prompt: string;
  cursor: "block" | "underline" | "bar";
  theme: "light" | "dark";
  commands: TerminalCommand;
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
