import React from 'react';
import Fab from '@mui/material/Fab';
import { GrLinkUp } from 'react-icons/gr';

type UpButtonProps = {};

const UpButton: React.FC<UpButtonProps> = () => {

  // 상단으로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Fab aria-label="scroll-to-top" size="small" onClick={scrollToTop}>
        <GrLinkUp color="red" />
      </Fab>
    </div>
  );
};

export default UpButton;
