import { LogoSize } from '../../types/LogoSize';

type Props = {
  size: LogoSize;
};

export const Logo: React.FC<Props> = ({ size }) => {
  const sizesMap = {
    [LogoSize.Small]: '64',
    [LogoSize.Medium]: '80',
    [LogoSize.Large]: '90',
  };

  const widthValue = sizesMap[size] || sizesMap[LogoSize.Medium];

  return <img src="/images/Logo.svg" alt="Nice Gadgets" style={{ width: `${widthValue}px` }} />;
};
