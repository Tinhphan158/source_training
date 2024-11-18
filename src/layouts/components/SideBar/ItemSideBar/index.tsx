import { Link } from 'react-router-dom';

export interface IItemSideBar {
  id: number;
  to: string;
  title: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ItemSideBar(props: IItemSideBar) {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}>
      <div className={`box-border flex items-center justify-between px-[16px] py-[20px] ${props.className}`}>
        <div className='flex items-center gap-[10px] text-base leading-[24px]'>
          {props.iconStart}
          {props.title}
        </div>
        {props.iconEnd}
      </div>
    </Link>
  );
}
