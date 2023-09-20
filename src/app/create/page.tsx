'use client';

import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import React from 'react';
import TestPicture from '@/components/createTest/TestPicture';

type pageProps = {};

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green', // 라벨 색 변경
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green', // 밑줄 색 변경
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'green', // 외곽선 색 변경 (variant="outlined"인 경우)
      },
    },
  },
});

const Page: React.FC<pageProps> = () => {
  const classes = useStyles();

  return (
    <div className="w-[1200px] h-[100%] mx-auto flex flex-col  justify-center bg-green-50">
      <div className='h-[60px]'>
        <TextField
          id="standard-multiline-flexible"
          label="테스트 제목"
          multiline
          maxRows={4}
          variant="standard"
          className={classes.root}
        />
      </div>
      <TestPicture />
    </div>
  );
};
export default Page;
