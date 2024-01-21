import {
  OutputOptions,
  OutputColorClass,
  OutputVariantClass,
} from "../interfaces/output.interface";

const generateOutput = (output: string, options: OutputOptions): string => {
  const { variant, color, url } = options;
  const variantClass =
    OutputVariantClass[(variant || "body1") as keyof typeof OutputVariantClass];
  const colorClass =
    OutputColorClass[(color || "primary") as keyof typeof OutputColorClass];
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

export { generateOutput };
