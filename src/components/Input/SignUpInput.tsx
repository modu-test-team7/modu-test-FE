import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

interface SignUpInputProps {
  color: string;
  placeholder: string;
  type?: string;
  onIconClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const SignUpInput: React.FC<SignUpInputProps> = ({
  color,
  type = 'text', // default value for type
  placeholder,
  onChange,
  onIconClick = () => {}, // default function for onIconClick
  icon,
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
    />
  );
};

export default SignUpInput;
