import React from "react";
import { FullscreenOutputWrapperProps } from "../../../interfaces/output.interface";

const FullscreenOutputWrapper: React.FC<FullscreenOutputWrapperProps> = ({
  open,
  handleClose,
  children,
  terminalRef,
}) => {
  const [height, setHeight] = React.useState<number>(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "q" || event.key === "Escape" || event.key === "Q") {
      handleClose();
    } else if (event.key === "ArrowUp") {
      scrollRef.current?.scrollBy({
        top: -20,
        behavior: "smooth",
      });
    } else if (event.key === "ArrowDown") {
      scrollRef.current?.scrollBy({
        top: 20,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    if (open) {
      ref.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
      const terminal = terminalRef.current;
      setHeight(terminal?.clientHeight || 0);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      ref.current?.blur();
      setHeight(0);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return (
    <div
      className="react-terminal__output-fullscreen"
      style={{
        height: `${height}px`,
        ...(height > 0 && {
          padding: "0.5rem",
          paddingBottom: "calc(var(--terminal-line-height) + 1ch)",
        }),
      }}
      ref={ref}
    >
      <div className="react-terminal__output-wrapper" ref={scrollRef}>
        {children}
      </div>
      <div className="output__fullscreen-footer">
        <div className="output__fullscreen-exit">
          <p>
            <span className="output__fullscreen-exit-key">q / Esc</span> to exit
          </p>
        </div>
        <div className="output__fullscreen-scroll">
          <p>
            <span className="output__fullscreen-scroll-key">↑</span> to scroll
            up
          </p>
          <p>
            <span className="output__fullscreen-scroll-key">↓</span> to scroll
            down
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullscreenOutputWrapper;
