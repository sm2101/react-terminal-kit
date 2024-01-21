import React from "react";
import { Output } from "../interfaces/output.interface";
import { ITextInput } from "../interfaces/input.interface";

const TextInput: React.FC<ITextInput> = ({
  prefix,
  prompt,
  inputRef,
  cursorClassName,
  isFocused,
  setIsFocused,
  handleEnter,
  handleError,
  options,
  displayOutput,
  setOutput,
}) => {
  const [input, setInput] = React.useState<string>("");
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);
  const [numTries, setNumTries] = React.useState<number>(1);

  const generateOutputHtml = (text: string) => {
    return `<div class="react-terminal__output">
    <div class="react-terminal__output-prefix output-text">${prefix}</div>
    <div class="react-terminal__output-prompt output-text">${prompt}</div>
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

  const validateInputAndEnter = (text: string) => {
    if (options?.validator) {
      if (options.validator(text)) {
        handleEnter(text);
      } else {
        displayOutput([
          {
            text: options?.errorMessage || "[Invalid input]",
            options: {
              color: "error",
              variant: "caption",
            },
          },
        ]);
        handleError("Invalid input");
      }
    } else {
      handleEnter(text);
    }
  };

  const keyDownEvents = {
    Enter: (event: React.KeyboardEvent<HTMLInputElement>) => {
      setOutput((prev) => [
        ...prev,
        {
          type: "html",
          content: generateOutputHtml(input),
        },
      ]);
      if (options?.allowEmpty) {
        validateInputAndEnter(input);
      } else {
        if (options?.maxRetries) {
          if (numTries < options.maxRetries) {
            if (input.length > 0) {
              validateInputAndEnter(input);
            } else {
              displayOutput([
                {
                  text: options?.retryMessage || "[Please enter a value]",
                  options: {
                    color: "primary",
                    variant: "caption",
                  },
                },
              ]);
              setNumTries(numTries + 1);
            }
          } else {
            displayOutput([
              {
                text: options.errorMessage || "[Max retries exceeded]",
                options: { color: "error", variant: "caption" },
              },
              {
                text: `Please try again`,
                options: { color: "primary", variant: "caption" },
              },
            ]);
            handleError("Max retries exceeded");
          }
        }
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

  return (
    <>
      <div className="react-terminal__input">
        <div className="react-terminal__input-prefix">{prefix}</div>
        <div className="react-terminal__input-prompt">{prompt}</div>
        <div className="react-terminal__input-content">
          <p>{input}</p>
          {isFocused && (
            <span
              className={`react-terminal__terminal-cursor blink ${
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

export default TextInput;
