// import React from "react";
// import { Output } from "../../interfaces/output.interface";

// interface IFullscreenOutput {
//   open: boolean;
//   handleClose: () => void;
//   output: Array<Output>;
//   terminalRef: React.RefObject<HTMLDivElement>;
// }
// const FullscreenOutput: React.FC<IFullscreenOutput> = ({
//   open,
//   handleClose,
//   output,
//   terminalRef,
// }) => {
//   const [height, setHeight] = React.useState<number>(0);
//   const ref = React.useRef<HTMLDivElement>(null);

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === "q") {
//       handleClose();
//     }
//   };

//   React.useEffect(() => {
//     if (open) {
//       ref.current?.focus();
//       document.addEventListener("keydown", handleKeyDown);
//       const terminal = terminalRef.current;
//       setHeight(terminal?.clientHeight || 0);
//     } else {
//       document.removeEventListener("keydown", handleKeyDown);
//       ref.current?.blur();
//       setHeight(0);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [open]);
//   return (
//     <div
//       className="react-terminal__output-fullscreen"
//       style={{
//         height: `${height}px`,
//       }}
//       ref={ref}
//     >
//       <div className="react-terminal__output-wrapper">
//         {output.map((item, index) => {
//           if (item.type === "text") {
//             return (
//               <>
//                 <div className="react-terminal__output">{item.content}</div>
//               </>
//             );
//           } else if (item.type === "html") {
//             return (
//               <div
//                 key={index}
//                 dangerouslySetInnerHTML={{ __html: item.content }}
//               />
//             );
//           }
//         })}
//       </div>
//       <div className="output__fullscreen-exit">
//         <p>
//           <span className="output__fullscreen-exit-key">q</span> to exit
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FullscreenOutput;

export default {};
