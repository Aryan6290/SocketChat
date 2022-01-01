import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const body = {email, password};
  const res = await axios.post('/user/login', body);

  return res;
};

export const createAndLoginUser = async (
  email: string,
  userName: string,
  password: string,
) => {
  const body = {
    email,
    userName,
    password,
  };
  const res = await axios.post('/user/add', body);
  return res;
};
