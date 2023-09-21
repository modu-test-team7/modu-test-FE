import React from 'react';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

type TestTitleInputProps = {
  label?: string,
};

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'gray', // 라벨 색 변경
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'gray', // 밑줄 색 변경
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray', // 외곽선 색 변경 (variant="outlined"인 경우)
      },
    },
  },
});

const TestTitleInput:React.FC<TestTitleInputProps> = ({label}) => {
  const classes = useStyles();
  return <div><TextField
  id="standard-multiline-flexible"
  label={label}
  multiline
  maxRows={4}
  variant="standard"
  className={`${classes.root} w-full`}
/></div>
}
export default TestTitleInput;