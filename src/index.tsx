import React from "react";
import "./stylesheets/main.css";
import "./stylesheets/output.css";
import "./stylesheets/cursor.css";
import "./stylesheets/input.css";

import {
  ITerminal,
  TerminalRef,
  TerminalCommand,
  UserCommand,
  TerminalUtils,
} from "./interfaces/terminal.interface";
import {
  DisplayOutputArgs,
  Output,
  OutputMarginLevel,
} from "./interfaces/output.interface";
import {
  AwaitInputOptions,
  AwaitPasswordInputOptions,
  AwaitBooleanInputOptions,
  IPasswordInput,
  ITextInput,
  IBooleanInput,
  InputType,
  TextInputState,
  PasswordInputState,
  BooleanInputState,
  AwaitSelectInputOptions,
  SelectInputState,
} from "./interfaces/input.interface";
import CommandInput from "./components/CommandInput";
import TextInput from "./components/TextInput";
import PasswordInput from "./components/PasswordInput";
import BooleanInput from "./components/BooleanInput";
import SelectInput from "./components/SelectInput";
import FullscreenOutput from "./components/FullscreenOutput";
import { getSysCommands } from "./utils/commands.util";
import { generateOutput } from "./utils/output.utils";
import useTerminal from "./hooks/useTerminal";

import OutputWrapper from "./components/Output/Wrapper";

