import React from "react";
import { Output } from "../interfaces/output.interface";
import { ISelectInput } from "../interfaces/input.interface";

const SelectInput: React.FC<ISelectInput> = ({
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
  const [choice, setChoice] = React.useState<number>(options?.default || 0);

  const generateOutputHtml = (text: string) => {
    return `<div class="react-terminal__output">
    <div class="react-terminal__output-prefix output-text">${prefix}</div>
    <div class="react-terminal__output-prompt output-text">${prompt}</div>
    ${text}
  </div>`;
  };

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const keyDownEvents = {
    Enter: (event: React.KeyboardEvent<HTMLInputElement>) => {
      setOutput((prev) => [
        ...prev,
        {
          type: "html",
          content: generateOutputHtml(
            options.options[choice] || options.options[0]
          ),
        },
      ]);
      handleEnter(choice);
    },
    ArrowUp: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (choice > 0) {
        setChoice(choice - 1);
      }
    },
    ArrowDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (choice < options?.options.length - 1) {
        setChoice(choice + 1);
      }
    },
    Tab: (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    },
    Escape: (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
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
        setChoice(parseInt(inputRef.current.value));
      } else {
        setIsFocused(false);
      }
    }
  }, [isFocused]);

  return (
    <>
      <div className="react-terminal__input input__select">
        <div className="react-terminal__input-prefix">
          {prefix} {prompt}
        </div>
        <div
          className={`react-terminal__input-content ${
            isFocused ? "input__select-focused" : ""
          }`}
        >
          {options?.options.map((option, index) => (
            <div
              key={`input__select-choices-${index}`}
              className={`input__select-choices  ${
                choice === index ? "input__select-choices-chosen" : ""
              }`}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="react-terminal__input-wrapper">
        <input
          ref={inputRef}
          type="number"
          value={choice}
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

export default SelectInput;
