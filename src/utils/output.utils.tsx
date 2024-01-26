import {
  OutputOptions,
  OutputColorClass,
  OutputVariantClass,
} from "../interfaces/output.interface";

const generateOutput = (output: string, options?: OutputOptions): string => {
  if (!options) {
    return `<span>${output}</span>`;
  }
  const { variant, color, url } = options;
  const variantClass =
    OutputVariantClass[variant as keyof typeof OutputVariantClass];
  const colorClass = OutputColorClass[color as keyof typeof OutputColorClass];
  const outputUrl = url ? url : "";
  const outputVariant = variantClass ? variantClass : "";
  const outputColor = colorClass ? colorClass : "";
  const outputClassName = `${outputVariant} ${outputColor}`;
  const style = !outputColor && color ? `style="color: ${color}"` : "";
  if (url) {
    return `<a href="${outputUrl}" class="${outputClassName} react-terminal__output-link" ${style} target="_blank" rel="noopener noreferrer">${output}</a>`;
  }
  return `<span class="${outputClassName}" ${style}>${output}</span>`;
};

const generateOutputNode = ({
  prefix,
  prompt,
  text,
}: {
  prefix: string;
  prompt: string;
  text: React.ReactNode;
}): React.ReactNode => {
  return (
    <div className="react-terminal__output">
      <div className="react-terminal__output-prefix">{prefix}</div>
      <div className="react-terminal__output-prompt">{prompt}</div>
      {text}
    </div>
  );
};

export { generateOutput, generateOutputNode };
