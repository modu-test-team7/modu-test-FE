import axios from 'axios';

// 조회
const getTests = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tests`);
  console.log(response)
  return response;
};

export { getTests };
