import React from 'react';
import Button from '@mui/material/Button';

type UserButtonProps = {};

const UserButton: React.FC<UserButtonProps> = () => {
  return (
    <>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
    </>
  );
};
export default Button;
