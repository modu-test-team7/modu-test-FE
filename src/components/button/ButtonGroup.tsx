import React from 'react';
import Button from './Button';
import { IconBaseProps } from 'react-icons';

type ButtonGroupProps = {
  icon?: React.ComponentType<IconBaseProps>;
  primaryName?: string;
  secondaryName?: string;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  icon: IconComponent,
  primaryName,
  secondaryName,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      {IconComponent && <IconComponent />}
      <Button secondary>{secondaryName}</Button>
      <Button primary>{primaryName}</Button>
    </div>
  );
};

export default ButtonGroup;
