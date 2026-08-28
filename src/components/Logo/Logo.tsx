import type { LogoSize } from '../../types/LogoSize';

type Props = {
  size: LogoSize;
};

export const Logo: React.FC<Props> = ({ size }) => {
  const sizesMap = {
    small: '64',
    medium: '80',
    large: '90',
  };

  const widthValue = sizesMap[size] || sizesMap['medium'];

  return <img src="/images/Logo.svg" alt="Nice Gadgets" style={{ width: `${widthValue}px` }} />;
};
