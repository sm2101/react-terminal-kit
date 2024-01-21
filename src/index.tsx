import React, { Children, cloneElement } from "react";
import "./stylesheets/main.css";
import "./stylesheets/output.css";
import "./stylesheets/cursor.css";
import "./stylesheets/input.css";

import {
  ITerminal,
  TerminalCommand,
  TerminalUtils,
} from "./interfaces/terminal.interface";

import useTerminal from "./hooks/useTerminal";

import OutputWrapper from "./components/Output/Wrapper";
import InputWrapper from "./components/Input/index";

const Terminal: React.FC<ITerminal> = ({
  prefix,
  prompt,
  cursor = "block",
  theme = "dark",
  commands: userCommands,
  children,
}) => {
  const {
    inputRef,
    scrollRef,
    commands,
    cursorClassName,
    focusInput,
    blurInput,
    inputState,
    handleCommand,
    output,
    displayOutput,
  } = useTerminal({
    userCommands,
    cursor,
  });
  {
    "id":<Element />,
    "id":<Element />,
    "id":<Element />,
  }

  // const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  // const [fullScreenOutput, setFullScreenOutput] = React.useState<Output[]>([]);

  // const handleCloseFullScreen = () => {
  //   setIsFullScreen(false);
  //   setInputType("command");
  //   inputRef.current?.focus();
  //   setIsFocused(true);
  //   setFullScreenOutput([]);
  // };
  console.log("Children", Children.toArray(children));

  return (
    <div
      className={`react-terminal ${
        theme === "light" ? "react-terminal__light-mode" : ""
      } ${theme === "dark" ? "react-terminal__dark-mode" : ""}`}
      onClick={focusInput}
      ref={scrollRef}
    >
      <OutputWrapper output={output} prefix={prefix} prompt={prompt} />
      <InputWrapper
        prefix={prefix}
        prompt={prompt}
        inputRef={inputRef}
        cursorClassName={cursorClassName}
        handleCommand={handleCommand}
        inputState={inputState}
        focusInput={focusInput}
        blurInput={blurInput}
        displayOutput={displayOutput}
      />
      {/* <FullscreenOutput
        open={isFullScreen}
        handleClose={handleCloseFullScreen}
        output={fullScreenOutput}
        terminalRef={scrollRef}
      /> */}
    </div>
  );
};

export { TerminalUtils, TerminalCommand };
export default Terminal;
