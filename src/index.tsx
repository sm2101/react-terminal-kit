import React from "react";
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
import FullscreenOutputWrapper from "./components/Output/Fullscreen/Wrapper";
import InputWrapper from "./components/Input/index";

// Output Components exports
import FullscreenOutput from "./components/Output/Fullscreen/index";
import Text from "./components/Output/Text/index";

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
    childrenState,
    displayOutput,
    closeFullscreen,
  } = useTerminal({
    userCommands,
    cursor,
    children,
  });

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
      {Object.keys(childrenState.fullscreen).map((path: string) => {
        const child = childrenState.fullscreen[path];
        const { component, unmountOnExit, open } = child;
        if (unmountOnExit && !open) {
          return null;
        }
        return (
          <FullscreenOutputWrapper
            key={path}
            open={open}
            terminalRef={scrollRef}
            handleClose={closeFullscreen}
          >
            {component}
          </FullscreenOutputWrapper>
        );
      })}
    </div>
  );
};

export { TerminalUtils, TerminalCommand, FullscreenOutput, Text };
export default Terminal;
