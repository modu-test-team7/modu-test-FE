import React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

interface LoginInputProps {
  color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  placeholder?: string;
  type?: 'text' | 'password';
  icon?: React.ReactNode;
  onIconClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  color,
  placeholder = '',
  type = 'text',
  icon,
  onIconClick,
  onChange,
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      variant="outlined"
      color={color as any} // Color type might differ, so casting as any for now
      fullWidth // TextField usually requires this for proper styling
      sx={{ marginBottom: '10px', padding: '8px' }}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButton onClick={onIconClick}>{icon}</IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};
``;

export default LoginInput;
