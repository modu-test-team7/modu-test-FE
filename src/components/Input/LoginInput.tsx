import React from 'react';
import Input from '@mui/joy/Input';

interface LoginInputProps {
  color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  placeholder?: string;
  variant?: string;
}

const LoginInput: React.FC<LoginInputProps> = ({ color, placeholder = '' }) => {
  return (
    <Input
      placeholder={placeholder}
      variant="outlined"
      color={color}
      sx={{ marginBottom: '10px', padding: '8px' }}
    />
  );
};

export default LoginInput;
