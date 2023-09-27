import React, { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';
import clsx from 'clsx';
import axios from 'axios';

type TestPictureButtonProps = {
  setImage?: (qIndex: number, newImage: string) => void;
  small?: boolean;
  questionId: number;
};

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

const TestPictureButton: React.FC<TestPictureButtonProps> = ({ setImage, small, questionId }) => {

  
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // reader.onloadend = () => {
      //   if (typeof reader.result === 'string') {
      //     setImage(questionId, reader.result);
      //   }
      // };

      const formData = new FormData();
      formData.append('image', file);
      const result = await axios.post(`http://13.125.200.12/api/upload`, formData);
      console.log(result);
      // reader.onloadend = () => {
      //   if (typeof reader.result === 'string') {
      //     setImage(reader.result);
      //   }
      // };
      setImage?.(questionId, result.data)

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={
          small ? (
            <AiOutlinePicture size={25} className="ml-[5px] text-gray-500" />
          ) : (
            <BsFillCloudArrowUpFill />
          )
        }
        className={clsx(
          small && 'bg-white shadow-none min-w-[10px] w-[30px] h-[30px] mb-[10px] p-0 ml-[10px]',
        )}
      >
        {!small && 'Upload file'}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );
};
export default TestPictureButton;
