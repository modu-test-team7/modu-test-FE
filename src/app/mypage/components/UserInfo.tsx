import React, { useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ChangeEvent } from 'react';
import { MypageButton } from '@/components/button';

type UserInfoProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UserInfo: React.FC<UserInfoProps> = ({ username, setUsername }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 닉네임 변경 함수
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length > 15) {
      setError('닉네임은 15자를 초과할 수 없습니다.');
    } else {
      setError(null);
    }
    setTempUsername(value);
  };

  // 닉네임 수정 아이콘 클릭
  const handleEditIconClick = (): void => {
    setIsEditing(true);
    setTempUsername(username);
  };

  // 닉네임 수정 완료 (체크 아이콘)클릭
  const handleCheckIconClick = (): void => {
    setIsEditing(false);
    setUsername(tempUsername);
  };

  // 닉네임 수정 취소 아이콘 클릭
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
                error={!!error}
                helperText={error || ' '}
                variant="filled"
                InputProps={{
                  style: { fontSize: '1.25rem' },
                }}
              />
            </Box>
            <div className="cursor-pointer ml-3 mt-12" onClick={handleCheckIconClick}>
              {/* 닉네임 수정 완료 (체크 아이콘) */}
              <BsCheckLg className="w-6 h-6" />
            </div>
            <div className="cursor-pointer ml-3 mt-12" onClick={handleCancelIconClick}>
              <FcCancel className="w-6 h-6" />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl">{username}</h1>
            <MypageButton label="정보수정"></MypageButton>
            <div className="cursor-pointer ml-4 mt-5" onClick={handleEditIconClick}>
              {/* 닉네임 변경 아이콘 */}
              <RiEdit2Fill />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
