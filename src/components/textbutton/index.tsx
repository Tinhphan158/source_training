interface ITextButton extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  className?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function TextButton(props: ITextButton) {
  return (
    <div
      className={`flex items-center gap-2 outline-none hover:opacity-85 ${props.className} `}
      {...props}>
      {props.iconStart} {props.text} {props.iconEnd}
    </div>
  );
}

export default TextButton;
