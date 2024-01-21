import React from "react";
import { Output } from "../interfaces/output.interface";
import { ICommandInput } from "../interfaces/input.interface";
import { storeHistory, getHistory } from "../utils/history.util";
const CommandInput: React.FC<ICommandInput> = ({
  prefix,
  prompt,
  inputRef,
  cursorClassName,
  setOutput,
  isFocused,
  setIsFocused,
  handleCommand,
}) => {
  const [input, setInput] = React.useState<string>("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);

  const generateOutputHtml = (text: string) => {
    return `<div class="react-terminal__output">
    <div class="react-terminal__output-prefix">${prefix}</div>
    <div class="react-terminal__output-prompt">${prompt}</div>
    ${text}
  </div>`;
  };

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      if (cursorPosition >= prev.length) {
        setCursorPosition(event.target.value.length);
      } else {
        if (prev.length > event.target.value.length) {
          setCursorPosition(cursorPosition - 1);
        } else {
          setCursorPosition(cursorPosition + 1);
        }
      }
      return event.target.value;
    });
  };

  const changeCursorPos = (pos: number) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(pos, pos);
      setCursorPosition(pos);
    }
  };

  const changeInput = (text: string) => {
    setInput(text);
    changeCursorPos(text.length);
  };

  const keyDownEvents = {
    Enter: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (input.length > 0) {
        setHistory([...history, input]);
        storeHistory([...history, input]);
        setHistoryIndex(history.length + 1);
        setOutput((prev) => [
          ...prev,
          { type: "html", content: generateOutputHtml(input) },
        ]);
        changeInput("");
        handleCommand(input);
      }
    },
    ArrowUp: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        changeInput(history[historyIndex - 1]);
      }
    },
    ArrowDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (historyIndex < history.length) {
        setHistoryIndex(historyIndex + 1);
        changeInput(history[historyIndex + 1] || "");
      }
    },
    ArrowLeft: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (cursorPosition > 0) {
        changeCursorPos(cursorPosition - 1);
      }
    },
    ArrowRight: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (cursorPosition < input.length) {
        changeCursorPos(cursorPosition + 1);
      }
    },
    Tab: (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    },
    Escape: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (input.length > 0) {
        setInput("");
      }
    },
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyEvent = keyDownEvents[event.key as keyof typeof keyDownEvents];
    if (keyEvent) {
      keyEvent(event);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      if (inputRef.current) {
        inputRef.current.focus();
        changeInput(inputRef.current.value);
      } else {
        setIsFocused(false);
      }
    }
  }, [isFocused]);

  React.useEffect(() => {
    const existingHistory = getHistory();
    if (existingHistory) {
      setHistory(existingHistory);
      setHistoryIndex(existingHistory.length);
    }
  }, []);

  return (
    <>
      <div className="react-terminal__input">
        <div className="react-terminal__input-prefix">{prefix}</div>
        <div className="react-terminal__input-prompt">{prompt}</div>
        <div className="react-terminal__input-content">
          <p>{input}</p>
          {isFocused && (
            <span
              className={`react-terminal__terminal-cursor blink-fast ${
                cursorClassName || "cursor__box"
              }`}
              style={{
                left: `${cursorPosition}ch`,
              }}
            />
          )}
        </div>
      </div>
      <div className="react-terminal__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
    </>
  );
};

export default CommandInput;
