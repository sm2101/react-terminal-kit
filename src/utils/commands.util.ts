import {
  TerminalCommand,
  TerminalUtils,
} from "../interfaces/terminal.interface";
import {
  Output,
  DisplayOutputArgs,
  OutputMarginLevel,
} from "../interfaces/output.interface";
const getSysCommands = (
  displayOutput: TerminalUtils["displayOutput"],
  clearScreen: TerminalUtils["clearScreen"],
  terminalCommands: TerminalCommand
): TerminalCommand => {
  const sysCommands = {
    ".clear": {
      description: "Clear the terminal",
      usage: ".clear",
      callback: () => {
        clearScreen();
      },
    },
    ".help": {
      description: "List all available commands or get help for a command",
      usage: ".help [command]",
      callback: (utils: TerminalUtils, args: string[]) => {
        if (!args.length) {
          displayOutput([
            {
              text: "Available commands:",
              options: { variant: "body1" },
            },
            {
              text: Object.keys({ ...terminalCommands, ...sysCommands }).join(
                ", "
              ),
              options: { variant: "body2" },
            },
          ]);
          for (const [key, value] of Object.entries({
            ...terminalCommands,
            ...sysCommands,
          })) {
            displayOutput([
              {
                text: `${key}`,
                options: { variant: "body1" },
              },
            ]);
            if (value.description)
              displayOutput(
                [
                  {
                    text: `${value.description}`,
                    options: { variant: "body2" },
                  },
                ],
                1
              );
            if (value.usage)
              displayOutput(
                [
                  {
                    text: `Usage: ${value.usage}`,
                    options: { variant: "caption" },
                  },
                ],
                1
              );
          }
        } else {
          const command = args[0];
          const cmds: TerminalCommand = { ...terminalCommands, ...sysCommands };
          if (cmds[command as keyof typeof terminalCommands]) {
            displayOutput([
              {
                text: `${command}`,
                options: { variant: "body1" },
              },
            ]);
            if (cmds[command].description)
              displayOutput(
                [
                  {
                    text: `${
                      cmds[command as keyof typeof terminalCommands].description
                    }`,
                    options: { variant: "body2" },
                  },
                ],
                1
              );
            if (cmds[command].usage)
              displayOutput(
                [
                  {
                    text: `Usage: ${cmds[command].usage}`,
                    options: { variant: "caption" },
                  },
                ],
                1
              );
          } else {
            displayOutput([
              {
                text: `Command not found: ${command}`,
                options: { color: "error" },
              },
            ]);
          }
        }
      },
    },
  };
  return sysCommands;
};

export { getSysCommands };
