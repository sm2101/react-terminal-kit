import React from "react";
import { LoadingProps } from "../../interfaces/input.interface";

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  type = "spiral-dots",
}) => {
  const [animationIndex, setAnimationIndex] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);
  const animationLists = {
    bar: ["|", "/", "-", "\\"],
    bubbles: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
    breathe: ["  ()  ", " (  ) ", "(    )", " (  ) "],
    metro: [
      "[    ]",
      "[=   ]",
      "[==  ]",
      "[=== ]",
      "[ ===]",
      "[  ==]",
      "[   =]",
    ],
    "modern-metro": [
      "[▱▱▱▱▱▱▱]",
      "[▰▱▱▱▱▱▱]",
      "[▰▰▱▱▱▱▱]",
      "[▰▰▰▱▱▱▱]",
      "[▰▰▰▰▱▱▱]",
      "[▰▰▰▰▰▱▱]",
      "[▰▰▰▰▰▰▱]",
      "[▰▰▰▰▰▰▰]",
      "[▱▰▰▰▰▰▰]",
      "[▱▱▰▰▰▰▰]",
      "[▱▱▱▰▰▰▰]",
      "[▱▱▱▱▰▰▰]",
      "[▱▱▱▱▱▰▰]",
      "[▱▱▱▱▱▱▰]",
    ],
    vertical: ["▁", "▃", "▄", "▅", "▆", "▇", "▆", "▅", "▄", "▃"],
    horizontal: ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "▊", "▋", "▌", "▍"],
    "semi-circle": ["◐", "◓", "◑", "◒"],
    arrow: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
    clock: [
      "🕛",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
    ],
    bounce: [
      "(●     )",
      "( ●    )",
      "(  ●   )",
      "(   ●  )",
      "(    ● )",
      "(     ●)",
      "(    ● )",
      "(   ●  )",
      "(  ●   )",
      "( ●    )",
    ],
    firework: ["⢀", "⠠", "⠐", "⠈", "*", "*", " "],
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => {
        if (
          prev >=
          animationLists[type as keyof typeof animationLists].length - 1
        ) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 100);
    setIntervalId(interval);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="react-terminal__loading">
        <div className="react-terminal__loading-icon">
          {animationLists[type as keyof typeof animationLists][animationIndex]}
        </div>
        <div className="react-terminal__loading-text">{text}</div>
      </div>
    </>
  );
};

export default Loading;
