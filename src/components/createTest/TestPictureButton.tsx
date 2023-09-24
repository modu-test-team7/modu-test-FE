import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';

type TestPictureButtonProps = {};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TestPictureButton: React.FC<TestPictureButtonProps> = () => {
  return (
    <div>
      <Button component="label" variant="contained" startIcon={<BsFillCloudArrowUpFill />}>
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
    </div>
  );
};
export default TestPictureButton;
