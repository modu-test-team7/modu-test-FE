// UserPro.jsx
import React, { useState, ChangeEvent } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type UserProProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserPro: React.FC<UserProProps> = ({ username, setUsername, isEditing, setIsEditing }) => {
  const [tempUsername, setTempUsername] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setTempUsername(value);
  };

  const handleEditIconClick = (): void => {
    setIsEditing(true);
    setTempUsername(username);
  };

  const handleCheckIconClick = (): void => {
    setIsEditing(false);
    setUsername(tempUsername); // Save the edited username
  };

  const handleCancelIconClick = (): void => {
    setIsEditing(false);
  };

  return (
    <div className="flex-col m-auto">
      {isEditing ? null : <h5 className="text-lg ">환영합니다 👼</h5>}
      <div className="flex">
        {isEditing ? (
          <>
            <Box
              sx={{
                py: 2,
                display: 'grid',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <TextField
                value={tempUsername}
                onChange={handleUsernameChange}
                inputProps={{ maxLength: 15, className: 'custom-text' }}
                variant="filled"
                InputProps={{
                  style: { fontSize: '1.25rem' },
                }}
              />
            </Box>
            <div className="cursor-pointer ml-3 mt-12" onClick={handleCheckIconClick}>
              <BsCheckLg className="w-6 h-6" />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl">{username}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPro;