const Terminal: React.FC<ITerminal> = ({
  prefix,
  prompt,
  cursor = "block",
  theme = "dark",
  commands: userCommands,
}) => {
  const { inputRef, scrollRef, commands } = useTerminal({
    userCommands,
  });

  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [fullScreenOutput, setFullScreenOutput] = React.useState<Output[]>([]);

  const cursorClassName =
    cursor === "block"
      ? "cursor__box"
      : cursor === "line"
      ? "cursor__line"
      : cursor === "underline"
      ? "cursor__underline"
      : "cursor__box";

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setInputType("command");
    inputRef.current?.focus();
    setIsFocused(true);
    setFullScreenOutput([]);
  };

  const awaitInput = (
    text: string,
    options: AwaitInputOptions
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      setTextInputOptions({
        prefix: !options.allowEmpty ? text : `${text} (press enter to skip)`,
        prompt: ":",
        handleEnter: (value: string) => {
          setTextInputOptions(null);
          setInputType("command");
          resolve(value);
        },
        handleError: (error: string) => {
          setTextInputOptions(null);
          setInputType("command");
          reject(error);
        },
        options,
      });
      setInputType("text");
      scrollToBottom();
    });
  };

  const awaitConfirm = (
    text: string,
    options: AwaitBooleanInputOptions
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      setBooleanInputOptions({
        prefix: text,
        prompt: ":",
        handleEnter: (choice: boolean) => {
          setTextInputOptions(null);
          setInputType("command");
          resolve(choice);
        },
        handleError: (error: string) => {
          setTextInputOptions(null);
          setInputType("command");
          reject(error);
        },
        options,
      });
      setInputType("boolean");
      scrollToBottom();
    });
  };

  const awaitPassword = (
    text: string,
    options: AwaitPasswordInputOptions
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      setPasswordInputOptions({
        prefix: !options.allowEmpty ? text : `${text} (press enter to skip)`,
        prompt: ":",
        handleEnter: (value: string) => {
          setPasswordInputOptions(null);
          setInputType("command");
          resolve(value);
        },
        handleError: (error: string) => {
          setPasswordInputOptions(null);
          setInputType("command");
          reject(error);
        },
        options,
      });
      setInputType("password");
      scrollToBottom();
    });
  };

  const awaitSelect = (
    text: string,
    options: AwaitSelectInputOptions
  ): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      setSelectInputOptions({
        prefix: text,
        prompt: ":",
        handleEnter: (choice: number) => {
          setTextInputOptions(null);
          setInputType("command");
          resolve(choice);
        },
        handleError: (error: string) => {
          setTextInputOptions(null);
          setInputType("command");
          reject(error);
        },
        options,
      });
      setInputType("select");
      scrollToBottom();
    });
  };

  const clearScreen = () => {
    setOutput([]);
  };

  const utils: TerminalUtils = {
    displayOutput,
    awaitInput,
    awaitConfirm,
    awaitPassword,
    awaitSelect,
    clearScreen,
  };

  Object.freeze(utils);

  const sysCommands: TerminalCommand = getSysCommands(
    utils.displayOutput,
    utils.clearScreen,
    terminalCommands
  );

  const handleCommand = (command: string) => {
    const [trigger, ...args] = command.split(" ");
    if (sysCommands[trigger]) {
      sysCommands[trigger].callback(utils, args);
    } else {
      if (terminalCommands[trigger]) {
        terminalCommands[trigger].callback(utils, args);
      } else {
        utils.displayOutput([
          {
            text: `Command not found: ${trigger}`,
            options: { color: "error" },
          },
        ]);
      }
    }
  };

  React.useEffect(() => {
    if (!commands) return;
    registerCommands(commands);
  }, [commands]);

  return (
    <div
      className={`react-terminal ${
        theme === "light" ? "react-terminal__light-mode" : ""
      } ${theme === "dark" ? "react-terminal__dark-mode" : ""}`}
      onClick={() => setIsFocused(true)}
      ref={scrollRef}
    >
      <OutputWrapper output={output} />
      {inputType === "command" && (
        <CommandInput
          prefix={prefix}
          prompt={prompt}
          inputRef={inputRef}
          cursorClassName={cursorClassName}
          handleCommand={handleCommand}
          setOutput={setOutput}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      )}
      {inputType === "text" && !!textInputOptions && (
        <TextInput
          prefix={textInputOptions.prefix}
          prompt={textInputOptions.prompt}
          options={textInputOptions.options}
          setOutput={setOutput}
          handleEnter={textInputOptions.handleEnter}
          handleError={textInputOptions.handleError}
          inputRef={inputRef}
          cursorClassName={cursorClassName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          displayOutput={utils.displayOutput}
        />
      )}
      {inputType === "password" && !!passwordInputOptions && (
        <PasswordInput
          prefix={passwordInputOptions.prefix}
          prompt={passwordInputOptions.prompt}
          options={passwordInputOptions.options}
          setOutput={setOutput}
          handleEnter={passwordInputOptions.handleEnter}
          handleError={passwordInputOptions.handleError}
          inputRef={inputRef}
          cursorClassName={cursorClassName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          displayOutput={utils.displayOutput}
        />
      )}
      {inputType === "boolean" && !!booleanInputOptions && (
        <BooleanInput
          prefix={booleanInputOptions.prefix}
          prompt={booleanInputOptions.prompt}
          options={booleanInputOptions.options}
          setOutput={setOutput}
          handleEnter={booleanInputOptions.handleEnter}
          handleError={booleanInputOptions.handleError}
          inputRef={inputRef}
          cursorClassName={cursorClassName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          displayOutput={utils.displayOutput}
        />
      )}
      {inputType === "select" && !!selectInputOptions && (
        <SelectInput
          prefix={selectInputOptions.prefix}
          prompt={selectInputOptions.prompt}
          options={selectInputOptions.options}
          setOutput={setOutput}
          handleEnter={selectInputOptions.handleEnter}
          handleError={selectInputOptions.handleError}
          inputRef={inputRef}
          cursorClassName={cursorClassName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          displayOutput={utils.displayOutput}
        />
      )}
      <FullscreenOutput
        open={isFullScreen}
        handleClose={handleCloseFullScreen}
        output={fullScreenOutput}
        terminalRef={scrollRef}
      />
    </div>
  );
};

export { TerminalUtils, TerminalCommand };
export default Terminal;
