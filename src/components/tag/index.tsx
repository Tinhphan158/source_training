interface ITagProps {
  text?: string;
  className?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export function Tag(props: ITagProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-2xl px-2 py-1 text-center text-[12px] font-medium ${props.className}`}>
      {props.iconStart}
      {props.text}
      {props.iconEnd}
    </div>
  );
}
