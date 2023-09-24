import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type TestCategoryProps = {
  onCategoryChange: (category: string) => void;
};

const TestCategory: React.FC<TestCategoryProps> = ({ onCategoryChange }) => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value); // 부모 컴포넌트에게 변경 사항 알려주기
  };
  
  return (
  <div>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120}} className="w-full ml-0 mb-[50px]">
      <InputLabel id="demo-simple-select-standard-label" className="pl-[10px]">카테고리</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleChange}
        label="카테고리"
        className='p-[5px] text-md font-bold text-gray-500'
      >
        <MenuItem value={"친구"}>친구</MenuItem>
        <MenuItem value={"가족"}>가족</MenuItem>
        <MenuItem value={"진지"}>진지</MenuItem>
        <MenuItem value={"재미"}>재미</MenuItem>
      </Select>
    </FormControl>
  </div>
  )
}
export default TestCategory;