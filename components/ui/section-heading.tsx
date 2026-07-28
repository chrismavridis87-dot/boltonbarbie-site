type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <div className="eyebrow">
        <span className="eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
