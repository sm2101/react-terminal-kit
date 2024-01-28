import React from "react";
import { Output } from "../../interfaces/output.interface";

const OutputWrapper: React.FC<{
  output: Output[];
  prefix: string;
  prompt: string;
}> = ({ output, prefix, prompt }) => {
  return (
    <div className="react-terminal__output-wrapper">
      {output.map((item, index) => {
        if (item.type === "text") {
          return (
            <React.Fragment key={index}>
              <div className="react-terminal__output">
                <div className="react-terminal__output-prefix">{prefix}</div>
                <div className="react-terminal__output-prompt">{prompt}</div>
                {item.content}
              </div>
            </React.Fragment>
          );
        } else if (item.type === "html") {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content as string }}
            />
          );
        } else if (item.type === "jsx") {
          return <React.Fragment key={index}>{item.content}</React.Fragment>;
        }
      })}
    </div>
  );
};

export default OutputWrapper;
