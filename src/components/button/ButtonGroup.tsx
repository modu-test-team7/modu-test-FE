import React from 'react';
import Button from './Button';
import { IconType } from 'react-icons';

type ButtonGroupProps = {
  icon?: IconType;
  primaryName?: string;
  secondaryName?: string;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  icon,
  primaryName,
  secondaryName,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <Button secondary icon={icon} className="[mr-10px]">
        {secondaryName}
      </Button>
      <Button primary>{primaryName}</Button>
    </div>
  );
};
export default ButtonGroup;
