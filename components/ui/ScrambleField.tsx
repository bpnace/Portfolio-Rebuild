type ScrambleFieldProps = {
  text: string;
};

export function ScrambleField({ text }: ScrambleFieldProps) {
  return (
    <span
      className="experience-scramble"
      data-scramble-field="true"
      data-scramble-text={text}
    >
      <span className="sr-only">{text}</span>
      <span className="experience-scramble-stack" aria-hidden="true">
        <span className="experience-scramble-reserve">{text}</span>
        <span
          className="experience-scramble-visual"
          data-scramble-visual="true"
        >
          {text}
        </span>
      </span>
    </span>
  );
}
