import React from "react";
import { Output } from "../../interfaces/output.interface";
import { ISelectInput } from "../../interfaces/input.interface";
import { generateOutputNode } from "../../utils/output.utils";

const SelectInput: React.FC<ISelectInput> = ({
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
  const [choice, setChoice] = React.useState<number>(options?.default || 0);

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const keyDownEvents = {
    Enter: (event: React.KeyboardEvent<HTMLInputElement>) => {
      displayOutput(
        generateOutputNode({
          prefix,
          prompt,
          text: options?.options[choice],
        })
      );
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
        focusInput();
        setChoice(parseInt(inputRef.current.value));
      } else {
        blurInput();
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
          onFocus={focusInput}
          onBlur={blurInput}
        />
      </div>
    </>
  );
};

export default SelectInput;
