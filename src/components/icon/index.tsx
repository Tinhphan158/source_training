import { renderICon } from '@/components/icon/renderIcon';
import { type IconVariable } from '@/components/icon/types';

export interface IIconComponentProps {
  icon: IconVariable;
  onClick?: () => void;
  className?: string;
}

function IconRoot(props: IIconComponentProps) {
  return (
    <div
      style={{ cursor: 'pointer' }}
      className={props.className}
      onClick={props.onClick}>
      {renderICon[props.icon]}
    </div>
  );
}

export default IconRoot;
