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
    <div className="w-full flex flex-row gap-2 items-center justify-between">
      <Button secondary>
        {IconComponent ? (
          <div className='row items-center gap-2'>
            
            {secondaryName}
            <IconComponent size={18}/>
          </div>
        ) : (
          secondaryName
        )}
      </Button>
      <Button primary>{primaryName}</Button>
    </div>
  );
};

export default ButtonGroup;
