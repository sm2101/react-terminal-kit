import React from "react";
import { Output } from "../../interfaces/output.interface";
import { ITextInput } from "../../interfaces/input.interface";
import { generateOutputNode } from "../../utils/output.utils";

const TextInput: React.FC<ITextInput> = ({
  prefix,
  prompt,
  inputRef,
  cursorClassName,
  isFocused,
  focusInput,
  blurInput,
  handleEnter,
  handleError,
  options,
  displayOutput,
}) => {
  const [input, setInput] = React.useState<string>("");
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);
  const [numTries, setNumTries] = React.useState<number>(1);
  const [maxRetries, setMaxRetries] = React.useState<number>(3);

  React.useEffect(() => {
    if (options?.maxRetries) {
      setMaxRetries(options.maxRetries);
    }
  }, [options?.maxRetries]);

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
            content: options?.errorMessage || "[Invalid input]",
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
      displayOutput(
        generateOutputNode({
          prefix,
          prompt,
          text: input,
        })
      );
      if (options?.allowEmpty) {
        validateInputAndEnter(input);
      } else {
        if (numTries < maxRetries) {
          if (input.length > 0) {
            validateInputAndEnter(input);
          } else {
            displayOutput({
              content: options?.retryMessage || "[Please enter a value]",
              options: {
                color: "primary",
                variant: "caption",
              },
            });
            setNumTries(numTries + 1);
          }
        } else {
          displayOutput({
            content: options?.errorMessage || "[Max retries exceeded]",
            options: { color: "error", variant: "caption" },
          });
          handleError("Max retries exceeded");
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
        focusInput();
        changeInput(inputRef.current.value);
      } else {
        blurInput();
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
          onFocus={focusInput}
          onBlur={blurInput}
        />
      </div>
    </>
  );
};

export default TextInput;
