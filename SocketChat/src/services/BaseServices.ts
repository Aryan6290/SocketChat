import axios from 'axios';
import {Credentials} from '../utils/credentials';

const baseURL = Credentials.LOCAL;

// const saveFCMToken = () => {
//   messaging()
//     .getToken()
//     .then(token => {
//       axios.post('v2/users/token', {token});
//     });
// };

export const initService = async (token: string | null) => {
  axios.defaults.baseURL = baseURL;
  if (token !== null) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    // saveFCMToken();
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

axios.interceptors.request.use(req => {
  //   console.log('request object:', JSON.stringify(req));
  return req;
});

axios.interceptors.response.use(
  res => {
    // console.log('response object: ', JSON.stringify(res.data));
    // console.log('response object [success]: ', JSON.stringify(res));
    return res;
  },
  async error => {
    throw error;
  },
);
