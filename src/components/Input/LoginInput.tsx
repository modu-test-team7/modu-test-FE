import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

interface LoginInputProps {
  color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  placeholder?: string;
  type?: 'text' | 'password';
  onIconClick?: () => void; // 함수 타입 추가
  showIcon?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({
  color,
  placeholder = '',
  type = 'text',
  onIconClick, // 여기에 추가
  showIcon,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      color={color as any}
      type={type}
      fullWidth
      InputProps={{
        endAdornment: showIcon ? (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onIconClick}>
              {type === 'password' ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default LoginInput;
