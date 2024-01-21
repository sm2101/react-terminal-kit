import React from "react";
import { Output } from "../../interfaces/output.interface";

const OutputWrapper: React.FC<{
  output: Output[];
}> = ({ output }) => {
  return (
    <div className="react-terminal__output-wrapper">
      {output.map((item, index) => {
        if (item.type === "text") {
          return (
            <>
              <div className="react-terminal__output">
                <div className="react-terminal__output-prefix">{prefix}</div>
                <div className="react-terminal__output-prompt">{prompt}</div>
                {item.content}
              </div>
            </>
          );
        } else if (item.type === "html") {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          );
        } else if (item.type === "jsx") {
          return <div key={index}>{item.content}</div>;
        }
      })}
    </div>
  );
};

export default OutputWrapper;
