import { Link } from 'react-router-dom';

interface ITextLink {
  text?: string;
  className?: string;
  to: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function TextLink(props: ITextLink) {
  return (
    <Link to={props.to}>
      <div
        className={`flex h-full items-center justify-center gap-2 text-center outline-none hover:opacity-85 ${props.className}`}>
        {props.iconStart} {props.text} {props.iconEnd}
      </div>
    </Link>
  );
}

export default TextLink;
