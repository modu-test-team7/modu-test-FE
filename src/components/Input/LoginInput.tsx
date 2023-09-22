import React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

interface LoginInputProps {
  color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  placeholder?: string;
  type?: 'text' | 'password' | 'email'; // 'email' 추가
  icon?: React.ReactNode;
  onIconClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const LoginInput: React.FC<LoginInputProps> = ({
  color,
  placeholder = '',
  type = 'text',
  icon,
  onIconClick,
  onChange,
  value,
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      variant="outlined"
      color={color as any}
      fullWidth
      sx={{ marginBottom: '10px', padding: '8px' }}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButton onClick={onIconClick}>{icon}</IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      value={value}
    />
  );
};
``;

export default LoginInput;
