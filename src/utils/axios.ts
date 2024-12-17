import axios from 'axios';
import { globalRouter } from './globalRouter';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {

        //toast.error(error.response?.data.message)

        globalRouter.navigate?.("/login")
      }
    }

    return Promise.reject(error);
  }
);

