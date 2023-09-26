import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';  // 수정: next/router에서 useRouter를 가져옵니다.
import axios from 'axios';  // 수정: axios를


const Page = () => {
  const router = useRouter();  // 수정: router 변수를 올바르게 초기화합니다.
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('/lib/images/blank.png');
}