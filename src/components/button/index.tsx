export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  isLoading?: boolean;
  isFocus?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  refTo?: any;
}

function Button({ disabled = false, ...props }: IButton) {
  return (
    <button
      ref={props.refTo}
      disabled={disabled}
      className={`relative box-border text-center text-black ${props.className}`}
      {...props}>
      {props.iconStart} {props.text} {props.iconEnd}
      {props.children}
    </button>
  );
}

export default Button;
