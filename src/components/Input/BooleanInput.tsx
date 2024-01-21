import React from "react";
import { Output } from "../../interfaces/output.interface";
import { IBooleanInput } from "../../interfaces/input.interface";
import { generateOutputNode } from "../../utils/output.utils";

const BooleanInput: React.FC<IBooleanInput> = ({
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
  const [choice, setChoice] = React.useState<boolean>(
    options?.default || false
  );

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(event.target.checked);
  };

  const keyDownEvents = {
    Enter: (event: React.KeyboardEvent<HTMLInputElement>) => {
      const choiceText = choice
        ? options?.true || "Yes"
        : options?.false || "No";
      displayOutput(
        generateOutputNode({
          prefix,
          prompt,
          text: choiceText,
        })
      );
      handleEnter(choice);
    },
    ArrowLeft: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!choice) {
        setChoice(true);
      }
    },
    ArrowRight: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (choice) {
        setChoice(false);
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
        setChoice(inputRef.current.checked);
      } else {
        blurInput();
      }
    }
  }, [isFocused]);

  return (
    <>
      <div className="react-terminal__input input__consent">
        <div className="react-terminal__input-prefix">
          {prefix} {prompt}
        </div>
        <div
          className={`react-terminal__input-content ${
            isFocused ? "input__consent-focused" : ""
          }`}
        >
          <div
            className={`input__consent-choices consent-choices-yes ${
              choice ? "input__consent-choices-chosen" : ""
            }`}
          >
            <span>{options?.true || "Yes"}</span>
          </div>
          <div className="input__consent-choices-separator">/</div>
          <div
            className={`input__consent-choices consent-choices-no ${
              !choice ? "input__consent-choices-chosen" : ""
            }`}
          >
            <span>{options?.false || "No"}</span>
          </div>
        </div>
      </div>
      <div className="react-terminal__input-wrapper">
        <input
          ref={inputRef}
          type="checkbox"
          checked={choice}
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
          onFocus={focusInput}
          onBlur={blurInput}
        />
      </div>
    </>
  );
};

export default BooleanInput;
