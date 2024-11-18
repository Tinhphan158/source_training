export type ColorBasic =
  | 'warning'
  | 'danger'
  | 'success'
  | 'info'
  | 'primary'
  | 'neutral'
  | 'purple'
  | 'orange'
  | 'light';
export type SizeButton = 'extraSm' | 'sm' | 'md' | 'normal' | 'lg';
export type Sizes = 'xs' | 'sm' | 'md' | 'mn' | 'lg' | 'icon';
export type CssSize = Record<'sm' | 'md' | 'lg' | 'xl', number>;

export const varSize: CssSize = {
  xl: 4,
  lg: 3,
  md: 2,
  sm: 1,
};
